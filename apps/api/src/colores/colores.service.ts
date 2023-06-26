import { BadRequestException, Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { Color } from './entities/color.entity';
import { CreateColorInput } from './dto/create-color.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { UpdateColorInput } from './dto/update-color.input';

@Injectable()
export class ColoresService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'colores';

  async create(input: CreateColorInput): Promise<Color> {
    return this.crudService.create(this.tableName, input);
  }

  async findAll(pagination?: PaginationArgs): Promise<Color[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdateColorInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async remove(id: number) {
    const referencedRows = await this.queryService.count(
      'escuelas_colores',
      `
      color_id = ${id}
    `,
    );
    if (referencedRows > 0)
      throw new BadRequestException(
        `No se puede eliminar el color porque está referenciado en ${referencedRows} escuela${
          referencedRows > 1 ? 's' : ''
        }`,
      );
    return this.crudService.delete(this.tableName, { id });
  }
}
