

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  const baseStyles = 'px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#E2DFFF]/20 text-[#3525CD] dark:bg-[var(--primary-container)]/30 dark:text-[var(--primary)]',
    success: 'bg-green-500/10 text-green-500',
    danger: 'bg-red-500/10 text-red-500',
    warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
    neutral: 'bg-[var(--surface-container-high)] text-[var(--on-surface)]',
    outline: 'bg-transparent border border-[var(--outline-variant)] text-[var(--on-surface-variant)]',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
