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

  const toggleCharacter = useCharacterStore((store) => store.toggleCharacter);

  const isCharacterStarred = useCharacterStore(
    (store) => store.isCharacterStarred
  );

  const displayedCharacters = characters.filter(
    (c) => !isCharacterStarred(c.id)
  );

  return (
    <ListContainer>
      <ListLabel>Characters ({displayedCharacters.length})</ListLabel>
      <ListScroller className="overflow-y-auto">
        {displayedCharacters.map((c) => {
          return (
            <CharacterCard
              key={c.id}
              characterData={c}
              handleStar={() => toggleCharacter(c)}
            />
          );
        })}
      </ListScroller>
    </ListContainer>
  );
};

export default ResultCharacterList;
