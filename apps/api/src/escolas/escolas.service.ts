import { Injectable } from '@nestjs/common';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';

@Injectable()
export class EscolasService {
  create(createEscolaInput: CreateEscolaInput) {
    return 'This action adds a new escola';
  }

  findAll() {
    return `This action returns all escolas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} escola`;
  }

  update(id: number, updateEscolaInput: UpdateEscolaInput) {
    return `This action updates a #${id} escola`;
  }

  remove(id: number) {
    return `This action removes a #${id} escola`;
  }
}
