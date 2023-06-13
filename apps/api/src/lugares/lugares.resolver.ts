import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LugaresService } from './lugares.service';
import { Lugar } from './entities/lugar.entity';
import { CreateLugareInput } from './dto/create-lugare.input';
import { UpdateLugareInput } from './dto/update-lugare.input';
import { LugaresPaginationType } from './types/lugares-pagination.type';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Resolver(() => Lugar)
export class LugaresResolver {
  constructor(private readonly lugaresService: LugaresService) {}

  @Mutation(() => Lugar)
  createLugare(
    @Args('createLugareInput') createLugareInput: CreateLugareInput,
  ) {
    return this.lugaresService.create(createLugareInput);
  }

  @Query(() => LugaresPaginationType, { name: 'lugares' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.lugaresService.findAll(pagination),
      this.lugaresService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Lugar, { name: 'lugare' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.findOne(id);
  }

  @Mutation(() => Lugar)
  updateLugare(
    @Args('updateLugareInput') updateLugareInput: UpdateLugareInput,
  ) {
    return this.lugaresService.update(updateLugareInput.id, updateLugareInput);
  }

  @Mutation(() => Lugar)
  removeLugare(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.remove(id);
  }

  @ResolveField(() => Lugar, { name: 'padre', nullable: true })
  async getParent(@Parent() lugar: Lugar) {
    return lugar.id_padre_lugar
      ? this.lugaresService.findOne(lugar.id_padre_lugar)
      : null;
  }
}
