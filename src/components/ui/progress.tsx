import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  indicatorClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className, indicatorClassName, ...props }) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-slate-800', className)}
      {...props}
    >
      <div
        className={cn('h-full bg-emerald-500 transition-all duration-300 rounded-full', indicatorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
