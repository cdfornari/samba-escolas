import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { RolesPaginationType } from './types/roles-pagination.type';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => RolesPaginationType, { name: 'roles' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.rolesService.findAll(pagination),
      this.rolesService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'rolesCount' })
  count() {
    return this.rolesService.count();
  }

  @Query(() => Role, { name: 'rol' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }
}
