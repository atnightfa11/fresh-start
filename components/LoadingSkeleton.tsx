"use client";

import { motion } from "framer-motion";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-1/3 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-1/2 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-muted/20 p-6 rounded-xl border border-border/50 space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-32 bg-muted/50 rounded-xl animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Trending Topics Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-1/4 bg-muted rounded-lg animate-pulse" />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-muted/20 rounded-xl border border-border/50 animate-pulse"
            />
          ))}
        </div>

        {/* Insights Skeleton */}
        <div className="space-y-8">
          {/* Insights Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-1/4 bg-muted rounded-lg animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-muted/20 rounded-xl border border-border/50 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Opportunities Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-1/4 bg-muted rounded-lg animate-pulse" />
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-muted/20 rounded-xl border border-border/50 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 