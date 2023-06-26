import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsPositive } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class ToggleSambaHistIntegranteInput {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_integrante: number;
  
  @IsDateString()
  @Field(() => DateScalar)
  fecha_inicio: Date; 
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number; 
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_samba: number;
}
