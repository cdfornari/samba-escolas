import { Injectable } from '@nestjs/common';
import { CreateLugareInput } from './dto/create-lugare.input';
import { UpdateLugareInput } from './dto/update-lugare.input';

@Injectable()
export class LugaresService {
  create(createLugareInput: CreateLugareInput) {
    return 'This action adds a new lugare';
  }

  findAll() {
    return `This action returns all lugares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lugare`;
  }

  update(id: number, updateLugareInput: UpdateLugareInput) {
    return `This action updates a #${id} lugare`;
  }

  remove(id: number) {
    return `This action removes a #${id} lugare`;
  }
}
