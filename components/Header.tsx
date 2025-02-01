"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/get-started'); // or any other action you want
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Neural Signal
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/trends" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              Trends
            </Link>
            <Link 
              href="/insights" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              Insights
            </Link>
            <Button 
              variant="default" 
              className="rounded-xl px-6 py-3 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              asChild
            >
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/trends" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Trends
              </Link>
              <Link href="/insights" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Insights
              </Link>
              <Link href="/tools" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Tools
              </Link>
              <Button variant="default" className="w-full mt-2">Get Started</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 