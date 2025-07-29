interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    if (normalizedStatus.includes('delivered') || normalizedStatus.includes('✅')) {
      return {
        bg: 'bg-neon-green/20',
        border: 'border-neon-green/50',
        text: 'text-neon-green',
        glow: 'shadow-[0_0_10px_hsl(var(--neon-green)/0.3)]'
      };
    }
    
    if (normalizedStatus.includes('progress') || normalizedStatus.includes('⏳')) {
      return {
        bg: 'bg-electric-blue/20',
        border: 'border-electric-blue/50', 
        text: 'text-electric-blue',
        glow: 'shadow-[0_0_10px_hsl(var(--electric-blue)/0.3)]'
      };
    }
    
    // Default neutral
    return {
      bg: 'bg-cyber-gray/40',
      border: 'border-muted-foreground/30',
      text: 'text-muted-foreground',
      glow: 'shadow-[0_0_5px_hsl(var(--cyber-gray)/0.2)]'
    };
  };

  const styles = getStatusStyles(status);

  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium
        ${styles.bg} ${styles.border} ${styles.text} ${styles.glow}
        border backdrop-blur-sm hover:scale-105 transition-all duration-200
        ${className}
      `}
    >
      {status}
    </span>
  );
};