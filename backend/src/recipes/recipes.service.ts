import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { buildRecipeQuery, RecipeFilter } from '../../lib/recipeQueryBuilder';

@Injectable()
export class RecipesService {
  constructor(private httpService: HttpService) {}

  getAvaliableRecipes(ingredient?: string, area?: string, category?: string) {
    if (!ingredient && !area && !category) {
      const searchUrl = `${process.env.API_BASE_URL}/search.php?s=`;
      return this.httpService.get(searchUrl).pipe(map(response => response.data));
    }

    const filters: RecipeFilter = {
      ...(ingredient && { ingredient }),
      ...(area && { area }),
      ...(category && { category }),
    };

    const queryUrl = buildRecipeQuery(filters);

    return this.httpService.get(queryUrl).pipe(map(response => response.data));
  }

  getRecipeInfo(id?: string) {
    return this.httpService
      .get(`${process.env.API_BASE_URL}/lookup.php?i=${id}`)
      .pipe(map(response => response.data));
  }

  getAllFilterValues(filter: 'ingredient' | 'area' | 'category') {
    const filterQuery = filter.charAt(0);

    return this.httpService
      .get(`${process.env.API_BASE_URL}/list.php?${filterQuery}=list`)
      .pipe(map(response => response.data));
  }
}
