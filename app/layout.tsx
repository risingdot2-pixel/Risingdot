import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeContext';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { MonitoringProvider } from '@/components/monitoring/MonitoringProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Rising Dot Agency',
  description: 'Premium digital solutions agency specializing in N8N Automations, Chatbots, Web Design, WordPress, Shopify, and SEO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`font-sans bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <MonitoringProvider>
            <AccessibilityProvider>
              {children}
              <div className="fixed inset-0 pointer-events-none z-[999]">
                <div className="absolute bottom-40 right-6 pointer-events-auto">
                  {/* This div will be used to position accessibility controls */}
                </div>
              </div>
            </AccessibilityProvider>
          </MonitoringProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}