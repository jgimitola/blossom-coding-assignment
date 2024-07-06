import { z } from 'zod';
import characterDataSchema from '../schemas/characterDataSchema';

const useParseCharacters = (characters: unknown) => {
  if (!characters) return [];

  const result = z.array(characterDataSchema).safeParse(characters);

  if (result.error) {
    console.error(result.error);

    return [];
  }

  return result.data;
};

export default useParseCharacters;
