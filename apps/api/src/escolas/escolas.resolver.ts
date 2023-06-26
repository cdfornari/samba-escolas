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
import { Color } from 'src/colores/entities/color.entity';
import { ToggleEscolaColorInput } from './dto/toggle-escola-color.input';

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

  @Query(() => Int, { name: 'escolasCount' })
  count() {
    return this.escolasService.count();
  }

  @Mutation(() => Escola)
  updateEscola(
    @Args('updateEscolaInput') updateEscolaInput: UpdateEscolaInput,
  ) {
    return this.escolasService.update(updateEscolaInput);
  }

  @Mutation(() => Escola)
  removeEscola(@Args('id', { type: () => Int }) id: number) {
    return this.escolasService.remove(id);
  }

  @Mutation(() => Boolean)
  async addColorToEscola(
    @Args('toggleEscolaColorInput')
    { id_color, id_escuela }: ToggleEscolaColorInput,
  ) {
    try {
      this.escolasService.addColor(id_escuela, id_color);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async removeColorFromEscola(
    @Args('toggleEscolaColorInput')
    { id_color, id_escuela }: ToggleEscolaColorInput,
  ) {
    try {
      this.escolasService.removeColor(id_escuela, id_color);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField(() => Lugar, { name: 'ciudad' })
  async getCity(@Parent() escola: Escola): Promise<Lugar> {
    return this.lugaresService.findOne(escola.id_ciudad);
  }

  @ResolveField(() => [Color], { name: 'colores' })
  async getColors(@Parent() escola: Escola): Promise<Color[]> {
    return this.escolasService.getColors(escola.id);
  }
}
