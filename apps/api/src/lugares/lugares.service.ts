import { Injectable } from '@nestjs/common';
import { CreateLugareInput } from './dto/create-lugare.input';
import { UpdateLugareInput } from './dto/update-lugare.input';
import { QueryService } from 'src/common/services/query.service';
import { Lugar } from './entities/lugar.entity';

@Injectable()
export class LugaresService {
  constructor(private readonly queryService: QueryService) {}

  create(createLugareInput: CreateLugareInput) {
    return 'This action adds a new lugare';
  }

  findAll() {
    return `This action returns all lugares`;
  }

  async findOne(id: number): Promise<Lugar> {
    return (await this.queryService.select(
      'lugares_geo',
      null,
      `id = ${id}`
    ))[0]
  }

  update(id: number, updateLugareInput: UpdateLugareInput) {
    return `This action updates a #${id} lugare`;
  }

  remove(id: number) {
    return `This action removes a #${id} lugare`;
  }
}
