import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { OrgCarnaval } from './entities/org_carnaval.entity';
import { OrgCarnavalesService } from './org_carnavales.service';
import { OrgCarnavalesPaginationType } from './types/org_carnavales-pagination.type';
import { CreateOrgCarnavalInput } from './dto/create-org_canarval.input';
import { RolesService } from 'src/roles/roles.service';
import { HistoricoIntegrante } from 'src/escolas/integrante-history/entities/integrante-history.entity';
import { IntegranteHistoryService } from 'src/escolas/integrante-history/integrante-history.service';
import { Role } from 'src/roles/entities/role.entity';
import { OrgCarnavalFilterEscuelaArgs } from './types/org_carnavales-filter-escuela.args';


@Resolver(() => OrgCarnaval)
export class OrgCarnavalesResolver {
  constructor(private readonly orgCarnavalesService: OrgCarnavalesService,
              private readonly rolesService: RolesService,
              //private readonly integranteHistoryService: IntegranteHistoryService
    ) {}

  @Mutation(() => OrgCarnaval)
  createOrgCarnaval(
    @Args('createOrgCarnavalInput') createOrgCarnavalInput: CreateOrgCarnavalInput,
  ) {
    return this.orgCarnavalesService.create(createOrgCarnavalInput);
  }

  @Query(() => OrgCarnavalesPaginationType, { name: 'org_carnavales' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter:OrgCarnavalFilterEscuelaArgs,
  ) {
    const [items, count] = await Promise.all([
      this.orgCarnavalesService.findAll(pagination,filter),
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

  /*@ResolveField(() => HistoricoIntegrante, { name: 'historico_integrante' })
  getHistoricoIntegrante(@Parent() orgCarnaval: OrgCarnaval) {
    return this.integranteHistoryService.findOne(orgCarnaval);
  }*/

  @ResolveField(() => Role, { name: 'rol' })
  getRol(@Parent() orgCarnaval: OrgCarnaval) {
    return this.rolesService.findOne(orgCarnaval.id_rol);
  }
}