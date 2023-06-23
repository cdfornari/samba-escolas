import { gql } from '@apollo/client';

export const EscolaFragment = gql`
  fragment EscolaFragment on Escola {
    id
    nombre
    fecha_fundacion
    gres
    direccion_sede
    numero
    cep
  }
`;

export const LugaresFragment = gql`
  fragment LugaresFragment on Lugar {
    id
    nombre
    tipo
  }
`;
