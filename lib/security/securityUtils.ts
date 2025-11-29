// lib/security/securityUtils.ts
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim();
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates that a URL is from a trusted domain
 */
export const validateTrustedUrl = (url: string, trustedDomains: string[] = []): boolean => {
  try {
    const urlObj = new URL(url);
    return trustedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};

/**
 * Generates a CSRF token
 */
export const generateCSRFToken = (): string => {
  return Array.from({ length: 32 }, () => 
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
};

/**
 * Validates a CSRF token
 */
export const validateCSRFToken = (token: string, expectedToken: string): boolean => {
  return token === expectedToken;
};

/**
 * Checks if a string contains potential malicious patterns
 */
export const hasMaliciousPattern = (input: string): boolean => {
  const patterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /expression\(/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i
  ];

  return patterns.some(pattern => pattern.test(input));
};

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;

  constructor(windowMs: number = 15 * 60 * 1000) { // 15 minutes default
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string, maxRequests: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the time window
    const validRequests = requests.filter(timestamp => now - timestamp < this.windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

/**
 * Input validation utility
 */
export const validateInput = (input: string, type: 'text' | 'email' | 'url' | 'phone' = 'text'): boolean => {
  if (!input) return false;

  switch (type) {
    case 'email':
      return validateEmail(input);
    case 'url':
      try {
        new URL(input);
        return true;
      } catch {
        return false;
      }
    case 'phone':
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
      return phoneRegex.test(input);
    case 'text':
    default:
      // Check for malicious patterns and length
      return !hasMaliciousPattern(input) && input.length <= 1000;
  }
};