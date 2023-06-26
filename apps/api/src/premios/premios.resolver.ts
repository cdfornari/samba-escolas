import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PremiosService } from './premios.service';
import { Premio } from './entities/premio.entity';
import { CreatePremioInput } from './dto/create-premio.input';
import { UpdatePremioInput } from './dto/update-premio.input';
import { PremiosPaginationType } from './types/premios-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';

@Resolver(() => Premio)
export class PremiosResolver {
  constructor(private readonly premiosService: PremiosService) {}

  @Mutation(() => Premio)
  createPremio(
    @Args('createPremioInput') createPremioInput: CreatePremioInput,
  ) {
    return this.premiosService.create(createPremioInput);
  }

  @Query(() => PremiosPaginationType, { name: 'premios' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ) {
    const [items, count] = await Promise.all([
      this.premiosService.findAll(paginate ? pagination : null),
      this.premiosService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Premio, { name: 'premio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.premiosService.findOne(id);
  }

  @Query(() => Int, { name: 'premiosCount' })
  count() {
    return this.premiosService.count();
  }

  @Mutation(() => Premio)
  updatePremio(
    @Args('updatePremioInput') updatePremioInput: UpdatePremioInput,
  ) {
    return this.premiosService.update(updatePremioInput);
  }

  @Mutation(() => Premio)
  removePremio(@Args('id', { type: () => Int }) id: number) {
    return this.premiosService.remove(id);
  }
}
