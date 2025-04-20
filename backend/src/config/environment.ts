import { ConfigService } from '@nestjs/config';

export const getEnvConfig = (configService: ConfigService) => ({
  apiBaseUrl: configService.get<string>('API_BASE_URL', 'https://www.themealdb.com/api/json/v1/1'),
});
