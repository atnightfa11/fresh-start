"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DataError() {
  return (
    <div className="p-8 text-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load marketing data. Please refresh the page or try again later.
        </AlertDescription>
      </Alert>
    </div>
  );
} 