import { gql } from '@apollo/client';
import {
  EscolaFragment,
  IntegranteFragment,
  LugaresFragment,
} from './fragments';

export const ESCOLAS = gql`
  query ESCOLAS($page: Int, $perPage: Int) {
    escolas(page: $page, perPage: $perPage) {
      items {
        ...EscolaFragment
        ciudad {
          nombre
        }
      }
      numberOfPages
    }
    escolasCount
  }
  ${EscolaFragment}
`;

export const ESCOLA = gql`
  query ESCOLA($id: Int!) {
    escola(id: $id) {
      ...EscolaFragment
      descripcion
      resumen_historico
      ciudad {
        id
        nombre
      }
    }
  }
  ${EscolaFragment}
`;

export const LUGARES = gql`
  query LUGARES($page: Int, $perPage: Int, $tipo: PlaceType) {
    lugares(page: $page, perPage: $perPage, tipo: $tipo) {
      items {
        ...LugaresFragment
        padre {
          nombre
        }
      }
      numberOfPages
    }
    lugaresCount
  }
  ${LugaresFragment}
`;

export const LUGAR = gql`
  query LUGAR($id: Int!) {
    lugar(id: $id) {
      ...LugaresFragment
      padre {
        id
        nombre
      }
    }
  }
  ${LugaresFragment}
`;

export const INTEGRANTES = gql`
  query INTEGRANTES($page: Int, $perPage: Int) {
    integrantes(page: $page, perPage: $perPage) {
      items {
        ...IntegranteFragment
      }
      numberOfPages
    }
    integrantesCount
  }
  ${IntegranteFragment}
`;

export const INTEGRANTE = gql`
  query INTEGRANTE($id: Int!) {
    integrante(id: $id) {
      ...IntegranteFragment
    }
  }
  ${IntegranteFragment}
`;
