import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`
      bg-card border border-border rounded-2xl overflow-hidden
      shadow-card hover:shadow-secondary-sm
      transition-shadow duration-300
      ${className}
    `}>
      {title && (
        <div className="px-6 py-4 border-b border-border bg-muted/40 flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <h3 className="text-sm font-semibold text-foreground tracking-wide">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
