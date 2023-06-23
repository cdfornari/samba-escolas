import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IntegrantesService } from './integrantes.service';
import { Integrante } from './entities/integrante.entity';
import { CreateIntegranteInput } from './dto/create-integrante.input';
import { UpdateIntegranteInput } from './dto/update-integrante.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { IntegrantesPaginationType } from './types/integrantes-pagination.type';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';

@Resolver(() => Integrante)
export class IntegrantesResolver {
  constructor(private readonly integrantesService: IntegrantesService) {}

  @Mutation(() => Integrante)
  createIntegrante(
    @Args('createIntegranteInput') createIntegranteInput: CreateIntegranteInput,
  ) {
    return this.integrantesService.create(createIntegranteInput);
  }

  @Query(() => IntegrantesPaginationType, { name: 'integrantes' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.integrantesService.findAll(pagination),
      this.integrantesService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Integrante, { name: 'integrante' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.integrantesService.findOne(id);
  }

  @Mutation(() => Integrante)
  updateIntegrante(
    @Args('updateIntegranteInput') updateIntegranteInput: UpdateIntegranteInput,
  ) {
    return this.integrantesService.update(updateIntegranteInput);
  }

  @Mutation(() => Integrante)
  removeIntegrante(@Args('id', { type: () => Int }) id: number) {
    return this.integrantesService.remove(id);
  }
}
