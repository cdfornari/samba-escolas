import { gql } from '@apollo/client';
import {
  EscolaFragment,
  IntegranteFragment,
  IntegranteHistoryFragment,
  LugaresFragment,
  RolesFragment,
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
  query LUGARES($page: Int, $perPage: Int, $tipo: PlaceType, $paginate: Boolean) {
    lugares(page: $page, perPage: $perPage, tipo: $tipo, paginate: $paginate) {
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

export const ROLES = gql`
  query Roles($page: Int, $perPage: Int) {
    roles(page: $page, perPage: $perPage) {
      items {
        ...RolesFragment
      }
      numberOfPages
    }
    rolesCount
  }
  ${RolesFragment}
`;

export const ROL = gql`
  query Rol($id: Int!) {
    rol(id: $id) {
      ...RolesFragment
    }
  }
  ${RolesFragment}
`;

export const HISTORICOS_INTEGRANTES = gql`
  query HISTORICOS_INTEGRANTES($page: Int, $perPage: Int, $idEscuela: Int!) {
    integranteHistories(
      id_escuela: $idEscuela
      page: $page
      perPage: $perPage
    ) {
      items {
        ...IntegranteHistoryFragment
      }
      numberOfPages
    }
    integranteHistoriesCount(id_escuela: $idEscuela)
  }
  ${IntegranteHistoryFragment}
`;
