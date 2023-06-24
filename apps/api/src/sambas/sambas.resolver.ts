import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SambasService } from './sambas.service';
import { Samba } from './entities/samba.entity';
import { CreateSambaInput } from './dto/create-samba.input';
import { UpdateSambaInput } from './dto/update-samba.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SambaPaginationType } from './types/sambas-pagination.type';

@Resolver(() => Samba)
export class SambasResolver {
  constructor(private readonly sambasService: SambasService) {}

  @Mutation(() => Samba)
  createIntegrante(
    @Args('createSambaInput') createSambaInput: CreateSambaInput,
  ) {
    return this.sambasService.create(createSambaInput);
  }

  @Query(() => SambaPaginationType, { name: 'sambas' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.sambasService.findAll(pagination),
      this.sambasService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'sambaCount' })
  count() {
    return this.sambasService.count();
  }

  @Query(() => Samba, { name: 'samba' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sambasService.findOne(id);
  }

  @Mutation(() => Samba)
  updateIntegrante(
    @Args('updateSambaInput') updateSambaInput: UpdateSambaInput,
  ) {
    return this.sambasService.update(updateSambaInput);
  }

  @Mutation(() => Samba)
  removeIntegrante(@Args('id', { type: () => Int }) id: number) {
    return this.sambasService.remove(id);
  }
}
