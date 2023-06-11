import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LugaresService } from './lugares.service';
import { Lugare } from './entities/lugare.entity';
import { CreateLugareInput } from './dto/create-lugare.input';
import { UpdateLugareInput } from './dto/update-lugare.input';

@Resolver(() => Lugare)
export class LugaresResolver {
  constructor(private readonly lugaresService: LugaresService) {}

  @Mutation(() => Lugare)
  createLugare(@Args('createLugareInput') createLugareInput: CreateLugareInput) {
    return this.lugaresService.create(createLugareInput);
  }

  @Query(() => [Lugare], { name: 'lugares' })
  findAll() {
    return this.lugaresService.findAll();
  }

  @Query(() => Lugare, { name: 'lugare' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.findOne(id);
  }

  @Mutation(() => Lugare)
  updateLugare(@Args('updateLugareInput') updateLugareInput: UpdateLugareInput) {
    return this.lugaresService.update(updateLugareInput.id, updateLugareInput);
  }

  @Mutation(() => Lugare)
  removeLugare(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.remove(id);
  }
}
