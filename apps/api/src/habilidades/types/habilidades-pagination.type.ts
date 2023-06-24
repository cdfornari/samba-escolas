import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Habilidad } from '../entities/habilidad.entity';

@ObjectType()
export class HabilidadPaginationType {
  @Field(() => [Habilidad])
  items: Habilidad[];

  @Field(() => Int)
  numberOfPages: number;
}
