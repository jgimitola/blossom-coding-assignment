import parseCharacter from '../lib/parseCharacter';

const useParseCharacter = (character: unknown) => {
  const parsedCharacter = parseCharacter(character);

  return parsedCharacter;
};

export default useParseCharacter;
