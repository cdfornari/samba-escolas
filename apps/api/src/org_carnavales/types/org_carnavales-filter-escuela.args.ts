import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsPositive} from 'class-validator';

@InputType()
export class OrgCarnavalFilterEscuelaArgs{

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

}
