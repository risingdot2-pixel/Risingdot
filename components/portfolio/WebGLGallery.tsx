// components/portfolio/WebGLGallery.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useTheme } from '@/components/ThemeContext';

// Define the type for each project in the gallery
interface GalleryProject {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
}

export const WebGLGallery = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationRef = useRef<number | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  // Sample project data for the gallery
  const projects: GalleryProject[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Custom Shopify store',
      category: 'Shopify',
      color: isDark ? '#8B5CF6' : '#7C3AED' // violet
    },
    {
      id: 2,
      title: 'AI Chatbot',
      description: 'Advanced conversational AI',
      category: 'Chatbot',
      color: isDark ? '#3B82F6' : '#2563EB' // blue
    },
    {
      id: 3,
      title: 'Workflow Automation',
      description: 'N8N business process automation',
      category: 'Automation',
      color: isDark ? '#0D9488' : '#0F766E' // teal
    },
    {
      id: 4,
      title: 'Corporate Website',
      description: 'Responsive WordPress site',
      category: 'Web Design',
      color: isDark ? '#F59E0B' : '#D97706' // amber
    },
    {
      id: 5,
      title: 'SEO Campaign',
      description: 'Comprehensive SEO strategy',
      category: 'SEO',
      color: isDark ? '#10B981' : '#059669' // emerald
    },
    {
      id: 6,
      title: 'Custom CRM',
      description: 'Enterprise management platform',
      category: 'Web Application',
      color: isDark ? '#EC4899' : '#DB2777' // pink
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x0f172a : 0xf8fafc); // gray-900 or gray-50
    sceneRef.current = scene;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create cubes for each project
    const cubes: THREE.Mesh[] = [];
    const spacing = 5; // Space between cubes
    const startX = -((projects.length - 1) * spacing) / 2;
    
    projects.forEach((project, index) => {
      // Create a cube geometry
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      
      // Create a material with the project's color
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(project.color),
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      
      // Create the mesh
      const cube = new THREE.Mesh(geometry, material);
      
      // Position the cube in a line
      cube.position.x = startX + index * spacing;
      
      // Add a slight random rotation for visual interest
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      
      // Add to scene and store reference
      scene.add(cube);
      cubes.push(cube);
    });
    
    cubesRef.current = cubes;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate each cube with slightly different speeds
      cubesRef.current.forEach((cube, index) => {
        cube.rotation.x += 0.005 * (index + 1);
        cube.rotation.y += 0.005 * (index + 1);
      });
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Render the scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Dispose of geometries and materials
      cubesRef.current.forEach(cube => {
        const geometry = cube.geometry;
        const material = cube.material as THREE.Material;
        
        geometry.dispose();
        material.dispose();
      });
      
      // Remove from DOM
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isDark]);

  // Update colors when theme changes
  useEffect(() => {
    const themeColors = {
      'E-commerce Platform': isDark ? '#8B5CF6' : '#7C3AED', // violet
      'AI Chatbot': isDark ? '#3B82F6' : '#2563EB', // blue
      'Workflow Automation': isDark ? '#0D9488' : '#0F766E', // teal
      'Corporate Website': isDark ? '#F59E0B' : '#D97706', // amber
      'SEO Campaign': isDark ? '#10B981' : '#059669', // emerald
      'Custom CRM': isDark ? '#EC4899' : '#DB2777' // pink
    };

    cubesRef.current.forEach((cube, index) => {
      const material = cube.material as THREE.MeshPhongMaterial;
      material.color = new THREE.Color(Object.values(themeColors)[index]);
    });
  }, [isDark]);

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100/50 to-blue-100/50 dark:from-gray-800 dark:to-gray-900 border border-violet-200/30 dark:border-gray-700">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Information overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h3 className="text-xl font-bold">Interactive Portfolio Gallery</h3>
        <p className="text-violet-200">3D visualization of our projects and solutions</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-violet-500/10 dark:bg-violet-500/5"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/5"></div>
    </div>
  );
};