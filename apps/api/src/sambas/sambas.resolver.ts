import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SambasService } from './sambas.service';
import { Samba } from './entities/samba.entity';
import { CreateSambaInput } from './dto/create-samba.input';
import { UpdateSambaInput } from './dto/update-samba.input';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SambaPaginationType } from './types/sambas-pagination.type';
import { ToggleSambaHistIntegranteInput } from './dto/toggle-samba-histintegrante.input';
import { HistoricoIntegrante } from 'src/escolas/integrante-history/entities/integrante-history.entity';

@Resolver(() => Samba)
export class SambasResolver {
  constructor(private readonly sambasService: SambasService) {}

  @Mutation(() => Samba)
  createIntegrante(
    @Args('createSambaInput') createSambaInput: CreateSambaInput,
  ) {
    return this.sambasService.create(createSambaInput);
  }

  @Query(() => SambaPaginationType, { name: 'sambas' })
  async findAll(@Args() pagination: PaginationArgs) {
    const [items, count] = await Promise.all([
      this.sambasService.findAll(pagination),
      this.sambasService.count(),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'sambaCount' })
  count() {
    return this.sambasService.count();
  }

  @Query(() => Samba, { name: 'samba' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sambasService.findOne(id);
  }

  @Mutation(() => Samba)
  updateIntegrante(
    @Args('updateSambaInput') updateSambaInput: UpdateSambaInput,
  ) {
    return this.sambasService.update(updateSambaInput);
  }

  @Mutation(() => Samba)
  removeIntegrante(@Args('id', { type: () => Int }) id: number) {
    return this.sambasService.remove(id);
  }

    @Mutation(() => Boolean)
  async addSambaToHistoricoIntegrante(
    @Args('toggleSambaHistIntegranteInput')
    { id_integrante, fecha_inicio, id_escuela, id_samba }: ToggleSambaHistIntegranteInput,
  ) {
    try {
      this.sambasService.addAutor(id_samba, id_integrante, fecha_inicio, id_escuela);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async removeSambaFromHistoricoIntegrante(
    @Args('toggleSambaHistIntegranteInput')
    { id_integrante, fecha_inicio, id_escuela, id_samba }: ToggleSambaHistIntegranteInput,
  ) {
    try {
      this.sambasService.removeAutor(id_samba, id_integrante, fecha_inicio, id_escuela);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField(() => [HistoricoIntegrante], { name: 'autores' })
  async getAutores(@Parent() samba: Samba): Promise<HistoricoIntegrante[]> {
    return this.sambasService.getAutores(samba.id);
  }

}
