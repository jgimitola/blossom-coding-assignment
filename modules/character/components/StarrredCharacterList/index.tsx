import CharacterCard from '@/character/components/CharacterCard';
import { CharacterData } from '@/character/types';
import useCharacterStore from '@/character/zustand/characterStore';

import ListContainer from '@/shared/components/List/ListContainer';
import ListLabel from '@/shared/components/List/ListLabel';
import ListScroller from '@/shared/components/List/ListScroller';

interface ResultCharacterListProps {
  characters: CharacterData[];
}

const StarrredCharacterList = (props: ResultCharacterListProps) => {
  const { characters } = props;

  const filters = useCharacterStore((store) => store.filters);
  const filterNumber = Object.entries(filters)
    .map(([key, value]) => value)
    .reduce((p, c) => p + (!!c ? 1 : 0), 0);

  const starredCharacters = useCharacterStore(
    (store) => store.starredCharacters
  );

  const toggleCharacter = useCharacterStore((store) => store.toggleCharacter);

  return (
    <ListContainer>
      <ListLabel>
        {filterNumber > 0 ? (
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
            characterData={c}
            handleStar={() => toggleCharacter(c)}
          />
        ))}
      </ListScroller>
    </ListContainer>
  );
};

export default StarrredCharacterList;
