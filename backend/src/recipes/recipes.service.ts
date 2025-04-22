import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { getEnvConfig } from '../config/environment';
import { buildRecipeQuery, RecipeFilter } from '../lib/recipeQueryBuilder';
import {
  FilterValue,
  TransformedFilterResponse,
  TransformedRecipe,
  TransformedRecipeInfoResponse,
  TransformedRecipesResponse,
} from './dto/transformed-recipe.dto';

const capitalizeFirstLetter = (sentence: string): string => {
  if (!sentence) return sentence;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
};

const transformRecipe = (recipe: any): TransformedRecipe => {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() && measure !== null) {
      ingredients.push({ ingredient, measure: measure || '' });
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
};

@Injectable()
export class RecipesService {
  private readonly apiBaseUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    const config = getEnvConfig(configService);
    this.apiBaseUrl = config.apiBaseUrl;
  }

  private transformFilterResponse(
    filter: 'ingredient' | 'area' | 'category',
    response: any,
  ): TransformedFilterResponse {
    const recipes = response.meals || [];
    let values: string[] = [];

    if (filter === 'ingredient') {
      values = recipes
        .map((item: any) => item.strIngredient)
        .filter((value: string) => value && value.trim());
    } else if (filter === 'area') {
      values = recipes
        .map((item: any) => item.strArea)
        .filter((value: string) => value && value.trim());
    } else if (filter === 'category') {
      values = recipes
        .map((item: any) => item.strCategory)
        .filter((value: string) => value && value.trim());
    }

    const transformedValues: FilterValue[] = values.map((name: string) => ({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
    }));

    return { values: transformedValues };
  }

  getAvaliableRecipes(ingredient?: string, area?: string, category?: string) {
    if (!ingredient && !area && !category) {
      return this.getAllRecipes();
    }

    const filters: RecipeFilter = {
      ...(ingredient && { ingredient }),
      ...(area && { area }),
      ...(category && { category }),
    };

    return buildRecipeQuery(filters, this.httpService, `${this.apiBaseUrl}/filter.php`).pipe(
      map(recipes => ({ recipes }) as TransformedRecipesResponse),
    );
  }

  getRecipeInfo(id?: string) {
    return this.httpService.get(`${this.apiBaseUrl}/lookup.php?i=${id}`).pipe(
      map(response => {
        const recipe =
          response.data.meals && response.data.meals[0]
            ? transformRecipe(response.data.meals[0])
            : null;
        return { recipe } as TransformedRecipeInfoResponse;
      }),
    );
  }

  getAllFilterValues(filter: 'ingredient' | 'area' | 'category') {
    const filterQuery = filter.charAt(0);
    return this.httpService
      .get(`${this.apiBaseUrl}/list.php?${filterQuery}=list`)
      .pipe(map(response => this.transformFilterResponse(filter, response.data)));
  }

  getAllRecipes() {
    const searchUrl = `${this.apiBaseUrl}/search.php?s=`;
    return this.httpService.get(searchUrl).pipe(
      map(response => {
        const recipes = response.data.meals || [];
        const transformedRecipes = recipes.map(transformRecipe);
        return { recipes: transformedRecipes } as TransformedRecipesResponse;
      }),
    );
  }
}
