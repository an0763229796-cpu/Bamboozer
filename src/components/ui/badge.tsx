import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'purple' | 'terminal';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    purple: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
    terminal: 'bg-[#00C076]/15 text-[#00C076] border border-[#00C076]/40 font-mono',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
