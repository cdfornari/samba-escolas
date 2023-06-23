import { Injectable } from '@nestjs/common';
import { CreateIntegranteInput } from './dto/create-integrante.input';
import { UpdateIntegranteInput } from './dto/update-integrante.input';
import { QueryService } from 'src/common/services/query.service';
import { Integrante } from './entities/integrante.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class IntegrantesService {
  constructor(private readonly queryService: QueryService) {}

  private tableName = 'integrantes';

  create(input: CreateIntegranteInput) {
    return 'This action adds a new integrante';
  }

  findAll(pagination: PaginationArgs) {
    return this.queryService.select<Integrante[]>(
      this.tableName,
      null,
      null,
      null,
      pagination,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} integrante`;
  }

  update(input: UpdateIntegranteInput) {}

  remove(id: number) {
    return `This action removes a #${id} integrante`;
  }
}
