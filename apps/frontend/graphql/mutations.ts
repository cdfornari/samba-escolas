import { gql } from '@apollo/client';

export const CREATE_PLACE = gql`
  mutation CREATE_REVIEW($createLugaresInput: CreateLugaresInput!) {
    createLugares(createLugaresInput: $createLugaresInput) {
      id
    }
  }
`;
