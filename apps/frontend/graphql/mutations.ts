import { gql } from '@apollo/client';

export const CREATE_PLACE = gql`
  mutation CREATE_PLACE($createLugaresInput: CreateLugaresInput!) {
    createLugares(createLugaresInput: $createLugaresInput) {
      id
    }
  }
`;

export const UPDATE_PLACE = gql`
  mutation UPDATE_PLACE($updateLugaresInput: UpdateLugaresInput!) {
    updateLugar(updateLugaresInput: $updateLugaresInput) {
      id
    }
  }
`;

export const CREATE_ESCOLA = gql`
  mutation CREATE_ESCOLA($createEscolaInput: CreateEscolaInput!) {
    createEscola(createEscolaInput: $createEscolaInput) {
      id
    }
  }
`;

export const UPDATE_ESCOLA = gql`
  mutation UPDATE_ESCOLA($updateEscolaInput: UpdateEscolaInput!) {
    updateEscola(updateEscolaInput: $updateEscolaInput) {
      id
    }
  }
`;

export const CREATE_INTEGRANTE = gql`
  mutation CREATE_INTEGRANTE($createIntegranteInput: CreateIntegranteInput!) {
    createIntegrante(createIntegranteInput: $createIntegranteInput) {
      id
    }
  }
`;

export const UPDATE_INTEGRANTE = gql`
  mutation UPDATE_INTEGRANTE($updateIntegranteInput: UpdateIntegranteInput!) {
    updateIntegrante(updateIntegranteInput: $updateIntegranteInput) {
      id
    }
  }
`;

export const CREATE_ROL = gql`
  mutation CREATE_ROL($createRoleInput: CreateRoleInput!) {
    createRole(createRoleInput: $createRoleInput) {
      id
    }
  }
`;

export const UPDATE_ROL = gql`
  mutation UPDATE_ROL($updateRoleInput: UpdateRoleInput!) {
    updateRole(updateRoleInput: $updateRoleInput) {
      id
    }
  }
`;

export const CREATE_INTEGRANTE_HISTORY = gql`
  mutation CREATE_INTEGRANTE_HISTORY(
    $createHistoricoIntegranteInput: CreateHistoricoIntegranteInput!
  ) {
    createIntegranteHistory(
      createHistoricoIntegranteInput: $createHistoricoIntegranteInput
    ) {
      autoridad
    }
  }
`;

export const UPDATE_INTEGRANTE_HISTORY = gql`
  mutation UPDATE_INTEGRANTE_HISTORY(
    $updateHistoricoIntegranteInput: UpdateHistoricoIntegranteInput!
  ) {
    updateIntegranteHistory(
      updateHistoricoIntegranteInput: $updateHistoricoIntegranteInput
    ) {
      autoridad
    }
  }
`;

export const REMOVE_INTEGRANTE_HISTORY = gql`
  mutation REMOVE_INTEGRANTE_HISTORY(
    $idEscuela: Int!
    $idIntegrante: Int!
    $fechaInicio: Date!
  ) {
    removeIntegranteHistory(
      id_escuela: $idEscuela
      id_integrante: $idIntegrante
      fecha_inicio: $fechaInicio
    )
  }
`;

export const REMOVE_TITULO = gql`
  mutation REMOVE_TITULO($year: Int!, $idEscuela: Int!) {
    removeTituloHistory(year: $year, id_escuela: $idEscuela)
  }
`;
