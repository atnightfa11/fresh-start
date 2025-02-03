"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DataErrorProps {
  message?: string;
}

export default function DataError({ message }: DataErrorProps) {
  return (
    <div className="p-8 text-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {message || "Failed to load marketing data"}
        </AlertDescription>
      </Alert>
    </div>
  );
} 