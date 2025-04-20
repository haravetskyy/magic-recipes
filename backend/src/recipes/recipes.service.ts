import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipesService {
  constructor(private httpService: HttpService) {}

  getFullMealDetailsById(params: string) {
    return this.httpService
      .get(`${process.env.API_BASE_URL}/lookup.php?i=${params}`)
      .pipe(map(response => response.data));
  }
}
