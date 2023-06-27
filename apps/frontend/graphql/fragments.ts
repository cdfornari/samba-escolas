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

export const HabilidadesFragment = gql`
  fragment HabilidadesFragment on Habilidad {
    id
    nombre
    descripcion
  }
`;

export const RolesFragment = gql`
  fragment RolesFragment on Role {
    id
    nombre
    descripcion
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

export const IntegranteHistoryFragment = gql`
  fragment IntegranteHistoryFragment on HistoricoIntegrante {
    fecha_inicio
    fecha_fin
    autoridad
    integrante {
      ...IntegranteFragment
    }
  }
  ${IntegranteFragment}
`;

export const ColorFragment = gql`
  fragment ColorFragment on Color {
    id
    nombre
  }
`;

export const TituloFragment = gql`
  fragment TituloFragment on TituloHistory {
    grupo
    monto
    year
  }
`;

export const EventFragment = gql`
  fragment EventFragment on Evento {
    id
    fecha_inicio
    fecha_fin
    tipo
    nombre
    costo_unit
    descripcion
    asist_total
  }
`;

export const NaturalFragment = gql`
  fragment NaturalFragment on Natural {
    apellido1
    apellido2
    email
    id
    nombre1
    nombre2
    rg
  }
`;

export const JuridicoFragment = gql`
  fragment JuridicoFragment on Juridico {
    cep
    ciudad {
      nombre
    }
    cnpj
    dir
    email
    id
    nombre
    numero
  }
`;

export const PatrocinioFragment = gql`
  fragment PatrocinioFragment on Patrocinio {
    id
    fecha_inicio
    fecha_fin
    total_donaciones
    patroc_natural {
      ...NaturalFragment
    }
    patroc_juridico {
      ...JuridicoFragment
    }
  }
  ${NaturalFragment}
  ${JuridicoFragment}
`;

export const PremioFragment = gql`
  fragment PremioFragment on Premio {
    id
    nombre
    tipo
    descripcion
    lugar {
        ...LugaresFragment
    }
  }
  ${LugaresFragment}
`;