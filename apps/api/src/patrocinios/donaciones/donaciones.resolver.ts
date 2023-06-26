import {
    Args,
    Mutation,
    Resolver,
    Query,
    Int,
    ResolveField,
    Parent,
  } from '@nestjs/graphql';
  import { Donacion } from './entities/donacion.entity';
  import { CreateDonacionInput } from './dto/create-donacion.input';
  import { PaginationArgs } from 'src/common/dto/args/pagination.args';
  import { DonacionPaginationType } from './types/donacion-pagination.type';
  import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
  import { DonacionesService} from './donaciones.service';
  import { UpdateDonacionInput } from './dto/update-donacion.input';
  import { PatrociniosService } from '../patrocinios.service';  
  import { DonacionFilterHistoricoArgs } from './types/donacion-filter-historico.args';
import { Patrocinio } from '../entities/patrocinio.entity';
  
  @Resolver(() => Donacion)
  export class DonacionesResolver {
    constructor(
      private readonly donacionesService: DonacionesService,
      private readonly patrociniosService: PatrociniosService,
    ) {}
  
    @Mutation(() => Donacion)
    createDonacion(
      @Args('createDonacionInput')
      createDonacionInput: CreateDonacionInput,
    ) {
      return this.donacionesService.create(createDonacionInput);
    }
  
    @Query(() => DonacionPaginationType, { name: 'donaciones' })
    async findAll(
      @Args() pagination: PaginationArgs,
      @Args() filter: DonacionFilterHistoricoArgs,
    ): Promise<DonacionPaginationType> {
      const [items, count] = await Promise.all([
        this.donacionesService.findAll(pagination, filter) as Promise<any>,
        this.donacionesService.count(filter),
      ]);
      return {
        items,
        numberOfPages: getNumberOfPages(pagination, count),
      };
    }
  
    @Query(() => Donacion, { name: 'donacion' })
    async findOne(@Args('id', { type: () => Int }) id: number) {
      return this.donacionesService.findOne(id);
    }
  
    @Query(() => Int, { name: 'donacionesCount' })
    count(@Args() filter: DonacionFilterHistoricoArgs) {
      return this.donacionesService.count(filter);
    }
  
    @Mutation(() => Donacion)
    updateDonacion(
      @Args('updateDonacionInput')
      updateDonacionInput: UpdateDonacionInput,
    ) {
      return this.donacionesService.update(updateDonacionInput);
    }
  
    @Mutation(() => Donacion)
    removeDonacion(@Args('id', { type: () => Int }) id: number) {
      return this.donacionesService.remove(id);
    }
  
    @ResolveField(() => Patrocinio, { name: 'patrocinio' })
    getPatrocinio(@Parent() donacion: Donacion) {
    return this.patrociniosService.findOne(donacion.id_patroc);
    }
  }
  