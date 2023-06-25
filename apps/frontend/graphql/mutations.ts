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
    createLugares(createRoleInput: $createRoleInput) {
      id
    }
  }
`;
