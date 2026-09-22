import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'terminal' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-bold transition-all rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none';
    
    const variants = {
      default: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20',
      terminal: 'bg-[#00C076] hover:bg-[#00d684] text-black font-mono shadow-lg shadow-[#00C076]/25 border border-[#00C076]',
      outline: 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500',
      ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/60',
      danger: 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 h-8',
      md: 'text-sm px-4 py-2.5 h-10',
      lg: 'text-base px-6 py-3.5 h-12',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
