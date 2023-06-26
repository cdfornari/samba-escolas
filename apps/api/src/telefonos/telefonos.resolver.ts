import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TelefonosService } from './telefonos.service';
import { Telefono } from './entities/telefono.entity';
import { CreateTelefonoInput } from './dto/create-telefono.input';
import { UpdateTelefonoInput } from './dto/update-telefono.input';
import { TelefonoPaginationType } from './types/telefonos-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { TelefonosFilterArgs } from './types/telefonos-filter.args';
import { TelefonosIdArgs } from './types/telefonos-id.args';

@Resolver(() => Telefono)
export class TelefonosResolver {
  constructor(private readonly telefonosService: TelefonosService) {}

  @Mutation(() => Telefono)
  createTelefono(@Args('createTelefonoInput') createTelefonoInput: CreateTelefonoInput) {
    return this.telefonosService.create(createTelefonoInput);
  }

  @Query(() => TelefonoPaginationType, { name: 'telefonos' })
  async findAll(@Args() filter: TelefonosIdArgs) {
    const [items] = await Promise.all([
      this.telefonosService.findAll(filter)
    ]);
    return items
  }

  @Query(() => Telefono, { name: 'telefono' })
  findOne(
    @Args('filterArgs', { type: () => Int }) telefonoFilterArgs: TelefonosFilterArgs
    ) {
      return this.telefonosService.findOne(telefonoFilterArgs);
  }

  @Query(() => Int, { name: 'telefonoCount' })
  count() {
    return this.telefonosService.count();
  }

  @Mutation(() => Boolean)
  removeTelefono(
    @Args('cod_int', { type: () => Int }) cod_int: number,
    @Args('cod_area', { type: () => Int }) cod_area: number,
    @Args('numero', { type: () => Int }) numero: number
  ) {
    return this.telefonosService.remove(cod_int, cod_area, numero);
  }
}
