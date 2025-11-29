// components/admin/AdminLayout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Page Builder', href: '/admin/builder' },
    { name: 'Content', href: '/admin/content' },
    { name: 'Media', href: '/admin/media' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">RD</span>
            </div>
            {sidebarOpen && (
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                Rising<span className="text-indigo-500">Dot</span>
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-2 py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg mb-2 transition-colors ${
                    item.href === '/admin'
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg"> {/* Using placeholder icons */}
                    {item.name === 'Dashboard' && '📊'}
                    {item.name === 'Page Builder' && '🧩'}
                    {item.name === 'Content' && '📝'}
                    {item.name === 'Media' && '🖼️'}
                    {item.name === 'Users' && '👥'}
                    {item.name === 'Settings' && '⚙️'}
                  </span>
                  {sidebarOpen && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {sidebarOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  <span className="text-sm font-medium">U</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};