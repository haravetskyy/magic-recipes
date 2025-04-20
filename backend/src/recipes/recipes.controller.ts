import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('getRecipes')
  async getAvaliableRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('area') area?: string,
    @Query('category') category?: string,
  ) {
    return this.recipesService.getAvaliableRecipes(ingredient, area, category);
  }

  @Get('getRecipe')
  async getRecipeInfo(@Query('id') id: string) {
    return this.recipesService.getRecipeInfo(id);
  }

  @Get('getFilters')
  async getAllFilterValues(@Query('filter') filter: 'ingredient' | 'area' | 'category') {
    return this.recipesService.getAllFilterValues(filter);
  }
}
