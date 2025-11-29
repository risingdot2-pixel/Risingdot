// lib/physics/springSystem.ts
export interface SpringConfig {
  tension?: number;
  friction?: number;
  mass?: number;
  velocity?: number;
  precision?: number;
}

export class SpringSystem {
  private target: number;
  private value: number;
  private velocity: number;
  private tension: number;
  private friction: number;
  private mass: number;
  private precision: number;
  private isOscillating: boolean;

  constructor(target: number = 0, config: SpringConfig = {}) {
    this.target = target;
    this.value = target;
    this.velocity = config.velocity || 0;
    this.tension = config.tension || 170;
    this.friction = config.friction || 26;
    this.mass = config.mass || 1;
    this.precision = config.precision || 0.01;
    this.isOscillating = false;
  }

  update(deltaTime: number) {
    // Calculate acceleration based on spring physics
    const acceleration = (this.tension * (this.target - this.value) - this.friction * this.velocity) / this.mass;

    // Update velocity and position using simple integration
    this.velocity += acceleration * deltaTime;
    this.value += this.velocity * deltaTime;

    // Check if we're close enough to the target
    const distanceToTarget = Math.abs(this.target - this.value);
    const velocityIsSmall = Math.abs(this.velocity) < this.precision;

    if (distanceToTarget < this.precision && velocityIsSmall) {
      this.value = this.target;
      this.velocity = 0;
      this.isOscillating = false;
    } else {
      this.isOscillating = true;
    }
  }

  setTarget(target: number) {
    this.target = target;
  }

  setValue(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  getTarget(): number {
    return this.target;
  }

  getVelocity(): number {
    return this.velocity;
  }

  isAtRest(): boolean {
    return !this.isOscillating;
  }

  reset(target?: number) {
    if (target !== undefined) {
      this.target = target;
    }
    this.value = this.target;
    this.velocity = 0;
    this.isOscillating = false;
  }

  // Advanced spring configuration for different effects
  static presets = {
    gentle: { tension: 120, friction: 20, mass: 1 },
    bouncy: { tension: 200, friction: 10, mass: 1 },
    stiff: { tension: 300, friction: 30, mass: 1 },
    slow: { tension: 80, friction: 25, mass: 1 }
  };
}