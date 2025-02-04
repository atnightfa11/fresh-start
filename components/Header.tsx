"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              Neural<span className="text-cyan-500">Signal</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/trends"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Trends
            </Link>
            <Link
              href="/insights"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/tools"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Tools
            </Link>
          </nav>
        </div>
      </nav>
    </header>
  );
} 