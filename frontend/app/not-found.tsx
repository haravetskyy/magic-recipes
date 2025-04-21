'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => (
  <div className="flex h-full flex-col items-center justify-center bg-background text-foreground">
    <h1 className="text-4xl font-bold">Page Not Found</h1>
    <p className="mt-4 text-lg">Sorry, the page you’re looking for doesn’t exist.</p>
    <Button asChild className="mt-6">
      <Link href="/">Go to Main Page</Link>
    </Button>
  </div>
);

export default NotFound;
