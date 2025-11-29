// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <SEOHead
          title="Admin Dashboard - Rising Dot Agency"
          description="Rising Dot Agency Admin Dashboard - Manage content, build pages, and monitor analytics."
          path="/admin"
          type="website"
        />
        <AdminLayout>
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Content Management</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Manage pages, posts, and website content
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Manage Content
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Page Builder</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Create and customize pages visually
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Launch Builder
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Analytics</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    View website performance and user data
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
        <AccessibilityControls />
      </div>
    </ThemeProvider>
  );
}