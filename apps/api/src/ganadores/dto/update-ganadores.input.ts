import { CreateGanadoresInput } from './create-ganadores.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGanadoresInput extends PartialType(CreateGanadoresInput) {

}
