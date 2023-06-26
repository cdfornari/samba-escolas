import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { OrgCarnaval } from './entities/org_carnaval.entity';
import { OrgCarnavalesService } from './org_carnavales.service';
import { OrgCarnavalesPaginationType } from './types/org_carnavales-pagination.type';
import { CreateOrgCarnavalInput } from './dto/create-org_canarval.input';


@Resolver(() => OrgCarnaval)
export class OrgCarnavalesResolver {
  constructor(private readonly orgCarnavalesService: OrgCarnavalesService) {}

  @Mutation(() => OrgCarnaval)
  createOrgCarnaval(
    @Args('createOrgCarnavalInput') createOrgCarnavalInput: CreateOrgCarnavalInput,
  ) {
    return this.orgCarnavalesService.create(createOrgCarnavalInput);
  }

  @Query(() => OrgCarnavalesPaginationType, { name: 'org_carnavales' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ) {
    const [items, count] = await Promise.all([
      this.orgCarnavalesService.findAll(paginate ? pagination : null),
      this.orgCarnavalesService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => OrgCarnaval, { name: 'org_carnaval' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orgCarnavalesService.findOne(id);
  }

  @Query(() => Int, { name: 'org_carnavalesCount' })
  count() {
    return this.orgCarnavalesService.count();
  }

  @Mutation(() => Boolean)
  removeOrgCarnaval(@Args('id', { type: () => Int }) id: number) {
    return this.orgCarnavalesService.remove(id);
  }
}