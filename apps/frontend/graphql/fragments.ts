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

export const IntegranteFragment = gql`
  fragment IntegranteFragment on Integrante {
    id
    nombre1
    nombre2
    apellido1
    apellido2
    fecha_nacimiento
    genero
    apodo
    nacionalidad
    rg
  }
`;
