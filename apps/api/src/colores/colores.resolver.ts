import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColoresService } from './colores.service';
import { Color } from './entities/color.entity';
import { CreateColorInput} from './dto/create-color.input';
import { UpdateColorInput } from './dto/update-color.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ColorPaginationType } from './types/colores-pagination.type';

@Resolver(() => Color)
export class ColoresResolver {
  constructor(private readonly colorService: ColoresService) {}

  @Mutation(() => Color)
  createIntegrante(
    @Args('createColorInput') createColorInput: CreateColorInput,
  ) {
    return this.colorService.create(createColorInput);
  }

  @Query(() => ColorPaginationType, { name: 'colores' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.colorService.findAll(pagination),
      this.colorService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'colorCount' })
  count() {
    return this.colorService.count();
  }

  @Query(() => Color, { name: 'color' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.colorService.findOne(id);
  }

  @Mutation(() => Color)
  updateIntegrante(
    @Args('updateSambaInput') updateHabilidadInput: UpdateColorInput,
  ) {
    return this.colorService.update(updateHabilidadInput);
  }

  @Mutation(() => Color)
  removeIntegrante(@Args('id', { type: () => Int }) id: number) {
    return this.colorService.remove(id);
  }
}
