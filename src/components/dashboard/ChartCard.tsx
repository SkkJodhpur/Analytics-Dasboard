import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({ title, subtitle, children, className = '' }: ChartCardProps) => {
  return (
    <div className={`glass glass-hover neon-border rounded-lg p-4 sm:p-6 group relative overflow-hidden ${className}`}>
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-cyber opacity-60" />
      
      {/* Matrix rain effect */}
      <div className="absolute right-4 top-4 text-neon-green text-xs opacity-30 font-mono animate-matrix-rain">
        010101
      </div>
      
      <div className="relative z-10">
        <div className="mb-4 sm:mb-6 space-y-1">
          <h3 className="text-base sm:text-lg font-semibold bg-gradient-electric bg-clip-text text-transparent group-hover:animate-cyber-pulse leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};