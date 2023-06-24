import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HabilidadService } from './habilidades.service';
import { Habilidad } from './entities/habilidad.entity';
import { CreateHabilidadInput } from './dto/create-habilidad.input';
import { UpdateHabilidadesInput } from './dto/update-habilidad.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { HabilidadPaginationType } from './types/habilidades-pagination.type';

@Resolver(() => Habilidad)
export class SambasResolver {
  constructor(private readonly habilidadService: HabilidadService) {}

  @Mutation(() => Habilidad)
  createIntegrante(
    @Args('createHabilidadInput') createHabilidadInput: CreateHabilidadInput,
  ) {
    return this.habilidadService.create(createHabilidadInput);
  }

  @Query(() => HabilidadPaginationType, { name: 'habilidades' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.habilidadService.findAll(pagination),
      this.habilidadService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'habilidadCount' })
  count() {
    return this.habilidadService.count();
  }

  @Query(() => Habilidad, { name: 'habilidad' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.habilidadService.findOne(id);
  }

  @Mutation(() => Habilidad)
  updateIntegrante(
    @Args('updateSambaInput') updateHabilidadInput: UpdateHabilidadesInput,
  ) {
    return this.habilidadService.update(updateHabilidadInput);
  }

  @Mutation(() => Habilidad)
  removeIntegrante(@Args('id', { type: () => Int }) id: number) {
    return this.habilidadService.remove(id);
  }
}
