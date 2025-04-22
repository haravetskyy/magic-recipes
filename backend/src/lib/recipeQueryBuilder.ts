import { HttpService } from '@nestjs/axios';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RecipeFilter {
  area?: string;
  ingredient?: string;
  category?: string;
}

const capitalizeFirstLetter = (sentence: string): string => {
  if (!sentence) return sentence;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
};

const fetchRecipesForIngredient = (
  httpService: HttpService,
  baseUrl: string,
  ingredient: string,
  area?: string,
  category?: string,
) => {
  const queryParams: string[] = [];
  queryParams.push(`i=${encodeURIComponent(ingredient)}`);
  if (area) {
    queryParams.push(`a=${encodeURIComponent(area)}`);
  }
  if (category) {
    queryParams.push(`c=${encodeURIComponent(category)}`);
  }

  const url = `${baseUrl}?${queryParams.join('&')}`;
  return httpService.get(url).pipe(
    map(response => {
      const recipes = response.data.meals || [];
      return recipes.map((recipe: any) => {
        const ingredients: { ingredient: string; measure: string }[] = [];
        for (let i = 1; i <= 20; i++) {
          const ing = recipe[`strIngredient${i}`];
          const measure = recipe[`strMeasure${i}`];
          if (ing && ing.trim() && measure !== null) {
            ingredients.push({ ingredient: ing, measure: measure || '' });
          } else {
            break;
          }
        }

        let instructions: string[] = [];
        if (recipe.strInstructions) {
          let rawInstructions = recipe.strInstructions
            .split('\r\n')
            .filter(
              (step: string) =>
                step.trim() && !/^step\s+\d+$/i.test(step.trim()) && !/^\d+$/.test(step.trim()),
            );

          rawInstructions = rawInstructions.map(step => {
            let inParentheses = false;
            let result = '';
            for (let i = 0; i < step.length; i++) {
              const char = step[i];
              if (char === '(') inParentheses = true;
              else if (char === ')') inParentheses = false;
              result += inParentheses && char === '.' ? ';' : char;
            }
            return result;
          });

          let splitInstructions = rawInstructions.flatMap((step: string) =>
            step
              .split('.')
              .map(s => s.trim().toLowerCase().replace(/;/g, '.'))
              .filter(s => s && !/^\d+$/.test(s)),
          );

          instructions = [];
          for (const step of splitInstructions) {
            if ((step.startsWith('(') || step.endsWith(')')) && instructions.length > 0) {
              instructions[instructions.length - 1] += ` ${step}`;
            } else {
              instructions.push(step);
            }
          }

          instructions = instructions.map(capitalizeFirstLetter);
        }

        const tags = recipe.strTags ? recipe.strTags.split(',') : null;

        return {
          id: recipe.idMeal,
          name: recipe.strMeal,
          category: recipe.strCategory,
          area: recipe.strArea,
          instructions,
          thumbnail: recipe.strMealThumb,
          tags,
          youtubeUrl: recipe.strYoutube,
          ingredients,
        };
      });
    }),
  );
};

export const buildRecipeQuery = (
  filters: RecipeFilter,
  httpService: HttpService,
  baseUrl: string,
) => {
  if (!filters.ingredient) {
    const queryParams: string[] = [];
    if (filters.area) {
      queryParams.push(`a=${encodeURIComponent(filters.area)}`);
    }
    if (filters.category) {
      queryParams.push(`c=${encodeURIComponent(filters.category)}`);
    }

    const url = queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;
    return httpService.get(url).pipe(
      map(response => {
        const recipes = response.data.meals || [];
        return recipes.map((recipe: any) => {
          const ingredients: { ingredient: string; measure: string }[] = [];
          for (let i = 1; i <= 20; i++) {
            const ing = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ing && ing.trim() && measure !== null) {
              ingredients.push({ ingredient: ing, measure: measure || '' });
            } else {
              break;
            }
          }

          let instructions: string[] = [];
          if (recipe.strInstructions) {
            let rawInstructions = recipe.strInstructions
              .split('\r\n')
              .filter(
                (step: string) =>
                  step.trim() && !/^step\s+\d+$/i.test(step.trim()) && !/^\d+$/.test(step.trim()),
              );

            rawInstructions = rawInstructions.map(step => {
              let inParentheses = false;
              let result = '';
              for (let i = 0; i < step.length; i++) {
                const char = step[i];
                if (char === '(') inParentheses = true;
                else if (char === ')') inParentheses = false;
                result += inParentheses && char === '.' ? ';' : char;
              }
              return result;
            });

            let splitInstructions = rawInstructions.flatMap((step: string) =>
              step
                .split('.')
                .map(s => s.trim().toLowerCase().replace(/;/g, '.'))
                .filter(s => s && !/^\d+$/.test(s)),
            );

            instructions = [];
            for (const step of splitInstructions) {
              if ((step.startsWith('(') || step.endsWith(')')) && instructions.length > 0) {
                instructions[instructions.length - 1] += ` ${step}`;
              } else {
                instructions.push(step);
              }
            }

            instructions = instructions.map(capitalizeFirstLetter);
          }

          const tags = recipe.strTags ? recipe.strTags.split(',') : null;

          return {
            id: recipe.idMeal,
            name: recipe.strMeal,
            category: recipe.strCategory,
            area: recipe.strArea,
            instructions,
            thumbnail: recipe.strMealThumb,
            tags,
            youtubeUrl: recipe.strYoutube,
            ingredients,
          };
        });
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
