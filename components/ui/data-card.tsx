"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface DataCardProps extends HTMLMotionProps<"div"> {
  gradient?: boolean;
}

export function DataCard({ className, gradient, children, ...props }: DataCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "rounded-xl border border-gray-800 bg-[var(--color-surface)] p-6",
        gradient && "bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface)]/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
} 