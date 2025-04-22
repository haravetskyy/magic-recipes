import { RecipeFilter } from '@/recipes/dto/recipe.dto';
import { buildQueryParams } from '@/utils/query.utils';
import { transformRecipe } from '@/utils/recipe.utils';
import { HttpService } from '@nestjs/axios';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const fetchRecipesForIngredient = (
  httpService: HttpService,
  baseUrl: string,
  ingredient: string,
  area?: string,
  category?: string,
) => {
  const filters: RecipeFilter = {
    ingredient,
    ...(area && { area }),
    ...(category && { category }),
  };

  const queryParams = buildQueryParams(filters);
  const url = `${baseUrl}?${queryParams.join('&')}`;

  return httpService.get(url).pipe(
    map(response => {
      const recipes = response.data.meals || [];
      return recipes.map(transformRecipe);
    }),
  );
};

export const buildRecipeQuery = (
  filters: RecipeFilter,
  httpService: HttpService,
  baseUrl: string,
) => {
  if (!filters.ingredient) {
    const queryParams = buildQueryParams(filters);
    const url = queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;

    return httpService.get(url).pipe(
      map(response => {
        const recipes = response.data.meals || [];
        return recipes.map(transformRecipe);
      }),
    );
  }

  const ingredients = filters.ingredient
    .split(',')
    .map(ing => ing.trim())
    .filter(ing => ing);

  if (ingredients.length === 1) {
    return fetchRecipesForIngredient(
      httpService,
      baseUrl,
      ingredients[0],
      filters.area,
      filters.category,
    );
  }

  const recipeObservables = ingredients.map(ingredient =>
    fetchRecipesForIngredient(httpService, baseUrl, ingredient, filters.area, filters.category),
  );

  return forkJoin(recipeObservables).pipe(
    map(results => {
      if (results.length === 0) return [];

      const recipeMaps = results.map(
        recipes => new Map(recipes.map(recipe => [recipe.id, recipe])),
      );

      const firstRecipeIds = new Set(recipeMaps[0].keys());
      const commonRecipeIds = [...firstRecipeIds].filter(id =>
        recipeMaps.every(map => map.has(id)),
      );

      return commonRecipeIds.map(id => recipeMaps[0].get(id)!);
    }),
  );
};
