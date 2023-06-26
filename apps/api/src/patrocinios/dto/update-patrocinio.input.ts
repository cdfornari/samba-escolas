import { IsDateString, IsInt, IsPositive } from 'class-validator';
import { InputType, Field, Int} from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class UpdatePatrocinioInput {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsDateString()
  @Field(() => DateScalar)
  fecha_fin: Date;

}
