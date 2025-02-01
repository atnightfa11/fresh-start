"use client";

import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RefreshButtonProps {
  onClick: () => void;
  lastUpdated: Date;
  loading?: boolean;
  className?: string;
}

export function RefreshButton({ onClick, lastUpdated, loading, className }: RefreshButtonProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/10 disabled:opacity-50 disabled:pointer-events-none"
      >
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
        </motion.div>
        Refresh
      </button>
      <motion.span 
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={lastUpdated.toISOString()}
      >
        Last updated: {lastUpdated.toLocaleTimeString()}
      </motion.span>
    </div>
  );
} 