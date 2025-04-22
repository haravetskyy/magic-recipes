import { MoveDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const headerContent = {
  mainHeading: 'Easiest recipes from all over the world!',
  paragraph:
    'Discover the joy of global cuisine with our collection of quick and simple recipes! From the zesty Italian Caprese salad, ready in minutes, to the comforting Japanese miso soup that warms the soul, these dishes bring authentic flavors to your table without the fuss.',
  buttonContent: {
    text: 'Explore',
    icon: MoveDown,
  },
  imageContent: {
    src: '/header.png',
    width: 300,
    height: 300,
  },
};

const Header = () => {
  return (
    <header className="md:h-1/2 flex flex-col gap-4">
      <div className="h-full rounded-lg md:p-4 flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl md:text-6xl lg:w-2/3">
            {headerContent.mainHeading}
          </h2>

          <p className="lg:w-2/3">{headerContent.paragraph}</p>

          <Button className="w-min uppercase">
            <Link href={'#main'} className="flex flex-row gap-2 items-center">
              {headerContent.buttonContent.text} <headerContent.buttonContent.icon />
            </Link>
          </Button>
        </div>

        <Image
          className="w-3/4 md:w-auto"
          alt="Image with delicious food for header"
          {...headerContent.imageContent}
        />
      </div>
    </header>
  );
};

export default Header;
