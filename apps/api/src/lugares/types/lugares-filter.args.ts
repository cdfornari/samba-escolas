import { ArgsType, Field } from '@nestjs/graphql';
import { PlaceTypeEnum } from '../enums/place-type.enum';
import { IsIn, IsOptional } from 'class-validator';

@ArgsType()
export class LugaresFilterArgs {
  @IsOptional()
  @IsIn([PlaceTypeEnum.ciudad, PlaceTypeEnum.estado, PlaceTypeEnum.region])
  @Field(() => PlaceTypeEnum, { nullable: true })
  tipo: PlaceTypeEnum;
}
