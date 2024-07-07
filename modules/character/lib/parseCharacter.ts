import characterDataSchema from '../schemas/characterDataSchema';

const parseCharacter = (character: unknown) => {
  if (!character) return null;

  const result = characterDataSchema.safeParse(character);

  if (result.error) {
    console.error(result.error);

    return null;
  }

  return result.data;
};

export default parseCharacter;
