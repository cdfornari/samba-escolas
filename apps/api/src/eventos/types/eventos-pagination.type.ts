import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Evento } from '../entities/evento.entity';

@ObjectType()
export class EventosPaginationType {
  @Field(() => [Evento])
  items: Evento[];

  @Field(() => Int)
  numberOfPages: number;
}
