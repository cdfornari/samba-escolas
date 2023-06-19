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
