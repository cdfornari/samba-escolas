import { gql } from '@apollo/client';

export const EscolaFragment = gql`
  fragment EscolaFragment on Escola {
    id
    nombre
    fecha_fundacion
    gres
  }
`;
