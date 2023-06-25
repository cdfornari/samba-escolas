import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Telefono {
    
    @Field( () => Int)
    cod_int: number;

    @Field( () => Int)
    cod_area: number;

    @Field( () => Int)
    numero: number;

    @Field( () => Int, {nullable: true})
    id_escuela?: number;

    @Field( () => Int, {nullable: true})
    id_jur?: number;

    @Field( () => Int, {nullable: true})
    id_nat?: number; 


}
