import { ConfigService } from '@nestjs/config';

export interface EnvConfig {
  apiBaseUrl: string;
}

export const getEnvConfig = (configService: ConfigService): EnvConfig => ({
  apiBaseUrl: configService.get<string>('API_BASE_URL', 'https://www.themealdb.com/api/json/v1/1'),
});
