import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EscolasService } from './escolas.service';
import { Escola } from './entities/escola.entity';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';
import { EscolasPaginationType } from './types/escolas-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { Lugar } from 'src/lugares/entities/lugar.entity';
import { LugaresService } from '../lugares/lugares.service';

@Resolver(() => Escola)
export class EscolasResolver {
  constructor(
    private readonly escolasService: EscolasService,
    private readonly lugaresService: LugaresService,
  ) {}

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
      numberOfPages: getNumberOfPages(pagination, count),
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

  @ResolveField(() => Lugar, { name: 'ciudad' })
  async getCity(@Parent() escola: Escola): Promise<Lugar> {
    return this.lugaresService.findOne(escola.id_ciudad);
  }
}
