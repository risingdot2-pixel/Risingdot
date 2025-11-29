// components/layout/ResponsiveLayout.tsx
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveLayout = ({ children, className = '' }: ResponsiveLayoutProps) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
};