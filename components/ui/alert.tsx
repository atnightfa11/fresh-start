import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  variant?: 'default' | 'destructive';
  className?: string;
}

export function Alert({ children, variant = 'default', className = '' }: AlertProps) {
  const variantClasses = {
    default: 'bg-blue-50 text-blue-700 border-blue-200',
    destructive: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
}