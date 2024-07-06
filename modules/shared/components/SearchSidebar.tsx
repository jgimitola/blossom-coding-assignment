import { cva } from 'class-variance-authority';

import { useQuery } from '@apollo/client';

import ResultCharacterList from '@/character/components/ResultCharacterList';
import StarrredCharacterList from '@/character/components/StarrredCharacterList';
import useParseCharacters from '@/character/hooks/useParseCharacters';
import GET_CHARACTERS_QUERY from '@/character/queries/GET_CHARACTERS';
import useCharacterStore from '@/character/zustand/characterStore';

import Searchbar from './Searchbar';

const containerClasses = cva([
  'flex-col',
  'h-full',
  'w-[23.4375rem]',
  'p-4',
  'pt-[2.625rem]',
]);

const headerClasses = cva(['shrink-0', 'pb-4']);

const titleClasses = cva(['text-2xl', 'font-bold', 'mb-6', 'px-2']);

const SearchSidebar = () => {
  const filters = useCharacterStore((store) => store.filters);

  const starredCharacters = useCharacterStore(
    (store) => store.starredCharacters
  );

  const query = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page: 0, ...filters },
  });

  const characters = useParseCharacters(query.data?.characters?.results);

  return (
    <aside className={containerClasses()}>
      <div className={headerClasses()}>
        <h2 className={titleClasses()}>Rick and Morty List</h2>

        <Searchbar />
      </div>

      {starredCharacters.length > 0 && (
        <StarrredCharacterList characters={characters} />
      )}

      <ResultCharacterList characters={characters} />
    </aside>
  );
};

export default SearchSidebar;
