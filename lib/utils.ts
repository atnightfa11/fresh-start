import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProgressWidth(value: number): string {
  return `w-[${(value * 100).toFixed(0)}%]`;
}