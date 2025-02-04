"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="mb-4">
            <span className="text-sm font-medium bg-cyan-900/20 text-cyan-400 px-4 py-1.5 rounded-full">
              Real-Time AI Marketing Intelligence
            </span>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Track the Pulse of
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Marketing
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Neural Signal delivers live insights on AI marketing trends, 
            consumer behavior shifts, and campaign performance metrics
          </p>

          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="rounded-lg px-8 py-6 text-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition-colors"
            >
              <Link href="/trends">Explore Live Trends</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-lg px-8 py-6 text-lg font-semibold text-foreground border-border hover:bg-accent"
            >
              View Platform Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 