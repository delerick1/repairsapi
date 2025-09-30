import { DataSource } from 'typeorm';
import { Repairs } from './models/repairs.model';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { RefreshToken } from './models/refresh-token.model';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'repairs.db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [Repairs, User, Role, RefreshToken],
  migrations: ['src/data/postgres/migrations/*.ts'],
  subscribers: ['src/data/postgres/subscribers/*.ts'],
});