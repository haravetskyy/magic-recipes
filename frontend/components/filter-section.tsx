import { FilterResponse, FilterValue } from '@/types/recipe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';

const filterSectionContent = {
  mainHeading: 'What to cook?',
};

async function fetchFilterValues(
  filterType: 'ingredient' | 'area' | 'category',
): Promise<FilterValue[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/getFilters?filter=${filterType}`,
    { cache: 'no-store' },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${filterType} filters`);
  }

  const data: FilterResponse = await response.json();
  return data.values || [];
}

let ingredientFilters: FilterValue[] = [];
let areaFilters: FilterValue[] = [];
let categoryFilters: FilterValue[] = [];

try {
  [ingredientFilters, areaFilters, categoryFilters] = await Promise.all([
    fetchFilterValues('ingredient'),
    fetchFilterValues('area'),
    fetchFilterValues('category'),
  ]);
} catch (error) {
  console.error('Error fetching filters:', error);
  ingredientFilters = [];
  areaFilters = [];
  categoryFilters = [];
}

const FilterSection = async () => {
  return (
    <section className="flex flex-col gap-4 md:px-4 items-center">
      <h2 className="font-semibold text-4xl">{filterSectionContent.mainHeading}</h2>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full">Filter by area</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap gap-2">
            {areaFilters.map(area => (
              <Badge variant="outline" key={area.id}>
                {area.name}
              </Badge>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full">Filter by category</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap gap-2">
            {categoryFilters.map(category => (
              <Badge variant="outline" key={category.id}>
                {category.name}
              </Badge>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full">Filter by ingredient</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap gap-2">
            {ingredientFilters.map(ingredient => (
              <Badge variant="outline" key={ingredient.id}>
                {ingredient.name}
              </Badge>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FilterSection;
