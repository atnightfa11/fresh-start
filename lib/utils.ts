import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProgressWidth(value: number): string {
  return `w-[${(value * 100).toFixed(0)}%]`;
}

export const formatPercentage = (value: string | number) => {
  const num = typeof value === 'string' 
    ? parseFloat(value.replace('%', '')) 
    : value;
    
  return !isNaN(num) ? num.toFixed(1) + '%' : '0.0%';
};