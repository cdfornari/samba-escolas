import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrgCarnaval } from '../entities/org_carnaval.entity';

@ObjectType()
export class OrgCarnavalesPaginationType {
  @Field(() => [ OrgCarnaval ])
  items: OrgCarnaval[];

  @Field(() => Int)
  numberOfPages: number;
}
