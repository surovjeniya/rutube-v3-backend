import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const config = TypeOrmConfig(configService);
  return config;
};

const TypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  port: Number(configService.get('POSTGRES_PORT')),
  host: String(configService.get('POSTGRES_HOST')),
  database: configService.get('POSTGRES_DB'),
  autoLoadEntities: true,
  synchronize: true,
});
