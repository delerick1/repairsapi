import { Repairs } from '../../data';
import { CreateRepairsDto, CustomError, UpdateRepairsDto} from '../../domain';
enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export class RepairsService {
  constructor() { }
// todo-tree
  /*
 TODO ANY  Change type of data entry to any
  */
  async createRepairs(repairsData: CreateRepairsDto) {
    const repairs = new Repairs();

    repairs.title = repairsData.name.toLowerCase().trim();
    repairs.description = repairsData.description.toLowerCase().trim();
    repairs.price = repairsData.price;
    try {
      return await repairs.save();
    } catch (error: any) {
      throw CustomError.InternalServer("🧨🧨Somenthing went very wrong 🧨🧨 ")
    }
  }
  async findAllRepairs() {
    try {
      return await Repairs.find();

    } catch (error: any) {
      console.log(error)
      throw CustomError.InternalServer("🧨🧨Somenthing went very wrong 🧨🧨 ")
    }
  }
  async findOneRepairsById(id: number) {
      const repairs = await Repairs.findOne({
        where: {
          id: id,
          status: Status.ACTIVE,
        }
      });
      if (!repairs) {
        throw CustomError.notFound(`repairs with id ${id} not found`)
      }
      return repairs;
  }
  async updateRepairs(repairsData: UpdateRepairsDto, id: number) {
    const repairs = await this.findOneRepairsById(id);
    repairs.title = repairsData.name.toLowerCase().trim();
    repairs.price = repairsData.price;
    try {
      return await repairs.save()
    } catch (error) {
      console.log(error)
      throw CustomError.InternalServer("🧨🧨Somenthing went very wrong 🧨🧨 ")   
     }
  }
  async deleteVideogame(id: number) {
    const repairs = await this.findOneRepairsById(id)
    repairs.status = Status.INACTIVE //soft delete
    // repairs.remove() delete permanate
    try {
      await repairs.save()
      return;
    } catch (error) {
      throw CustomError.InternalServer("🧨🧨Somenthing went very wrong 🧨🧨 ")
    }
  }
}
