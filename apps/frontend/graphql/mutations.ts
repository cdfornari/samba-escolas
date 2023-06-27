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

export const REMOVE_ESCOLA = gql`
  mutation Mutation($removeEscolaId: Int!) {
    removeEscola(id: $removeEscolaId)
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

export const REMOVE_INTEGRANTE = gql`
  mutation REMOVE_INTEGRANTE($removeIntegranteId: Int!) {
    removeIntegrante(id: $removeIntegranteId)
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

export const CREATE_TITULO = gql`
  mutation CREATE_TITULO($createTituloHistoryInput: CreateTituloHistoryInput!) {
    createTituloHistory(createTituloHistoryInput: $createTituloHistoryInput) {
      year
    }
  }
`;

export const REMOVE_TITULO = gql`
  mutation REMOVE_TITULO($year: Int!, $idEscuela: Int!) {
    removeTituloHistory(year: $year, id_escuela: $idEscuela)
  }
`;

export const CREATE_EVENT = gql`
  mutation Mutation($createEventoInput: CreateEventoInput!) {
    createEvento(createEventoInput: $createEventoInput) {
      id
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UPDATE_EVENT($updateEventoInput: UpdateEventoInput!) {
    updateEvento(updateEventoInput: $updateEventoInput) {
      id
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation REMOVE_EVENT($removeEventoId: Int!) {
    removeEvento(id: $removeEventoId)
  }
`;

export const CREATE_PATROCINIO = gql`
  mutation CREATE_PATROCINIO($createPatrocinioInput: CreatePatrocinioInput!) {
    createPatrocinio(createPatrocinioInput: $createPatrocinioInput) {
      id
    }
  }
`;

export const UPDATE_PATROCINIO = gql`
  mutation UPDATE_PATROCINIO($updatePatricinioInput: UpdatePatrocinioInput!) {
    updatePatrocinio(updatePatricinioInput: $updatePatricinioInput) {
      id
    }
  }
`;

export const REMOVE_PATROCINIO = gql`
  mutation REMOVE_PATROCINIO($removePatrocinioId: Int!, $idEscuela: Int!) {
    removePatrocinio(id: $removePatrocinioId, id_escuela: $idEscuela)
  }
`;

export const CREATE_JURIDICO = gql`
  mutation CREATE_JURIDICO($createJuridicoInput: CreateJuridicoInput!) {
    createJuridico(createJuridicoInput: $createJuridicoInput) {
      id
    }
  }
`;

export const UPDATE_JURIDICO = gql`
  mutation UpdateJuridico($updateJuridicoInput: UpdateJuridicoInput!) {
    updateJuridico(updateJuridicoInput: $updateJuridicoInput) {
      id
    }
  }
`;

export const REMOVE_JURIDICO = gql`
  mutation REMOVE_JURIDICO($removeJuridicoId: Int!) {
    removeJuridico(id: $removeJuridicoId)
  }
`;

export const CREATE_NATURAL = gql`
  mutation CREATE_NATURAL($createNaturalesInput: CreateNaturalesInput!) {
    createNatural(createNaturalesInput: $createNaturalesInput) {
      id
    }
  }
`;

export const UPDATE_NATURAL = gql`
  mutation UPDATE_NATURAL($updateNaturalesInput: UpdateNaturalesInput!) {
    updateNatural(updateNaturalesInput: $updateNaturalesInput) {
      id
    }
  }
`;

export const REMOVE_NATURAL = gql`
  mutation REMOVE_NATURAL($removeNaturalId: Int!) {
    removeNatural(id: $removeNaturalId)
  }
`;

export const CREATE_DONACION = gql`
  mutation CREATE_DONACION($createDonacionInput: CreateDonacionInput!) {
    createDonacion(createDonacionInput: $createDonacionInput) {
      id
    }
  }
`;

export const REMOVE_DONACION = gql`
  mutation REMOVE_DONACION(
    $removeDonacionId: Int!
    $idEscuela: Int!
    $idPatroc: Int!
  ) {
    removeDonacion(
      id: $removeDonacionId
      id_escuela: $idEscuela
      id_patroc: $idPatroc
    )
  }
`;

export const REMOVE_GANADOR = gql`
  mutation REMOVE_GANADOR($idPremio: Int!, $year: Int!) {
    removeGanador(idPremio: $idPremio, year: $year)
  }
`;

export const CREATE_GANADOR = gql`
  mutation Mutation($createGanadoresInput: CreateGanadoresInput!) {
    createGanador(createGanadoresInput: $createGanadoresInput) {
      year
    }
  }
`;
