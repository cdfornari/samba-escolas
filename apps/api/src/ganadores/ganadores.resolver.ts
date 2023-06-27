import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GanadoresService } from './ganadores.service';
import { Ganador } from './entities/ganador.entity';
import { CreateGanadoresInput } from './dto/create-ganadores.input';
import { GanadoresFilterArgs } from './types/ganadores-filter.args';
import { Premio } from 'src/premios/entities/premio.entity';
import { PremiosService } from 'src/premios/premios.service';
import { GanadoresPaginationType } from './types/ganadores-pagination.type';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Resolver(() => Ganador)
export class GanadoresResolver {
  constructor(
    private readonly ganadoresService: GanadoresService,
    private readonly premiosService: PremiosService,
  ) {}

  @Mutation(() => Ganador)
  createGanador(
    @Args('createGanadoresInput') createGanadoresInput: CreateGanadoresInput,
  ) {
    return this.ganadoresService.create(createGanadoresInput);
  }

  @Query(() => GanadoresPaginationType, { name: 'ganadores' })
  async findAll(
    @Args() filter: GanadoresFilterArgs,
    @Args() pagination: PaginationArgs,
  ) {
    const [items, count] = await Promise.all([
      this.ganadoresService.findAll(pagination, filter),
      this.ganadoresService.count(filter),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'ganadoresCount' })
  async count(@Args() filter: GanadoresFilterArgs) {
    return this.ganadoresService.count(filter);
  }

  /*   @Query(() => Ganador, { name: 'ganador' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    //return this.ganadoresService.findOne(id);
  } */

  /*   @Mutation(() => Ganador)
  updateGanador(
    @Args('updateGanadoresInput') updateGanadoresInput: UpdateGanadoresInput,
  ) {
    return this.ganadoresService.update(updateGanadoresInput);
  } */

  @Mutation(() => Boolean)
  removeGanador(
    @Args('idPremio', { type: () => Int }) idPremio: number,
    @Args('year', { type: () => Int }) year: number,
  ) {
    return this.ganadoresService.remove(year, idPremio);
  }

  @ResolveField(() => Premio, { name: 'premio' })
  getPremio(@Parent() ganador: Ganador) {
    return this.premiosService.findOne(ganador.id_premio);
  }
}
