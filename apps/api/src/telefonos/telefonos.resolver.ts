import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TelefonosService } from './telefonos.service';
import { Telefono } from './entities/telefono.entity';
import { CreateTelefonoInput } from './dto/create-telefono.input';
import { UpdateTelefonoInput } from './dto/update-telefono.input';
import { TelefonoPaginationType } from './types/telefonos-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';

@Resolver(() => Telefono)
export class TelefonosResolver {
  constructor(private readonly telefonosService: TelefonosService) {}

  @Mutation(() => Telefono)
  createTelefono(@Args('createTelefonoInput') createTelefonoInput: CreateTelefonoInput) {
    return this.telefonosService.create(createTelefonoInput);
  }

  @Query(() => TelefonoPaginationType, { name: 'telefonos' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.telefonosService.findAll(pagination),
      this.telefonosService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Telefono, { name: 'telefono' })
  findOne(
    @Args('cod_int', { type: () => Int }) cod_int: number,
    @Args('cod_area', { type: () => Int }) cod_area: number,
    @Args('numero', { type: () => Int }) numero: number
    ) {
    return this.telefonosService.findOne(cod_int, cod_area, numero);
  }

  @Query(() => Int, { name: 'telefonoCount' })
  count() {
    return this.telefonosService.count();
  }

  @Mutation(() => Telefono)
  updateTelefono(@Args('updateTelefonoInput') updateTelefonoInput: UpdateTelefonoInput) {
    return this.telefonosService.update(updateTelefonoInput);
  }

  @Mutation(() => Telefono)
  removeTelefono(
    @Args('cod_int', { type: () => Int }) cod_int: number,
    @Args('cod_area', { type: () => Int }) cod_area: number,
    @Args('numero', { type: () => Int }) numero: number
  ) {
    return this.telefonosService.remove(cod_int, cod_area, numero);
  }
}
