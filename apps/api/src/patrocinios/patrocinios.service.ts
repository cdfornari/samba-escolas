import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatrocinioInput } from './dto/create-patrocinio.input';
import { UpdatePatrocinioInput } from './dto/update-patrocinio.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Patrocinio } from './entities/patrocinio.entity';
import { PatrocinioFilterArgs } from './types/patrocinio-filter.args';
import { PatrocinioIdArgs } from './types/patrocinio-id.args';

@Injectable()
export class PatrociniosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'historicos_patrocinios';

  async create(input: CreatePatrocinioInput) {
    if (
      (
        await this.queryService.select<Patrocinio[]>(
          this.tableName,
          null,
          //input.id_jur? `id_escuela = ${input.id_escuela} AND fecha_fin IS NULL AND id_jur = ${input.id_jur} )`
          //: `id_escuela = ${input.id_escuela} AND fecha_fin IS NULL AND id_nat = ${input.id_nat} )`
          )
      ).length > 0
    )
      throw new BadRequestException(
        'La escuela ya tiene un patrocinio activo',
      );

    return this.crudService.create(this.tableName,input);
  }

  async findAll(
    pagination: PaginationArgs,
    filter: PatrocinioFilterArgs
    ): Promise<Patrocinio[]> {
    return this.crudService.findAll(
      this.tableName,
      pagination,
      filter
    );
  }

  async count(filter?: PatrocinioFilterArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `
      ${filter?.id_escuela ? `id_escuela = ${filter.id_escuela}` : ''}
    `,
    );
  }

  async findOne(idArg: PatrocinioIdArgs) {
    const { id, id_escuela} = idArg;
    return (
      await this.queryService.select(
        this.tableName,
        null,
        `id = '${id}' AND id_escuela = ${id_escuela} `,
      )
    )[0];
  }

  async update(input: UpdatePatrocinioInput) {
    const { id, id_escuela, ...dto } = input;
    if (
      (
        await this.queryService.select<Patrocinio[]>(
          this.tableName,
          null,
          `id_escuela = ${input.id_escuela} AND fecha_fin IS NOT NULL`,
        )
      ).length > 0
    )
      throw new BadRequestException(
        'Ya se ha cerrado este histórico',
      );
    return (
      await this.queryService.update(
        this.tableName,
        dto,
        `id = '${id}' AND id_escuela = ${id_escuela}`,
      )
    )[0][0]
  }

  remove(id: number) {
    return `This action removes a #${id} escola`;
  }
}
