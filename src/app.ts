import 'reflect-metadata';
import { AppDataSource } from './data';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';

async function main() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    // Start server
    const server = new Server({
      port: 3000,
      routes: AppRoutes.routes
    });

    await server.start();
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
}

main();