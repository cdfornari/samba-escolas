import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsInt, IsPositive} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class CreateOrgCarnavalInput {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_integrante: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_rol: number;

  @IsDateString()
  @Field( () => DateScalar)
  fecha_inicio: Date;

  @IsDateString()
  @Field( () => DateScalar)
  anual: Date;
}
