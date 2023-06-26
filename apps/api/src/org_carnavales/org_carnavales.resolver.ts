import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { OrgCarnaval } from './entities/org_carnaval.entity';
import { OrgCarnavalesService } from './org_carnavales.service';
import { OrgCarnavalesPaginationType } from './types/org_carnavales-pagination.type';
import { CreateOrgCarnavalInput } from './dto/create-org_canarval.input';
import { RolesService } from 'src/roles/roles.service';
import { IntegranteHistoryService } from 'src/escolas/integrante-history/integrante-history.service';
import { Role } from 'src/roles/entities/role.entity';
import { OrgCarnavalFilterEscuelaArgs } from './types/org_carnavales-filter-escuela.args';
import { Integrante } from 'src/integrantes/entities/integrante.entity';
import { IntegrantesService } from 'src/integrantes/integrantes.service';


@Resolver(() => OrgCarnaval)
export class OrgCarnavalesResolver {
  constructor(private readonly orgCarnavalesService: OrgCarnavalesService,
              private readonly rolesService: RolesService,
              private readonly integranteService: IntegrantesService
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
    @Args('filter') filter:OrgCarnavalFilterEscuelaArgs,
  ) : Promise<OrgCarnavalesPaginationType>{
    const [items, count] = await Promise.all([
      this.orgCarnavalesService.findAll(pagination,filter)as Promise<any>,
      this.orgCarnavalesService.count(filter),
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
  count(@Args() filter: OrgCarnavalFilterEscuelaArgs) {
    return this.orgCarnavalesService.count(filter);
  }

  @Mutation(() => Boolean)
  removeOrgCarnaval(@Args('id', { type: () => Int }) id: number) {
    return this.orgCarnavalesService.remove(id);
  }

  @ResolveField(() => Integrante, { name: 'historico_integrante' })
  getIntegrante(@Parent() orgCarnaval: OrgCarnaval) {
    return this.integranteService.findOne(orgCarnaval.id_integrante);
  }

  @ResolveField(() => Role, { name: 'rol' })
  getRol(@Parent() orgCarnaval: OrgCarnaval) {
    return this.rolesService.findOne(orgCarnaval.id_rol);
  }
}