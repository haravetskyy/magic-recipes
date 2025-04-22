import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  TransformedFilterResponse,
  TransformedRecipeInfoResponse,
  TransformedRecipesResponse,
} from './dto/recipe.dto';
import { RecipesService } from './recipes.service';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({ summary: 'Fetch a list of recipes with optional filters' })
  @ApiQuery({ name: 'ingredient', required: false, type: String })
  @ApiQuery({ name: 'area', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of recipes', type: TransformedRecipesResponse })
  @Get('getRecipes')
  async getAvaliableRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('area') area?: string,
    @Query('category') category?: string,
  ) {
    return this.recipesService.getAvaliableRecipes(ingredient, area, category);
  }

  @ApiOperation({ summary: 'Fetch details of a single recipe by ID' })
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Recipe details', type: TransformedRecipeInfoResponse })
  @Get('getRecipe')
  async getRecipeInfo(@Query('id') id: string) {
    return this.recipesService.getRecipeInfo(id);
  }

  @ApiOperation({ summary: 'Fetch filter values for a specified filter type' })
  @ApiQuery({ name: 'filter', required: true, enum: ['ingredient', 'area', 'category'] })
  @ApiResponse({ status: 200, description: 'Filter values', type: TransformedFilterResponse })
  @Get('getFilters')
  async getAllFilterValues(@Query('filter') filter: 'ingredient' | 'area' | 'category') {
    return this.recipesService.getAllFilterValues(filter);
  }
}
