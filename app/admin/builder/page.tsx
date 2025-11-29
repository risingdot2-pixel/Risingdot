// app/admin/builder/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageBuilder } from '@/components/admin/PageBuilder';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';

export default function BuilderPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading page builder...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <SEOHead
          title="Page Builder - Rising Dot Agency Admin"
          description="Visual page builder for Rising Dot Agency website - Create and customize pages with our drag-and-drop interface."
          path="/admin/builder"
          type="website"
        />
        <AdminLayout>
          <div className="h-[calc(100vh-70px)]">
            <PageBuilder />
          </div>
        </AdminLayout>
        <AccessibilityControls />
      </div>
    </ThemeProvider>
  );
}