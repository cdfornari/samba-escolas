import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IntegrantesService } from './integrantes.service';
import { Integrante } from './entities/integrante.entity';
import { CreateIntegranteInput } from './dto/create-integrante.input';
import { UpdateIntegranteInput } from './dto/update-integrante.input';

@Resolver(() => Integrante)
export class IntegrantesResolver {
  constructor(private readonly integrantesService: IntegrantesService) {}

  @Mutation(() => Integrante)
  createIntegrante(
    @Args('createIntegranteInput') createIntegranteInput: CreateIntegranteInput,
  ) {
    return this.integrantesService.create(createIntegranteInput);
  }

  @Query(() => [Integrante], { name: 'integrantes' })
  findAll() {
    return this.integrantesService.findAll();
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
