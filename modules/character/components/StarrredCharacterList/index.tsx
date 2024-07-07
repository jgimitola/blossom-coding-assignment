import CharacterCard from '@/character/components/CharacterCard';
import useManageCharacterStore from '@/character/hooks/useManageCharacterStore';
import { CharacterData } from '@/character/types';

import ListContainer from '@/shared/components/List/ListContainer';
import ListLabel from '@/shared/components/List/ListLabel';
import ListScroller from '@/shared/components/List/ListScroller';

interface ResultCharacterListProps {
  characters: CharacterData[];
}

const StarrredCharacterList = (props: ResultCharacterListProps) => {
  const { characters } = props;

  const {
    filterNumber,
    starredCharacters,
    isCharacterSelected,
    toggleCharacter,
    handleCharacterCard,
  } = useManageCharacterStore();

  return (
    <ListContainer className="shrink-0 max-h-[20rem]">
      <ListLabel>
        {filterNumber() > 0 ? (
          <>
            {characters.length} Results {filterNumber} Filter
          </>
        ) : (
          <>Starred Characters ({starredCharacters.length})</>
        )}
      </ListLabel>
      <ListScroller>
        {starredCharacters.map((c) => (
          <CharacterCard
            key={c.id}
            isStarred
            isSelected={isCharacterSelected(c.id)}
            characterData={c}
            handleClick={() => handleCharacterCard(c)}
            handleToggle={() => toggleCharacter(c)}
          />
        ))}
      </ListScroller>
    </ListContainer>
  );
};

export default StarrredCharacterList;
