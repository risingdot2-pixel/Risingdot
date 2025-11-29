import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/security/rateLimiter';

const rateLimiter = new RateLimiter();

// Trusted domains for URL validation
const TRUSTED_DOMAINS = [
  'risingdot.agency',
  'localhost',
  '127.0.0.1'
];

// CSP directives
const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https: blob:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com",
  "frame-src 'self' https://www.youtube.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "block-all-mixed-content",
  "upgrade-insecure-requests"
].join('; ');

export function middleware(request: NextRequest) {
  // Rate limiting
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const isAllowed = rateLimiter.isAllowed(clientIP, 100); // Max 100 requests per 15 minutes

  if (!isAllowed) {
    return new NextResponse('Rate limit exceeded', { status: 429 });
  }

  // For form submissions and API routes
  if (request.method === 'POST') {
    // In a real implementation, we would validate the body content here
    // This is a simplified example - in Next.js middleware, we can't read the body
    // so we'd need to validate in API route handlers
  }

  // Create response
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Content-Security-Policy', CSP_HEADER);

  // Add custom security headers
  response.headers.set('X-Rising-Dot-Security', 'enabled');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
};