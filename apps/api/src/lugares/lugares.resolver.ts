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
import { CreateLugaresInput } from './dto/create-lugares.input';
import { UpdateLugaresInput } from './dto/update-lugares.input';
import { LugaresPaginationType } from './types/lugares-pagination.type';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { LugaresFilterArgs } from './types/lugares-filter.args';

@Resolver(() => Lugar)
export class LugaresResolver {
  constructor(private readonly lugaresService: LugaresService) {}

  @Mutation(() => Lugar)
  async createLugares(
    @Args('createLugaresInput') createLugaresInput: CreateLugaresInput,
  ) {
    return this.lugaresService.create(createLugaresInput);
  }

  @Query(() => LugaresPaginationType, { name: 'lugares' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter: LugaresFilterArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ) {
    const [items, count] = await Promise.all([
      this.lugaresService.findAll(paginate ? pagination : null, filter),
      this.lugaresService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Lugar, { name: 'lugar' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.findOne(id);
  }

  @Query(() => Int, { name: 'lugaresCount' })
  count() {
    return this.lugaresService.count();
  }

  @Mutation(() => Lugar)
  updateLugar(
    @Args('updateLugaresInput') updateLugaresInput: UpdateLugaresInput,
  ) {
    return this.lugaresService.update(updateLugaresInput);
  }

  @Mutation(() => Boolean)
  removeLugar(@Args('id', { type: () => Int }) id: number) {
    return this.lugaresService.remove(id);
  }

  @ResolveField(() => Lugar, { name: 'padre', nullable: true })
  async getParent(@Parent() lugar: Lugar) {
    return lugar.id_padre_lugar
      ? this.lugaresService.findOne(lugar.id_padre_lugar)
      : null;
  }
}
