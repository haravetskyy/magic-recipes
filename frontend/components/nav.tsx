import { Github, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { Button } from './ui/button';

const Nav = () => {
  return (
    <section className="rounded-lg flex flex-row md:px-6 gap-4 items-center justify-between">
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
    </section>
  );
};

export default Nav;
