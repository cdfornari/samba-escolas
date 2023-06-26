import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsInt, IsPositive} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class OrgCarnavalFilterEscuelaArgs{

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

}
