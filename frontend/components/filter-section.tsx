import { FilterResponse, FilterValue } from '@/types/recipe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';

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

let areaFilters: FilterValue[] = [];
let categoryFilters: FilterValue[] = [];

try {
  [areaFilters, categoryFilters] = await Promise.all([
    fetchFilterValues('area'),
    fetchFilterValues('category'),
  ]);
} catch (error) {
  console.error('Error fetching filters:', error);
  areaFilters = [];
  categoryFilters = [];
}

const FilterSection = async () => {
  return (
    <section className="flex flex-col gap-4 md:p-4 items-center w-full">
      <h2 className="font-semibold text-4xl">What to cook?</h2>

      <Accordion type="multiple" className="w-full" defaultValue={['areas', 'categories']}>
        <AccordionItem value="areas">
          <AccordionTrigger className="w-full">Filter by area</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap gap-2">
            {areaFilters.map(area => (
              <Badge variant="outline" key={area.id}>
                {area.name}
              </Badge>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
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
    </section>
  );
};

export default FilterSection;
