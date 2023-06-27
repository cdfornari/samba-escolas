import { gql } from '@apollo/client';
import {
  ColorFragment,
  DonacionFragment,
  EscolaFragment,
  EventFragment,
  HabilidadesFragment,
  IntegranteFragment,
  IntegranteHistoryFragment,
  JuridicoFragment,
  LugaresFragment,
  NaturalFragment,
  PatrocinioFragment,
  PremioFragment,
  RolesFragment,
  TituloFragment,
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
      colores {
        ...ColorFragment
      }
    }
  }
  ${EscolaFragment}
  ${ColorFragment}
`;

export const LUGARES = gql`
  query LUGARES(
    $page: Int
    $perPage: Int
    $tipo: PlaceType
    $paginate: Boolean
  ) {
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

export const INTEGRANTES_ELEGIBLES = gql`
  query INTEGRANTES_ELEGIBLES {
    integrantesElegibles {
      ...IntegranteFragment
    }
  }
  ${IntegranteFragment}
`;

export const INTEGRANTE = gql`
  query INTEGRANTE($id: Int!) {
    integrante(id: $id) {
      ...IntegranteFragment
      habilidades {
        id
        nombre
      }
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

export const HABILIDADES = gql`
  query Query($page: Int, $perPage: Int) {
    habilidades(page: $page, perPage: $perPage) {
      items {
        ...HabilidadesFragment
    }
    numberOfPages
    }
    habilidadCount
  }
  ${HabilidadesFragment}
`;

export const HABILIDAD = gql`
query Query($habilidadId: Int!) {
    habilidad(id: $habilidadId) {
      ...HabilidadesFragment
    }
  }
  ${HabilidadesFragment}
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

export const COLORS = gql`
  query COLORS($page: Int, $perPage: Int, $paginate: Boolean) {
    colores(page: $page, perPage: $perPage, paginate: $paginate) {
      items {
        ...ColorFragment
      }
      numberOfPages
    }
    colorCount
  }
  ${ColorFragment}
`;

export const TITULOS = gql`
  query TITULOS(
    $idEscuela: Int!
    $page: Int
    $perPage: Int
    $paginate: Boolean!
  ) {
    titulos(
      id_escuela: $idEscuela
      page: $page
      perPage: $perPage
      paginate: $paginate
    ) {
      items {
        ...TituloFragment
      }
      numberOfPages
    }
    titulosCount(id_escuela: $idEscuela)
  }
  ${TituloFragment}
`;

export const EVENTS = gql`
  query EVENTS($idEscuela: Int!, $perPage: Int, $page: Int) {
    eventos(id_escuela: $idEscuela, perPage: $perPage, page: $page) {
      items {
        ...EventFragment
      }
      numberOfPages
    }
    eventoCount(id_escuela: $idEscuela)
  }
  ${EventFragment}
`;

export const EVENT = gql`
  query EVENT($eventoId: Int!) {
    evento(id: $eventoId) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const PATROCINIOS = gql`
  query PATROCINIOS($idEscuela: Int!, $perPage: Int, $page: Int) {
    patrocinios(id_escuela: $idEscuela, perPage: $perPage, page: $page) {
      items {
        ...PatrocinioFragment
      }
      numberOfPages
    }
    patrociniosCount(id_escuela: $idEscuela)
  }
  ${PatrocinioFragment}
`;

export const NATURAL = gql`
  query Query($naturalId: Int!) {
    natural(id: $naturalId) {
      ...NaturalFragment
    }
  }
  ${NaturalFragment}
`;

export const NATURALES = gql`
  query NATURALES($page: Int, $perPage: Int, $paginate: Boolean!) {
    naturales(page: $page, perPage: $perPage, paginate: $paginate) {
      items {
        ...NaturalFragment
      }
      numberOfPages
    }
    naturalesCount
  }
  ${NaturalFragment}
`;

export const JURIDICO = gql`
  query JURIDICO($juridicoId: Int!) {
    juridico(id: $juridicoId) {
      ...JuridicoFragment
    }
  }
  ${JuridicoFragment}
`;

export const JURIDICOS = gql`
  query JURIDICOS($page: Int, $perPage: Int, $paginate: Boolean!) {
    juridicos(page: $page, perPage: $perPage, paginate: $paginate) {
      items {
        ...JuridicoFragment
      }
      numberOfPages
    }
    juridicosCount
  }
  ${JuridicoFragment}
`;

export const PREMIOS = gql`
  query PREMIOS($page: Int, $perPage: Int, $paginate: Boolean!) {
    premios(page: $page, perPage: $perPage, $paginate: $paginate) {
      items {
       ...PremioFragment 
      }
      numberOfPages
    }
    premiosCount
  }
  ${PremioFragment}
`;

export const PREMIO = gql`
  query PREMIO($premioId: Int!) {
    premio(id: $premioId) {
    ...PremioFragment
    }
  }
  ${PremioFragment}
  
export const HABILIDADES = gql`
  query HABILIDADES($page: Int, $perPage: Int, $paginate: Boolean!) {
    habilidades(page: $page, perPage: $perPage, paginate: $paginate) {
      items {
        descripcion
        id
        nombre
      }
      numberOfPages
    }
  }
`;

export const DONACIONES = gql`
  query DONACIONES(
    $idEscuela: Int!
    $idPatroc: Int!
    $page: Int
    $perPage: Int
  ) {
    donaciones(
      id_escuela: $idEscuela
      id_patroc: $idPatroc
      page: $page
      perPage: $perPage
    ) {
      items {
        ...DonacionFragment
      }
      numberOfPages
    }
    donacionesCount(id_escuela: $idEscuela, id_patroc: $idPatroc)
  }
  ${DonacionFragment}
`;

export const GANADORES = gql`
  query Query(
    $idEscuela: Int
    $idIntegrante: Int
    $fechaInicio: Date
    $idEscuelaIntegrante: Int
    $page: Int
    $perPage: Int
  ) {
    ganadores(
      id_escuela: $idEscuela
      id_integrante: $idIntegrante
      fecha_inicio: $fechaInicio
      id_escuela_integrante: $idEscuelaIntegrante
      page: $page
      perPage: $perPage
    ) {
      items {
        year
        premio {
          id
          nombre
        }
      }
      numberOfPages
    }
    ganadoresCount(
      id_escuela: $idEscuela
      id_integrante: $idIntegrante
      fecha_inicio: $fechaInicio
      id_escuela_integrante: $idEscuelaIntegrante
    )
  }
`;
