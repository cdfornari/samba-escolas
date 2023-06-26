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
import { UpdateGanadoresInput } from './dto/update-ganadores.input';
import { GanadoresFilterArgs } from './types/ganadores-filter.args';
import { Premio } from 'src/premios/entities/premio.entity';
import { PremiosService } from 'src/premios/premios.service';

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

  @Query(() => [Ganador], { name: 'ganadores' })
  findAll(@Args() filter: GanadoresFilterArgs) {
    return this.ganadoresService.findAll(filter);
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

  @Mutation(() => Ganador)
  removeGanador(@Args('id', { type: () => Int }) id: number) {
    return this.ganadoresService.remove(id);
  }

  @ResolveField(() => Premio, { name: 'premio' })
  getPremio(@Parent() ganador: Ganador) {
    return this.premiosService.findOne(ganador.id_premio);
  }
}
