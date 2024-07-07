import { useRouter } from 'next/router';

import { CharacterData } from '../types';
import useCharacterStore from '../zustand/characterStore';

const useManageCharacterStore = () => {
  const router = useRouter();

  const filters = useCharacterStore((store) => store.filters);
  const filterNumber = Object.entries(filters)
    .map(([key, value]) => value)
    .reduce((p, c) => p + (!!c ? 1 : 0), 0);

  const starredCharacters = useCharacterStore(
    (store) => store.starredCharacters
  );

  const isCharacterStarred = useCharacterStore(
    (store) => store.isCharacterStarred
  );

  const isCharacterSelected = useCharacterStore(
    (store) => store.isCharacterSelected
  );

  const selectCharacter = useCharacterStore((store) => store.selectCharacter);

  const toggleCharacter = useCharacterStore((store) => store.toggleCharacter);

  const handleCharacterCard = (characterData: CharacterData) => {
    selectCharacter(characterData);

    router.replace(`/character/${characterData.id}`);
  };

  return {
    filters,
    filterNumber,
    starredCharacters,
    isCharacterSelected,
    isCharacterStarred,
    selectCharacter,
    toggleCharacter,
    handleCharacterCard,
  };
};

export default useManageCharacterStore;
