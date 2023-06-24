import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Role } from "../entities/role.entity";

@ObjectType()
export class RolesPaginationType {
  @Field(() => [Role])
  items: Role[];

  @Field(() => Int)
  numberOfPages: number;
}
