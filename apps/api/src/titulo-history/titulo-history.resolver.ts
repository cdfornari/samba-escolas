import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TituloHistoryService } from './titulo-history.service';
import { TituloHistory } from './entities/titulo-history.entity';
import { CreateTituloHistoryInput } from './dto/create-titulo-history.input';
import { UpdateTituloHistoryInput } from './dto/update-titulo-history.input';
import { TituloHistoryIdArgs } from './types/titulo-history-id.args';
import { Escola } from 'src/escolas/entities/escola.entity';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { TituloHistoryFilterArgs } from './types/titulo-history-filter.args';
import { TituloHistoryPaginationType } from './types/titulo-history-pagination.type';

@Resolver(() => TituloHistory)
export class TituloHistoryResolver {
  constructor(private readonly tituloHistoryService: TituloHistoryService) {}

  @Mutation(() => TituloHistory)
  createTituloHistory(
    @Args('createTituloHistoryInput')
    createTituloHistoryInput: CreateTituloHistoryInput,
  ) {
    return this.tituloHistoryService.create(createTituloHistoryInput);
  }

  @Query(() => [TituloHistory], { name: 'tituloHistory' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter: TituloHistoryFilterArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ): Promise<TituloHistoryPaginationType> {
    const [items, count] = await Promise.all([
      this.tituloHistoryService.findAll(
        filter,
        paginate ? pagination : null,
      ) as Promise<any>,
      this.tituloHistoryService.count(filter),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => TituloHistoryIdArgs, { name: 'tituloHistoryIdArgs' })
  findOne(
    @Args('titulo', { type: () => TituloHistoryIdArgs })
    tituloHistoryIdArgs: TituloHistoryIdArgs,
  ) {
    return this.tituloHistoryService.findOne(tituloHistoryIdArgs);
  }

  @Mutation(() => TituloHistory)
  updateTituloHistory(
    @Args('updateTituloHistoryInput')
    updateTituloHistoryInput: UpdateTituloHistoryInput,
  ) {
    return this.tituloHistoryService.update(updateTituloHistoryInput);
  }

  @Mutation(() => TituloHistory)
  removeTituloHistory(@Args('id', { type: () => Int }) id: number) {
    return this.tituloHistoryService.remove(id);
  }

  @ResolveField(() => Escola, { name: 'escola' })
  getEscola(@Parent() historico: TituloHistory) {
    return this.tituloHistoryService.findEscola(historico.id_escuela);
  }
}
