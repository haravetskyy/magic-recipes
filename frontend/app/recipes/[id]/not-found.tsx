import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

const RecipeNotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold">Recipe Not Found</h1>

      <p className="mt-4 text-lg">The recipe you’re looking for doesn’t exist.</p>

      <Button asChild className="mt-6">
        <Link href="/">
          Go to Main Page <Home />
        </Link>
      </Button>
    </div>
  );
};

export default RecipeNotFound;
