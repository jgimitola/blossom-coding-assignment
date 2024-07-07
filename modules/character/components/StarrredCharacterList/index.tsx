import CharacterCard from '@/character/components/CharacterCard';
import useManageCharacterStore from '@/character/hooks/useManageCharacterStore';
import { CharacterData } from '@/character/types';
import useCharacterStore from '@/character/zustand/characterStore';

import ListContainer from '@/shared/components/List/ListContainer';
import ListLabel from '@/shared/components/List/ListLabel';
import ListScroller from '@/shared/components/List/ListScroller';
import PillBadge from '@/shared/components/PillBadge';

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

  const filteredStarred = useCharacterStore((store) => store.filteredStarred);
  const visibleStarred = filteredStarred();

  return (
    <ListContainer className="shrink-0 max-h-[20rem]">
      <ListLabel>
        {filterNumber() > 0 ? (
          <div className="flex items-center">
            <span className="text-accent capitalize">
              {characters.length} Results
            </span>
            <PillBadge className="ml-auto">{filterNumber()} Filter</PillBadge>
          </div>
        ) : (
          <>Starred Characters ({starredCharacters.length})</>
        )}
      </ListLabel>
      <ListScroller>
        {visibleStarred.map((c) => (
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
