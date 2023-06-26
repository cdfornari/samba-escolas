import { ObjectType, Field} from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class OrgCarnaval {

  id_integrante: number;

  id_escuela: number;

  id_rol: number;

  @Field( () => DateScalar)
  fecha_inicio: Date;

  @Field( () => DateScalar)
  anual: Date;

}
