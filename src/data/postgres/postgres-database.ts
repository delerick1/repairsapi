import { DataSource } from 'typeorm';
import { Repairs } from './models/repairs.model';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { RefreshToken } from './models/refresh-token.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'repairs_db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [Repairs, User, Role, RefreshToken],
  migrations: ['src/data/postgres/migrations/*.ts'],
  subscribers: ['src/data/postgres/subscribers/*.ts'],
});