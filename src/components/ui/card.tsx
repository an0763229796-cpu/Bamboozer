import React from 'react';
import { cn } from '../../lib/utils';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('bg-[#0c121e] border border-slate-800 rounded-2xl p-5 shadow-xl text-white', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>{children}</div>;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return <h3 className={cn('text-lg font-bold text-white tracking-tight', className)} {...props}>{children}</h3>;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return <div className={cn('pt-0', className)} {...props}>{children}</div>;
};
