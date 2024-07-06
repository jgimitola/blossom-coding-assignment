import { gql } from '@/__generated__';

const GET_CHARACTER_BY_ID = gql(`
  query GET_CHARACTER_BY_ID($id: ID!) {
    character(id: $id) {
    id
    name
    status
    species
    gender
    image
  }
  }`);

export default GET_CHARACTER_BY_ID;
