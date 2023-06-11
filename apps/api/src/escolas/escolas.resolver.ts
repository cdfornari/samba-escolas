import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EscolasService } from './escolas.service';
import { Escola } from './entities/escola.entity';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';
import { EscolasPaginationType } from './types/escolas-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getPaginatioInfo } from 'src/common/pagination/getPaginationInfo';

@Resolver(() => Escola)
export class EscolasResolver {
  constructor(private readonly escolasService: EscolasService) {}

  @Mutation(() => Escola)
  createEscola(
    @Args('createEscolaInput') createEscolaInput: CreateEscolaInput,
  ) {
    return this.escolasService.create(createEscolaInput);
  }

  @Query(() => EscolasPaginationType, { name: 'escolas' })
  async findAll(
    @Args() pagination: PaginationArgs,
  ): Promise<EscolasPaginationType> {
    const [items, count] = await Promise.all([
      this.escolasService.findAll(pagination),
      this.escolasService.count(),
    ]);
    return {
      items,
      paginationInfo: getPaginatioInfo(pagination, count),
    };
  }

  @Query(() => Escola, { name: 'escola' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.escolasService.findOne(id);
  }

  @Mutation(() => Escola)
  updateEscola(
    @Args('updateEscolaInput') updateEscolaInput: UpdateEscolaInput,
  ) {
    return this.escolasService.update(updateEscolaInput.id, updateEscolaInput);
  }

  @Mutation(() => Escola)
  removeEscola(@Args('id', { type: () => Int }) id: number) {
    return this.escolasService.remove(id);
  }
}
