import { gql } from '@/__generated__';

const GET_CHARACTERS_QUERY = gql(`
  query GET_CHARACTERS($page: Int!, $name: String!, $status: String!, $species: String!, $gender: String!) {
    characters(page: $page, filter: {name: $name, status: $status, species: $species, gender: $gender}) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }`);

export default GET_CHARACTERS_QUERY;
