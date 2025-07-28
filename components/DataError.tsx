"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FallbackProps } from 'react-error-boundary';

interface DataErrorProps extends Partial<FallbackProps> {
  message?: string;
  error?: Error;
}

export default function DataError({ error, message }: DataErrorProps) {
  return (
    <div className="p-8 text-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error?.message || message || "Failed to load marketing data"}
        </AlertDescription>
      </Alert>
    </div>
  );
} 