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
import { OrgCarnavalIdArgs } from './types/org_carnavales-id.args';


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
    @Args('id_escuela', { type: () => Int }) id_escuela: number,
  ) : Promise<OrgCarnavalesPaginationType>{
    const [items, count] = await Promise.all([
      this.orgCarnavalesService.findAll(pagination,id_escuela)as Promise<any>,
      this.orgCarnavalesService.count(id_escuela),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'org_carnavalesCount' })
  count(@Args('id_escuela', { type: () => Int }) id_escuela: number,) {
    return this.orgCarnavalesService.count(id_escuela);
  }

  @Mutation(() => Boolean)
  removeOrgCarnaval(@Args('orgCarnavalIdArgs') id: OrgCarnavalIdArgs) {
    return this.orgCarnavalesService.remove(id);
  }

  @ResolveField(() => Integrante, { name: 'integrante' })
  getIntegrante(@Parent() orgCarnaval: OrgCarnaval) {
    return this.integranteService.findOne(orgCarnaval.id_integrante);
  }

  @ResolveField(() => Role, { name: 'rol' })
  getRol(@Parent() orgCarnaval: OrgCarnaval) {
    return this.rolesService.findOne(orgCarnaval.id_rol);
  }
}