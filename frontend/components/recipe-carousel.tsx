import { Recipe } from '@/types/recipe';
import RecipeCard from './recipe-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface RecipeCarouselProps {
  recipes: Recipe[];
}

const RecipeCarousel = ({ recipes }: RecipeCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full">
      <CarouselContent>
        {recipes.map(recipe => (
          <CarouselItem key={recipe.id} className="md:basis-1/2 lg:basis-1/3">
            <RecipeCard {...recipe} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        variant="default"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
      />

      <CarouselNext
        variant="default"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    </Carousel>
  );
};

export default RecipeCarousel;
