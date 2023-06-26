import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PatrociniosService } from './patrocinios.service';
import { Patrocinio } from './entities/patrocinio.entity';
import { CreatePatrocinioInput } from './dto/create-patrocinio.input';
import { UpdatePatrocinioInput } from './dto/update-patrocinio.input';
import { PatrocinioPaginationType } from './types/patrocinio-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PatrocinioFilterArgs } from './types/patrocinio-filter.args';
import { PatrocinioIdArgs } from './types/patrocinio-id.args';
import { Escola } from 'src/escolas/entities/escola.entity';
import { JuridicosService } from 'src/patroc_juridicos/juridico.service';
import { NaturalesService } from 'src/patroc_naturales/naturales.service';
import { EscolasService } from 'src/escolas/escolas.service';
import { Juridico } from 'src/patroc_juridicos/entities/juridico.entity';
import { Natural } from 'src/patroc_naturales/entities/naturales.entity';
import { DonacionesService } from './donaciones/donaciones.service';

@Resolver(() => Patrocinio)
export class PatrociniosResolver {
  constructor(
    private readonly patrociniosService: PatrociniosService,
    private readonly juridicosService: JuridicosService,
    private readonly naturalesService: NaturalesService,
    private readonly escolasService: EscolasService,
    private readonly donacionesService: DonacionesService,
  ) {}

  @Mutation(() => Patrocinio)
  createPatrocinio(
    @Args('createPatrocinioInput') createPatrocinioInput: CreatePatrocinioInput,
  ) {
    return this.patrociniosService.create(createPatrocinioInput);
  }

  @Query(() => PatrocinioPaginationType, { name: 'patrocinios' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter:PatrocinioFilterArgs,
  ): Promise<PatrocinioPaginationType> {
    const [items, count] = await Promise.all([
      this.patrociniosService.findAll(pagination,filter) as Promise<any>,
      this.patrociniosService.count(filter),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Patrocinio, { name: 'patrocinio' })
  findOne(@Args() id: PatrocinioIdArgs) {
    return this.patrociniosService.findOne(id);
  }

  @Query(() => Int, { name: 'patrociniosCount' })
  count(@Args() filter: PatrocinioFilterArgs) {
    return this.patrociniosService.count(filter);
  }

  @Mutation(() => Patrocinio)
  updatePatrocinio(
    @Args('updatePatricinioInput') updateEscolaInput: UpdatePatrocinioInput,
  ) {
    return this.patrociniosService.update(updateEscolaInput);
  }

  @Mutation(() => Patrocinio)
  removePatrocinio(@Args() idArgs: PatrocinioIdArgs) {
    const {id} = idArgs
    return this.patrociniosService.remove(id);
  }

  @ResolveField(() => Escola, { name: 'escola' })
  getEscuela(@Parent() patrocinio: Patrocinio) {
    return this.escolasService.findOne(patrocinio.id_escuela);
  }

  @ResolveField(() => Juridico, { name: 'patroc_juridico',nullable: true})
  getJuridico(@Parent() patrocinio: Patrocinio){
    return this.juridicosService.findOne(patrocinio.id_jur);
  }

  @ResolveField(() => Natural, { name: 'patroc_natural',nullable: true}  )
  getNatural(@Parent() patrocinio: Patrocinio) {
    return this.naturalesService.findOne(patrocinio.id_nat);
  }

  @ResolveField(() => Int, { name: 'total_donaciones'}  )
  getTotal(@Parent() patrocinio: Patrocinio) {
    return this.donacionesService.total({
      id_patroc: patrocinio.id,
      id_escuela: patrocinio.id_escuela,
    });
  }
}
