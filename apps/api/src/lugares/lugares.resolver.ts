import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LugaresService } from './lugares.service';
import { Lugar } from './entities/lugar.entity';
import { CreateLugareInput } from './dto/create-lugare.input';
import { UpdateLugareInput } from './dto/update-lugare.input';

@Resolver(() => Lugar)
export class LugaresResolver {
  constructor(private readonly lugaresService: LugaresService) {}

  @Mutation(() => Lugar)
  createLugare(@Args('createLugareInput') createLugareInput: CreateLugareInput) {
    return this.lugaresService.create(createLugareInput);
  }

  @Query(() => [Lugar], { name: 'lugares' })
  findAll() {
    return this.lugaresService.findAll();
  }

  @Query(() => Lugar, { name: 'lugare' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.findOne(id);
  }

  @Mutation(() => Lugar)
  updateLugare(@Args('updateLugareInput') updateLugareInput: UpdateLugareInput) {
    return this.lugaresService.update(updateLugareInput.id, updateLugareInput);
  }

  @Mutation(() => Lugar)
  removeLugare(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.remove(id);
  }
}
