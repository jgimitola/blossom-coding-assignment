import CharacterCard from '@/character/components/CharacterCard';
import useManageCharacterStore from '@/character/hooks/useManageCharacterStore';
import { CharacterData } from '@/character/types';

import ListContainer from '@/shared/components/List/ListContainer';
import ListLabel from '@/shared/components/List/ListLabel';
import ListScroller from '@/shared/components/List/ListScroller';

interface ResultCharacterListProps {
  characters: CharacterData[];
}

const ResultCharacterList = (props: ResultCharacterListProps) => {
  const { characters } = props;

  const {
    isCharacterSelected,
    isCharacterStarred,
    toggleCharacter,
    handleCharacterCard,
  } = useManageCharacterStore();

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
              isSelected={isCharacterSelected(c.id)}
              characterData={c}
              handleClick={() => handleCharacterCard(c)}
              handleToggle={() => toggleCharacter(c)}
            />
          );
        })}
      </ListScroller>
    </ListContainer>
  );
};

export default ResultCharacterList;
