import { gql } from '@apollo/client';
import { EscolaFragment, LugaresFragment } from './fragments';

export const ESCOLAS = gql`
  query ESCOLAS($page: Int, $perPage: Int) {
    escolas(page: $page, perPage: $perPage) {
      items {
        ...EscolaFragment
      }
      numberOfPages
    }
  }
  ${EscolaFragment}
`;

export const LUGARES = gql`
  query LUGARES($page: Int, $perPage: Int) {
    lugares(page: $page, perPage: $perPage) {
      items {
        ...LugaresFragment
        padre {
          nombre
        }
      }
      numberOfPages
    }
  }
  ${LugaresFragment}
`;
