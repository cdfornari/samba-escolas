import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Premio {
  
  @Field( () => Int)
  id: number;

  @Field()
  nombre: string;

  @Field()
  tipo: string;

  @Field()
  descripcion: string;

  @Field( () => Int )
  id_lugar: number;


}
