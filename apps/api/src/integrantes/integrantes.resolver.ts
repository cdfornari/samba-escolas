import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { IntegrantesService } from './integrantes.service';
import { Integrante } from './entities/integrante.entity';
import { CreateIntegranteInput } from './dto/create-integrante.input';
import { UpdateIntegranteInput } from './dto/update-integrante.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { IntegrantesPaginationType } from './types/integrantes-pagination.type';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { ToggleIntegranteHabilidadInput } from './dto/toggle-integrante-habilidad.input';
import { Habilidad } from 'src/habilidades/entities/habilidad.entity';

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
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ) {
    const [items, count] = await Promise.all([
      this.integrantesService.findAll(paginate ? pagination : null),
      this.integrantesService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'integrantesCount' })
  count() {
    return this.integrantesService.count();
  }

  @Query(() => Integrante, { name: 'integrante' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.integrantesService.findOne(id);
  }

  @Query(() => [Integrante], { name: 'integrantesElegibles' })
  getIntegrantesElegibles() {
    return this.integrantesService.getIntegrantesElegibles();
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

  @Mutation(() => Boolean)
  async addHabilidadToIntegrante(
    @Args('toggleIntegranteHabilidadInput')
    { id_integrante, id_habilidad }: ToggleIntegranteHabilidadInput,
  ) {
    try {
      this.integrantesService.addHabilidad(id_integrante, id_habilidad);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async removeHabilidadFromIntegrante(
    @Args('toggleIntegranteHabilidadInput')
    { id_integrante, id_habilidad }: ToggleIntegranteHabilidadInput,
  ) {
    try {
      this.integrantesService.removeHabilidad(id_integrante, id_habilidad);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField(() => [Habilidad], { name: 'habilidades' })
  async getHabilidades(@Parent() integrante: Integrante): Promise<Habilidad[]> {
    return this.integrantesService.getHabilidades(integrante.id);
  }
}
