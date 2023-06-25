import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JuridicosService } from './juridico.service';
import { Juridico } from './entities/juridico.entity';
import { CreateJuridicoInput} from './dto/create-juridico.input';
import { UpdateJuridicoInput } from './dto/update-juridico.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ColorPaginationType } from './types/colores-pagination.type';

@Resolver(() => Juridico)
export class JuridicosResolver {
  constructor(private readonly juridicosService: JuridicosService) {}

  @Mutation(() => Juridico)
  createIntegrante(
    @Args('createJuridicoInput') createJuridicoInput: CreateJuridicoInput,
  ) {
    return this.juridicosService.create(createJuridicoInput);
  }

  @Query(() => ColorPaginationType, { name: 'juridicos' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.juridicosService.findAll(pagination),
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
  updateIntegrante(
    @Args('updateJuridicoInput') updateJuridicoInput: UpdateJuridicoInput,
  ) {
    return this.juridicosService.update(updateJuridicoInput);
  }

  @Mutation(() => Juridico)
  removeIntegrante(@Args('id', { type: () => Int }) id: number) {
    return this.juridicosService.remove(id);
  }
}
