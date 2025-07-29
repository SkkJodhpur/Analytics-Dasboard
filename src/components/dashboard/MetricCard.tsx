import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
  children?: ReactNode;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  className = '',
  children 
}: MetricCardProps) => {
  const changeColorClass = {
    positive: 'text-neon-green',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  }[changeType];

  return (
    <div className={`glass glass-hover neon-border rounded-lg p-4 sm:p-6 group relative overflow-hidden ${className}`}>
      {/* Animated background grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      
      {/* Floating neon particles */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full animate-float opacity-60" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-neon-purple rounded-full animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
          <div className="p-2 rounded-lg bg-gradient-cyber/20 group-hover:bg-gradient-cyber/30 transition-all duration-300 w-fit">
            <Icon className="w-5 h-5 text-neon-cyan group-hover:animate-cyber-pulse" />
          </div>
          {change && (
            <span className={`text-xs sm:text-sm font-mono ${changeColorClass} group-hover:animate-neon-glow text-right sm:text-left`}>
              {change}
            </span>
          )}
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide uppercase leading-tight">
            {title}
          </h3>
          <p className="text-xl sm:text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent group-hover:animate-cyber-pulse leading-tight">
            {value}
          </p>
        </div>
        
        {children && (
          <div className="mt-4 pt-4 border-t border-border/50">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};