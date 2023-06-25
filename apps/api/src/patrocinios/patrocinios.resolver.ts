import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PatrociniosService } from './patrocinios.service';
import { Patrocinio } from './entities/patrocinio.entity';
import { CreatePatrocinioInput } from './dto/create-patrocinio.input';
import { UpdatePatrocinioInput } from './dto/update-patrocinio.input';
import { PatrocinioPaginationType } from './types/patrocinio-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { Lugar } from 'src/lugares/entities/lugar.entity';
import { LugaresService } from '../lugares/lugares.service';
import { PatrocinioFilterArgs } from './types/patrocinio-filter.args';
import { PatrocinioIdArgs } from './types/patrocinio-id.args';

@Resolver(() => Patrocinio)
export class PatrociniosResolver {
  constructor(
    private readonly patrociniosService: PatrociniosService,
    private readonly lugaresService: LugaresService,
  ) {}

  @Mutation(() => Patrocinio)
  createPatrocinio(
    @Args('createPatrocinioInput') createPatrocinioInput: CreatePatrocinioInput,
  ) {
    return this.patrociniosService.create(createPatrocinioInput);
  }

  @Query(() => PatrocinioPaginationType, { name: 'patrocinios' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter:PatrocinioFilterArgs,
  ): Promise<PatrocinioPaginationType> {
    const [items, count] = await Promise.all([
      this.patrociniosService.findAll(pagination,filter),
      this.patrociniosService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Patrocinio, { name: 'patrocinio' })
  findOne(@Args() id: PatrocinioIdArgs) {
    return this.patrociniosService.findOne(id);
  }

  @Query(() => Int, { name: 'patrociniosCount' })
  count(@Args() filter: PatrocinioFilterArgs) {
    return this.patrociniosService.count(filter);
  }

  @Mutation(() => Patrocinio)
  updatePatrocinio(
    @Args('updatePatricinioInput') updateEscolaInput: UpdatePatrocinioInput,
  ) {
    return this.patrociniosService.update(updateEscolaInput);
  }

  @Mutation(() => Patrocinio)
  removePatrocinio(@Args() idArgs: PatrocinioIdArgs) {
    const {id} = idArgs
    return this.patrociniosService.remove(id);
  }
}
