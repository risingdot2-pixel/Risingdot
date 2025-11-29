// components/visual/ParticleSystem.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/components/ThemeContext';
import { usePerformanceOptimizer } from '@/lib/performance/performanceOptimizer';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  size: number;
  color: THREE.Color;
  originalSize: number;
  originalColor: THREE.Color;
}

export const ParticleSystem = () => {
  const { isDark } = useTheme();
  const { qualitySettings, updateMetrics } = usePerformanceOptimizer();
  const [particleCount, setParticleCount] = useState(2500);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef({ width: 0, height: 0 });
  const lastTimeRef = useRef(performance.now());

  // Initialize the particle system
  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Set up renderer with quality settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: qualitySettings.antiAliasing !== 'off',
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(0x000000), 0); // Transparent background

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles based on quality settings
    const particles: Particle[] = [];
    const currentParticleCount = qualitySettings.particleCount;

    // Initialize particles in a more complex formation
    for (let i = 0; i < currentParticleCount; i++) {
      // Create particles in a spherical formation with some variation
      const radius = 5 * Math.cbrt(Math.random()); // To distribute evenly in 3D sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      // Add more dynamic velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03
      );

      const acceleration = new THREE.Vector3(0, 0, 0);

      // Create more complex gradient of colors based on position and index
      const color = new THREE.Color();
      if (isDark) {
        // Dark theme colors: purples, blues, teals
        color.setHSL(
          0.7 + (i % 100) / 300, // Vary hue slightly based on index
          0.7 + Math.sin(i * 0.1) * 0.2, // Vary saturation
          0.4 + Math.abs(position.x) / 10 * 0.3 // Vary lightness based on position
        );
      } else {
        // Light theme colors: blues, purples, teals
        color.setHSL(
          0.6 + (i % 100) / 300, // Vary hue slightly based on index
          0.6 + Math.sin(i * 0.1) * 0.3, // Vary saturation
          0.4 + Math.abs(position.y) / 10 * 0.3 // Vary lightness based on position
        );
      }

      particles.push({
        position,
        velocity,
        acceleration,
        size: Math.random() * 0.08 + 0.01, // Smaller particles for better performance
        color,
        originalSize: Math.random() * 0.08 + 0.01,
        originalColor: new THREE.Color(color)
      });
    }

    particlesRef.current = particles;

    // Create optimized geometry and material for GPU acceleration
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(currentParticleCount * 3);
    const colors = new Float32Array(currentParticleCount * 3);
    const sizes = new Float32Array(currentParticleCount);

    for (let i = 0; i < currentParticleCount; i++) {
      const particle = particles[i];
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;

      colors[i * 3] = particle.color.r;
      colors[i * 3 + 1] = particle.color.g;
      colors[i * 3 + 2] = particle.color.b;

      sizes[i] = particle.size;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1)); // For dynamic sizing

    // Use shader material for better GPU performance with large particle counts
    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointSize: { value: 0.05 },
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Add subtle animation to particles
          float angle = time * 0.001 + position.x * 0.1;
          mvPosition.x += sin(angle + time * 0.0005) * 0.2;
          mvPosition.y += cos(angle + time * 0.0005) * 0.2;

          gl_PointSize = size * 1000.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
          gl_FragColor = vec4(vColor, 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Store current bounds
    boundsRef.current = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);

      boundsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with performance monitoring
    const animate = () => {
      const now = performance.now();
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      animationRef.current = requestAnimationFrame(animate);

      // Update particles
      updateParticles();

      // Render the scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        // Update performance metrics
        updateMetrics({
          renderTime: performance.now() - now,
          activeAnimations: 1,
          particleCount: currentParticleCount
        });
      }
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Dispose of Three.js objects
      if (particleSystemRef.current) {
        const geometry = particleSystemRef.current.geometry;
        const material = particleSystemRef.current.material as THREE.ShaderMaterial;

        geometry.dispose();
        material.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isDark, qualitySettings]);

  // Update particles with physics
  const updateParticles = () => {
    if (!particleSystemRef.current || !sceneRef.current || !rendererRef.current) return;

    const positions = particleSystemRef.current.geometry.attributes.position.array as Float32Array;
    const colors = particleSystemRef.current.geometry.attributes.color.array as Float32Array;
    const sizes = particleSystemRef.current.geometry.attributes.size.array as Float32Array;
    const time = Date.now() * 0.001;

    // Update time uniform for shader
    const material = particleSystemRef.current.material as THREE.ShaderMaterial;
    material.uniforms.time.value = time;

    // Calculate mouse force based on quality settings
    const mouseForceMultiplier = qualitySettings.animationComplexity === 'ultra' ? 3 :
                                qualitySettings.animationComplexity === 'high' ? 2 : 1.5;

    const mouseForce = new THREE.Vector3(
      mousePositionRef.current.x * mouseForceMultiplier,
      mousePositionRef.current.y * mouseForceMultiplier,
      0
    );

    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      // Calculate distance to mouse
      const dx = particle.position.x - mouseForce.x;
      const dy = particle.position.y - mouseForce.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply mouse force if close enough (adjust radius based on quality)
      const interactionRadius = qualitySettings.animationComplexity === 'ultra' ? 4 :
                               qualitySettings.animationComplexity === 'high' ? 3 : 2;

      if (distance < interactionRadius) {
        const force = (qualitySettings.animationComplexity === 'ultra' ? 3.0 :
                      qualitySettings.animationComplexity === 'high' ? 2.0 : 1.5) / (distance + 0.1);
        particle.velocity.x += (dx / distance) * force * 0.02;
        particle.velocity.y += (dy / distance) * force * 0.02;
      }

      // Add some noise for organic movement (reduce for lower quality)
      const noise = qualitySettings.animationComplexity === 'low' ? 0.002 :
                   qualitySettings.animationComplexity === 'medium' ? 0.003 : 0.005;
      particle.velocity.x += (Math.random() - 0.5) * noise;
      particle.velocity.y += (Math.random() - 0.5) * noise;
      particle.velocity.z += (Math.random() - 0.5) * noise;

      // Apply gravity towards center with a more complex field (adjust based on quality)
      const centerX = Math.sin(time * 0.0005) * 0.5;
      const centerY = Math.cos(time * 0.0005) * 0.5;
      const centerZ = Math.sin(time * 0.0003) * 0.3;

      const gravityForce = qualitySettings.animationComplexity === 'low' ? 0.0005 : 0.001;
      particle.velocity.x += (centerX - particle.position.x) * gravityForce;
      particle.velocity.y += (centerY - particle.position.y) * gravityForce;
      particle.velocity.z += (centerZ - particle.position.z) * gravityForce;

      // Apply velocity
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      particle.position.z += particle.velocity.z;

      // Apply friction (adjust based on quality)
      const friction = qualitySettings.animationComplexity === 'low' ? 0.94 : 0.96;
      particle.velocity.multiplyScalar(friction);

      // Boundary constraints with wrapping behavior
      const boundary = 6;

      // X-axis wrapping
      if (particle.position.x > boundary) {
        particle.position.x = -boundary;
        particle.position.y = (Math.random() - 0.5) * 8;
        particle.position.z = (Math.random() - 0.5) * 4;
      } else if (particle.position.x < -boundary) {
        particle.position.x = boundary;
        particle.position.y = (Math.random() - 0.5) * 8;
        particle.position.z = (Math.random() - 0.5) * 4;
      }

      // Y-axis wrapping
      if (particle.position.y > boundary) {
        particle.position.y = -boundary;
      } else if (particle.position.y < -boundary) {
        particle.position.y = boundary;
      }

      // Z-axis wrapping
      if (particle.position.z > boundary * 0.5) {
        particle.position.z = -boundary * 0.5;
      } else if (particle.position.z < -boundary * 0.5) {
        particle.position.z = boundary * 0.5;
      }

      // Apply position to geometry
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;

      // Adjust color based on velocity (faster particles are brighter)
      const speed = particle.velocity.length();
      const brightnessFactor = Math.min(
        qualitySettings.animationComplexity === 'ultra' ? 1.5 :
        qualitySettings.animationComplexity === 'high' ? 1.2 : 1.0,
        0.6 + speed * (qualitySettings.animationComplexity === 'ultra' ? 300 :
                      qualitySettings.animationComplexity === 'high' ? 200 : 100)
      );

      particle.color.r = particle.originalColor.r * brightnessFactor;
      particle.color.g = particle.originalColor.g * brightnessFactor;
      particle.color.b = particle.originalColor.b * brightnessFactor;

      colors[i * 3] = particle.color.r;
      colors[i * 3 + 1] = particle.color.g;
      colors[i * 3 + 2] = particle.color.b;

      // Slightly adjust size based on velocity
      const sizeMultiplier = qualitySettings.animationComplexity === 'ultra' ? 2 :
                            qualitySettings.animationComplexity === 'high' ? 1.5 : 1;
      sizes[i] = particle.originalSize * (0.8 + speed * (50 * sizeMultiplier));
    }

    // Update the geometry attributes
    particleSystemRef.current.geometry.attributes.position.needsUpdate = true;
    particleSystemRef.current.geometry.attributes.color.needsUpdate = true;
    particleSystemRef.current.geometry.attributes.size.needsUpdate = true;
  };

  // Update particle colors when theme changes
  useEffect(() => {
    if (!particleSystemRef.current) return;

    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      // Update original color based on theme
      if (isDark) {
        particle.originalColor.setHSL(
          (particle.position.x / 10 + 0.5) * 0.3 + 0.5, // Purple to blue range
          0.7,
          0.6
        );
      } else {
        particle.originalColor.setHSL(
          (particle.position.x / 10 + 0.5) * 0.3, // Blue to purple range
          0.7,
          0.5
        );
      }
    }

    // Trigger a color update
    updateParticles();
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: isDark ? 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)' : 'radial-gradient(ellipse at center, #e2e8f0 0%, #f8fafc 100%)' }}
    />
  );
};