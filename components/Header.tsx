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
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Marketing Hub</h1>
        </div>
      </div>
    </header>
  );
} 