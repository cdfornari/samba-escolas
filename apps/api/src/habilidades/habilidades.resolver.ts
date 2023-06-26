import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HabilidadesService } from './habilidades.service';
import { Habilidad } from './entities/habilidad.entity';
import { CreateHabilidadInput } from './dto/create-habilidad.input';
import { UpdateHabilidadesInput } from './dto/update-habilidad.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { HabilidadPaginationType } from './types/habilidades-pagination.type';

@Resolver(() => Habilidad)
export class HabilidadesResolver {
  constructor(private readonly habilidadService: HabilidadesService) {}

  @Mutation(() => Habilidad)
  createHabilidad(
    @Args('createHabilidadInput') createHabilidadInput: CreateHabilidadInput,
  ) {
    return this.habilidadService.create(createHabilidadInput);
  }

  @Query(() => HabilidadPaginationType, { name: 'habilidades' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ) {
    const [items, count] = await Promise.all([
      this.habilidadService.findAll(paginate ? pagination : null),
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
  updateHabilidad(
    @Args('updateHabilidadInput') updateHabilidadInput: UpdateHabilidadesInput,
  ) {
    return this.habilidadService.update(updateHabilidadInput);
  }

  @Mutation(() => Habilidad)
  removeHabilidad(@Args('id', { type: () => Int }) id: number) {
    return this.habilidadService.remove(id);
  }
}
