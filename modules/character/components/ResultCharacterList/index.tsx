import { useRouter } from 'next/router';

import CharacterCard from '@/character/components/CharacterCard';
import { CharacterData } from '@/character/types';
import useCharacterStore from '@/character/zustand/characterStore';

import ListContainer from '@/shared/components/List/ListContainer';
import ListLabel from '@/shared/components/List/ListLabel';
import ListScroller from '@/shared/components/List/ListScroller';

interface ResultCharacterListProps {
  characters: CharacterData[];
}

const ResultCharacterList = (props: ResultCharacterListProps) => {
  const { characters } = props;

  const router = useRouter();

  const selectCharacter = useCharacterStore((store) => store.selectCharacter);

  const toggleCharacter = useCharacterStore((store) => store.toggleCharacter);

  const isCharacterSelected = useCharacterStore(
    (store) => store.isCharacterSelected
  );

  const isCharacterStarred = useCharacterStore(
    (store) => store.isCharacterStarred
  );

  const displayedCharacters = characters.filter(
    (c) => !isCharacterStarred(c.id)
  );

  const handleClick = (characterData: CharacterData) => {
    selectCharacter(characterData);

    router.replace(`/character/${characterData.id}`);
  };

  return (
    <ListContainer>
      <ListLabel>Characters ({displayedCharacters.length})</ListLabel>
      <ListScroller className="overflow-y-auto">
        {displayedCharacters.map((c) => {
          return (
            <CharacterCard
              key={c.id}
              isSelected={isCharacterSelected(c.id)}
              characterData={c}
              handleClick={() => handleClick(c)}
              handleToggle={() => toggleCharacter(c)}
            />
          );
        })}
      </ListScroller>
    </ListContainer>
  );
};

export default ResultCharacterList;
