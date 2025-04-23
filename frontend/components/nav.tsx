import { Github, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { Button } from './ui/button';

const Nav = () => {
  return (
    <nav className="flex flex-row py-2 md:py-4 md:px-6 gap-4 items-center justify-between sticky top-0 bg-background">
      <Button variant="link" className="p-0">
        <Link href={'/'} className="flex flex-row gap-2 items-center">
          <Sparkles />
          <h2 className="font-semibold text-lg">Magic Recipes</h2>
        </Link>
      </Button>

      <div className="flex flex-row gap-4 items-center">
        <Link href={'https://github.com/haravetskyy/magic-recipe'}>
          <Github />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Nav;
