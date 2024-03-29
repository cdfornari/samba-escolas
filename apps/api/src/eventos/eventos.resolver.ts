import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventosService } from './eventos.service';
import { Evento } from './entities/evento.entity';
import { CreateEventoInput } from './dto/create-evento.input';
import { UpdateEventoInput } from './dto/update-evento.input';
import { EventosPaginationType } from './types/eventos-pagination.type';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { getNumberOfPages } from 'src/common/pagination/getPaginationInfo';
import { EventosFilterArgs } from './types/eventos-filter.args';

@Resolver(() => Evento)
export class EventosResolver {
  constructor(private readonly eventosService: EventosService) {}

  @Mutation(() => Evento)
  createEvento(
    @Args('createEventoInput') createEventoInput: CreateEventoInput,
  ) {
    return this.eventosService.create(createEventoInput);
  }

  @Query(() => EventosPaginationType, { name: 'eventos' })
  async findAll(
    @Args() pagination: PaginationArgs,
    @Args() filter: EventosFilterArgs,
  ) {
    const [items, count] = await Promise.all([
      this.eventosService.findAll(pagination, filter),
      this.eventosService.count(filter),
    ]);
    return {
      items,
      numberOfPages: getNumberOfPages(pagination, count),
    };
  }

  @Query(() => Int, { name: 'eventoCount' })
  count(@Args() filter: EventosFilterArgs) {
    return this.eventosService.count(filter);
  }

  @Query(() => Evento, { name: 'evento' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventosService.findOne(id);
  }

  @Mutation(() => Evento)
  updateEvento(
    @Args('updateEventoInput') updateEventoInput: UpdateEventoInput,
  ) {
    return this.eventosService.update(updateEventoInput);
  }

  @Mutation(() => Boolean)
  removeEvento(@Args('id', { type: () => Int }) id: number) {
    return this.eventosService.remove(id);
  }
}
