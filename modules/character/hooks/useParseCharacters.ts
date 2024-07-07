import parseCharacters from '../lib/parseCharacters';

const useParseCharacters = (characters: unknown) => {
  const parsedCharacters = parseCharacters(characters);

  return parsedCharacters;
};

export default useParseCharacters;
