import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const base = `
    inline-flex items-center justify-center rounded-xl font-medium
    transition-all duration-200 active:scale-95
    disabled:opacity-50 disabled:pointer-events-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
  `;

  const variants: Record<string, string> = {
    primary:   'gradient-primary text-white shadow-primary-sm hover:opacity-90',
    secondary: 'bg-secondary text-white shadow-secondary-sm hover:bg-secondary/90',
    outline:   'border border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5',
    ghost:     'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
    danger:    'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
