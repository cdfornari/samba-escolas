import {
  Args,
  Mutation,
  Resolver,
  Query,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { HistoricoIntegrante } from './entities/integrante-history.entity';
import { CreateHistoricoIntegranteInput } from './dto/create-integrante-history.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { IntegranteHistoryPaginationType } from './types/integrante-history-pagination.type';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { IntegranteHistoryService } from './integrante-history.service';
import { UpdateHistoricoIntegranteInput } from './dto/update-integrante-history.input';
import { HistoricoIntegranteFilterArgs } from './types/integrante-history-filter.args';
import { HistoricoIntegranteIdArgs } from './types/integrante-history-id.args';
import { Integrante } from 'src/integrantes/entities/integrante.entity';
import { IntegrantesService } from 'src/integrantes/integrantes.service';

@Resolver(() => HistoricoIntegrante)
export class IntegranteHistoryResolver {
  constructor(
    private readonly integranteHistoryService: IntegranteHistoryService,
    private readonly integranteService: IntegrantesService,
  ) {}

  @Mutation(() => HistoricoIntegrante)
  createIntegranteHistory(
    @Args('createHistoricoIntegranteInput')
    createHistoricoIntegranteInput: CreateHistoricoIntegranteInput,
  ) {
    return this.integranteHistoryService.create(createHistoricoIntegranteInput);
  }

  @Query(() => IntegranteHistoryPaginationType, { name: 'integranteHistories' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter: HistoricoIntegranteFilterArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ): Promise<IntegranteHistoryPaginationType> {
    const [items, count] = await Promise.all([
      this.integranteHistoryService.findAll(
        filter,
        paginate ? pagination : null,
      ) as Promise<any>,
      this.integranteHistoryService.count(filter),
    ]);
    return {
      items: items.map((item) => ({
        ...item,
        autoridad: (item.autoridad as string) === 'si',
      })),
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => HistoricoIntegrante, { name: 'integranteHistory' })
  async findOne(@Args() id: HistoricoIntegranteIdArgs) {
    const result = await this.integranteHistoryService.findOne(id);
    return {
      ...result,
      autoridad: result.autoridad === 'si',
    };
  }

  @Query(() => Int, { name: 'integranteHistoriesCount' })
  count(@Args() filter: HistoricoIntegranteFilterArgs) {
    return this.integranteHistoryService.count(filter);
  }

  @Mutation(() => HistoricoIntegrante)
  updateIntegranteHistory(
    @Args('updateHistoricoIntegranteInput')
    updateIntegranteHistoryInput: UpdateHistoricoIntegranteInput,
  ) {
    return this.integranteHistoryService.update(updateIntegranteHistoryInput);
  }

  @Mutation(() => Boolean)
  removeIntegranteHistory(@Args() id: HistoricoIntegranteIdArgs) {
    return this.integranteHistoryService.remove(id);
  }

  @ResolveField(() => Integrante, { name: 'integrante' })
  getIntegrante(@Parent() historico: HistoricoIntegrante) {
    return this.integranteService.findOne(historico.id_integrante);
  }
}
