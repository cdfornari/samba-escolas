import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NaturalesService } from './naturales.service';
import { Naturales } from './entities/naturales.entity';
import { CreateNaturalesInput} from './dto/create-naturales.input';
import { UpdateNaturalesInput } from './dto/update-naturales.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { NaturalesPaginationType } from './types/naturales-pagination.type';

@Resolver(() => Naturales)
export class NaturalesResolver {
  constructor(private readonly naturalesService: NaturalesService) {}

  @Mutation(() => Naturales)
  createNatural(
    @Args('createNaturalesInput') createNaturalesInput: CreateNaturalesInput,
  ) {
    return this.naturalesService.create(createNaturalesInput);
  }

  @Query(() => NaturalesPaginationType, { name: 'naturales' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.naturalesService.findAll(pagination),
      this.naturalesService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'naturalesCount' })
  count() {
    return this.naturalesService.count();
  }

  @Query(() => Naturales, { name: 'natural' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.naturalesService.findOne(id);
  }

  @Mutation(() => Naturales)
  updateNatural(
    @Args('updateNaturalesInput') updateNaturalesInput: UpdateNaturalesInput,
  ) {
    return this.naturalesService.update(updateNaturalesInput);
  }

  @Mutation(() => Naturales)
  removeNatural(@Args('id', { type: () => Int }) id: number) {
    return this.naturalesService.remove(id);
  }
}
