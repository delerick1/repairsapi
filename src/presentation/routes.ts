import { Router } from 'express';
//import {VideogamesRoutes} from './videogames/routes'

export class AppRoutes {
  // STATIC 
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/repairs', RepairsRoutes.routes);
    //* aca tambien iran todos los metodos que necesitamos para gestionar los repairs

    //* aca tambien iran todos los metodos que necesitamos para gestionar los los users

    //* aca tambien iran todos los metodos que necesitamos para gestionar los los purchases

    return router;
  }
}