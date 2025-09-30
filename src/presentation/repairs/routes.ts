import { Router } from 'express';
import { RepairsController } from './controller';
import { RepairsService } from '../services/repairs.service';

export class RepairsRoutes {

  static get routes(): Router {
    
    const router = Router();
    
    const repairsService = new RepairsService();
    const controller = new RepairsController(repairsService);

    // Routes
    router.get('/', controller.getRepairs);
    router.post('/', controller.createRepairs);
    router.get('/:id', controller.getRepairsByid);
    router.patch('/:id', controller.updateRepairsByid);
    router.delete('/:id', controller.deleteRepairsByid);

    return router;
  }
}
