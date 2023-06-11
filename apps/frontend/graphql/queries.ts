import { gql } from '@apollo/client';
import { EscolaFragment } from './fragments';

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
