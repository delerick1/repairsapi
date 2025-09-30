import { Request, Response } from 'express';
import { RepairsService } from '../services/repairs.service';
import { CreateRepairsDto, CustomError, UpdateRepairsDto } from '../../domain';

export class RepairsController {

  constructor(
    public readonly repairsService: RepairsService
    ){}
    private handleError = (error: any, res: Response) => {
      if( error instanceof CustomError){
        return  res.status(error.statusCode).json({ message: error.message});
      } 
      console.log(error)
      return res.status(500).json({ message: 'Something went very wrong!🧨'});
    }
  createRepairs = (req: Request, res: Response): void => {
   const[error, createRepairsDto] = CreateRepairsDto.create(req.body)
   if(error) res.status(422).json({message:error})

    this.repairsService.createRepairs(createRepairsDto!)
    .then(repairs => res.status(201).json(repairs))
    .catch((error: any) => this.handleError(error, res))
  };
  getRepairs = (req: Request, res: Response): void => {
    this.repairsService.findAllRepairs()
    .then(repairs => res.status(200).json(repairs))
    .catch((error: any) => this.handleError(error, res))
  }

  getRepairsByid = (req: Request, res: Response) => {
    const {id} = req.params
    if(isNaN(+id)){
      res.status(400).json({message:'Enter a number'})
    }
    this.repairsService.findOneRepairsById(+id)
    .then(repairs => res.status(200).json(repairs))
    .catch((error: any) => this.handleError(error, res) )
  };

  updateRepairsByid = (req: Request, res: Response): void => {
    const { id } = req.params;
    const [error, updateRepairsDto] = UpdateRepairsDto.create(req.body);
  
    if(isNaN(+id)){
    res.status(400).json({message: `Enter a number`});
    }
    
    this.repairsService.updateRepairs(updateRepairsDto!,+id)
    .then(repairs => res.status(200).json(repairs))
    .catch((error: any) => res.status(500).json(error))
  };

  deleteRepairsByid = (req: Request, res: Response): void => {
    const { id } = req.params;
    if(isNaN(+id)){
     res.status(400).json( {message:'ID not a Number'});
    }   
    this.repairsService.deleteRepairs(+id)
    .then(() => res.status(204).json())
    .catch((error: any) => res.status(500).json(error))
  };
}
