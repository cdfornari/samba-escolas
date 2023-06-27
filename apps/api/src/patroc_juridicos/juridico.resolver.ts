import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JuridicosService } from './juridico.service';
import { Juridico } from './entities/juridico.entity';
import { CreateJuridicoInput } from './dto/create-juridico.input';
import { UpdateJuridicoInput } from './dto/update-juridico.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { JuridicoPaginationType } from './types/juridicos-pagination.type';
import { LugaresService } from 'src/lugares/lugares.service';
import { Lugar } from 'src/lugares/entities/lugar.entity';

@Resolver(() => Juridico)
export class JuridicosResolver {
  constructor(
    private readonly juridicosService: JuridicosService,
    private readonly lugaresService: LugaresService,
  ) {}

  @Mutation(() => Juridico)
  createJuridico(
    @Args('createJuridicoInput') createJuridicoInput: CreateJuridicoInput,
  ) {
    return this.juridicosService.create(createJuridicoInput);
  }

  @Query(() => JuridicoPaginationType, { name: 'juridicos' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args('paginate', { type: () => Boolean, defaultValue: true })
    paginate: boolean,
  ) {
    const [items, count] = await Promise.all([
      this.juridicosService.findAll(paginate ? pagination : null),
      this.juridicosService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'juridicosCount' })
  count() {
    return this.juridicosService.count();
  }

  @Query(() => Juridico, { name: 'juridico' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.juridicosService.findOne(id);
  }

  @Mutation(() => Juridico)
  updateJuridico(
    @Args('updateJuridicoInput') updateJuridicoInput: UpdateJuridicoInput,
  ) {
    return this.juridicosService.update(updateJuridicoInput);
  }

  @Mutation(() => Boolean)
  removeJuridico(@Args('id', { type: () => Int }) id: number) {
    return this.juridicosService.remove(id);
  }

  @ResolveField(() => Lugar, { name: 'ciudad' })
  async getCity(@Parent() juridico: Juridico): Promise<Lugar> {
    return this.lugaresService.findOne(juridico.id_lugar);
  }
}
