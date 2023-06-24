import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SambaTypeEnum } from '../enums/samba.enum';

@ObjectType()
export class Samba {

    @Field(() => Int)
    id: number;

    @Field()
    titulo: string;

    @Field()
    letra: string;

    @Field()
    anual_carnv : number;

    @Field(() => SambaTypeEnum)
    tipo: SambaTypeEnum;
}
