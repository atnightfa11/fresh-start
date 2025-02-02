'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-gray-400">We&apos;re working on fixing the issue.</p>
        <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
        <Button variant="default" onClick={reset}>Try again</Button>
      </div>
    </div>
  );
} 