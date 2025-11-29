// lib/physics/physicsEngine.ts
import { SpringSystem } from './springSystem';

export interface PhysicsConfig {
  gravity?: number;
  friction?: number;
  timeStep?: number;
  maxSubSteps?: number;
}

export interface PhysicsObject {
  id: string;
  position: { x: number; y: number; z?: number };
  velocity: { x: number; y: number; z?: number };
  acceleration: { x: number; y: number; z?: number };
  mass: number;
  radius: number;
  color: string;
  fixed?: boolean;
}

export class PhysicsEngine {
  private objects: PhysicsObject[] = [];
  private springs: SpringSystem[] = [];
  private gravity: number;
  private friction: number;
  private timeStep: number;
  private maxSubSteps: number;
  private lastUpdate: number;
  private animationFrameId: number | null = null;
  private running: boolean = false;

  constructor(config: PhysicsConfig = {}) {
    this.gravity = config.gravity ?? 0.5;
    this.friction = config.friction ?? 0.99;
    this.timeStep = config.timeStep ?? 0.016; // ~60fps
    this.maxSubSteps = config.maxSubSteps ?? 10;
    this.lastUpdate = performance.now();
  }

  init() {
    this.running = true;
    this.lastUpdate = performance.now();
    this.animationLoop();
  }

  destroy() {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  add(object: PhysicsObject) {
    this.objects.push(object);
  }

  remove(id: string) {
    this.objects = this.objects.filter(obj => obj.id !== id);
  }

  addSpring(spring: SpringSystem) {
    this.springs.push(spring);
  }

  update(deltaTime: number) {
    // Update springs
    this.springs.forEach(spring => spring.update(deltaTime));

    // Update physics objects
    for (const obj of this.objects) {
      if (obj.fixed) continue;

      // Apply gravity
      obj.acceleration.y += this.gravity;

      // Update velocity
      obj.velocity.x += obj.acceleration.x * deltaTime;
      obj.velocity.y += obj.acceleration.y * deltaTime;
      obj.velocity.z = (obj.velocity.z || 0) + (obj.acceleration.z || 0) * deltaTime;

      // Apply friction
      obj.velocity.x *= this.friction;
      obj.velocity.y *= this.friction;
      obj.velocity.z = (obj.velocity.z || 0) * this.friction;

      // Update position
      obj.position.x += obj.velocity.x * deltaTime;
      obj.position.y += obj.velocity.y * deltaTime;
      obj.position.z = (obj.position.z || 0) + (obj.velocity.z || 0) * deltaTime;

      // Reset acceleration
      obj.acceleration.x = 0;
      obj.acceleration.y = 0;
      obj.acceleration.z = 0;

      // Boundary collision - left/right
      if (obj.position.x - obj.radius < 0) {
        obj.position.x = obj.radius;
        obj.velocity.x *= -0.8; // bounce with energy loss
      } else if (obj.position.x + obj.radius > window.innerWidth) {
        obj.position.x = window.innerWidth - obj.radius;
        obj.velocity.x *= -0.8;
      }

      // Boundary collision - top/bottom
      if (obj.position.y - obj.radius < 0) {
        obj.position.y = obj.radius;
        obj.velocity.y *= -0.8;
      } else if (obj.position.y + obj.radius > window.innerHeight) {
        obj.position.y = window.innerHeight - obj.radius;
        obj.velocity.y *= -0.8;
      }

      // Boundary collision - z-axis (if applicable)
      if (obj.position.z && obj.position.z < -100) {
        obj.position.z = -100;
        obj.velocity.z = (obj.velocity.z || 0) * -0.8;
      } else if (obj.position.z && obj.position.z > 100) {
        obj.position.z = 100;
        obj.velocity.z = (obj.velocity.z || 0) * -0.8;
      }
    }

    // Check for collisions between objects
    this.checkCollisions();
  }

  checkCollisions() {
    for (let i = 0; i < this.objects.length; i++) {
      for (let j = i + 1; j < this.objects.length; j++) {
        const obj1 = this.objects[i];
        const obj2 = this.objects[j];

        if (obj1.fixed && obj2.fixed) continue;

        const dx = obj2.position.x - obj1.position.x;
        const dy = obj2.position.y - obj1.position.y;
        const dz = (obj2.position.z || 0) - (obj1.position.z || 0);
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < obj1.radius + obj2.radius) {
          // Collision detected
          this.resolveCollision(obj1, obj2, dx, dy, dz, distance);
        }
      }
    }
  }

  resolveCollision(obj1: PhysicsObject, obj2: PhysicsObject, dx: number, dy: number, dz: number, distance: number) {
    // Calculate collision normal
    const nx = dx / distance;
    const ny = dy / distance;
    const nz = dz / distance;

    // Minimum translation distance to push objects apart
    const overlap = (obj1.radius + obj2.radius) - distance;
    const separationX = nx * overlap * 0.5;
    const separationY = ny * overlap * 0.5;
    const separationZ = nz * overlap * 0.5;

    // Separate objects
    if (!obj1.fixed) {
      obj1.position.x -= separationX;
      obj1.position.y -= separationY;
      obj1.position.z = (obj1.position.z || 0) - separationZ;
    }

    if (!obj2.fixed) {
      obj2.position.x += separationX;
      obj2.position.y += separationY;
      obj2.position.z = (obj2.position.z || 0) + separationZ;
    }

    // Calculate relative velocity
    const rvx = obj2.velocity.x - obj1.velocity.x;
    const rvy = obj2.velocity.y - obj1.velocity.y;
    const rvz = (obj2.velocity.z || 0) - (obj1.velocity.z || 0);

    // Calculate relative velocity along the normal
    const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

    // Do not resolve if velocities are separating
    if (velAlongNormal > 0) return;

    // Calculate restitution (bounciness)
    const restitution = 0.8;

    // Calculate impulse scalar
    const impulseScalar = -(1 + restitution) * velAlongNormal;
    const impulseScalarTotal = impulseScalar / (obj1.mass + obj2.mass);

    // Apply impulse
    const impulseX = impulseScalarTotal * nx;
    const impulseY = impulseScalarTotal * ny;
    const impulseZ = impulseScalarTotal * nz;

    if (!obj1.fixed) {
      obj1.velocity.x -= impulseX / obj1.mass;
      obj1.velocity.y -= impulseY / obj1.mass;
      obj1.velocity.z = (obj1.velocity.z || 0) - impulseZ / obj1.mass;
    }

    if (!obj2.fixed) {
      obj2.velocity.x += impulseX / obj2.mass;
      obj2.velocity.y += impulseY / obj2.mass;
      obj2.velocity.z = (obj2.velocity.z || 0) + impulseZ / obj2.mass;
    }
  }

  private animationLoop = () => {
    if (!this.running) return;

    const now = performance.now();
    const deltaTime = Math.min(0.1, (now - this.lastUpdate) / 1000); // Cap at 0.1 seconds
    this.lastUpdate = now;

    this.update(deltaTime);

    this.animationFrameId = requestAnimationFrame(this.animationLoop);
  }

  getObjects() {
    return [...this.objects];
  }

  getObject(id: string) {
    return this.objects.find(obj => obj.id === id);
  }

  setObjectPosition(id: string, position: { x: number; y: number; z?: number }) {
    const obj = this.getObject(id);
    if (obj) {
      obj.position = { ...obj.position, ...position };
    }
  }

  applyForce(id: string, force: { x: number; y: number; z?: number }) {
    const obj = this.getObject(id);
    if (obj) {
      obj.acceleration.x += force.x / obj.mass;
      obj.acceleration.y += force.y / obj.mass;
      if (force.z !== undefined) {
        obj.acceleration.z = (obj.acceleration.z || 0) + force.z / obj.mass;
      }
    }
  }
}