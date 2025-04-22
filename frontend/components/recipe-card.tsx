import { Recipe } from '@/types/recipe';
import { CookingPot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardTitle } from './ui/card';

const RecipeCard = ({ id, name, category, area, thumbnail }: Recipe) => {
  return (
    <Card>
      <CardTitle className="text-2xl">{name}</CardTitle>

      <Image
        src={thumbnail}
        alt={`Image for ${name}`}
        width={300}
        height={300}
        className="rounded-lg w-full"
      />

      <div className="flex flex-row gap-2">
        <Badge variant="secondary">{category}</Badge>
        <Badge variant="secondary">{area}</Badge>
      </div>

      <Link href={`/recipes/${id}`}>
        <Button className="cursor-pointer w-full px-12 ">
          See complete recipe <CookingPot />
        </Button>
      </Link>
    </Card>
  );
};

export default RecipeCard;
