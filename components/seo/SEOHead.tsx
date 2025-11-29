// components/seo/SEOHead.tsx
'use client';

import { useEffect } from 'react';
import { useTheme } from '@/components/ThemeContext';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article' | 'page';
  image?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead = ({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  keywords,
  author,
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const { isDark } = useTheme();
  const siteName = 'Rising Dot Agency';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://risin.com';
  const fullUrl = `${baseUrl}${path}`;
  const defaultImage = `${baseUrl}/og-image.jpg`;

  useEffect(() => {
    // Update title
    document.title = `${title} | ${siteName}`;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      let metaTag = document.querySelector(
        property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords?.join(', ') || '');
    updateMetaTag('author', author || siteName);
    
    // Open Graph tags
    updateMetaTag('og:title', `${title} | ${siteName}`, 'og:title');
    updateMetaTag('og:description', description, 'og:description');
    updateMetaTag('og:url', fullUrl, 'og:url');
    updateMetaTag('og:type', type, 'og:type');
    updateMetaTag('og:image', image || defaultImage, 'og:image');
    updateMetaTag('og:site_name', siteName, 'og:site_name');
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
    updateMetaTag('twitter:title', `${title} | ${siteName}`, 'twitter:title');
    updateMetaTag('twitter:description', description, 'twitter:description');
    updateMetaTag('twitter:image', image || defaultImage, 'twitter:image');
    updateMetaTag('twitter:site', '@risingdotagency', 'twitter:site');
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullUrl;
    
    // Structured data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      'name': title,
      'description': description,
      'url': fullUrl,
      'image': image || defaultImage,
      'author': author ? {
        '@type': 'Person',
        'name': author
      } : {
        '@type': 'Organization',
        'name': siteName
      },
      'publisher': {
        '@type': 'Organization',
        'name': siteName,
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/logo.jpg`
        }
      },
      ...(publishedTime && { 'datePublished': publishedTime }),
      ...(modifiedTime && { 'dateModified': modifiedTime })
    };
    
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, path, type, image, keywords, author, publishedTime, modifiedTime, isDark]);

  return null; // This component only affects the head
};