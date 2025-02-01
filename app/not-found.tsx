import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl">Page not found</p>
        <p className="text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button variant="default" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
} 