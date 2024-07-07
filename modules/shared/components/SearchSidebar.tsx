import {
  useCallback,
  useEffect,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
} from 'react';

import debounce from 'lodash/debounce';

import { cva } from 'class-variance-authority';

import * as Popover from '@radix-ui/react-popover';

import { useQuery } from '@apollo/client';

import FiltersPanel from '@/character/components/FiltersPanel';
import ResultCharacterList from '@/character/components/ResultCharacterList';
import StarrredCharacterList from '@/character/components/StarrredCharacterList';
import useParseCharacters from '@/character/hooks/useParseCharacters';
import GET_CHARACTERS_QUERY from '@/character/queries/GET_CHARACTERS';
import useCharacterStore from '@/character/zustand/characterStore';

import Searchbar from './Searchbar';

const containerClasses = cva([
  'flex',
  'flex-col',
  'h-full',
  'w-full',
  'p-6',
  'md:p-4',
  'pt-[2.625rem]',
  'md:pt-[2.625rem]',
  'md:w-[23.4375rem]',
]);

const headerClasses = cva(['shrink-0', 'pb-4']);

const titleClasses = cva([
  'text-2xl',
  'font-bold',
  'mb-6',
  'px-2',
  'text-pagetTitle',
]);

const SearchSidebar = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filters = useCharacterStore((store) => store.filters);
  const updateNameFilter = useCharacterStore((store) => store.updateNameFilter);

  const starredCharacters = useCharacterStore(
    (store) => store.starredCharacters
  );

  const query = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page: 0, ...filters },
  });

  const characters = useParseCharacters(query.data?.characters?.results);

  const handleFilterPanelOpen: MouseEventHandler<HTMLButtonElement> = () => {
    setIsFiltersOpen((p) => !p);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      updateNameFilter(value);
    }, 500),
    []
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <aside className={containerClasses()}>
      <div className={headerClasses()}>
        <h2 className={titleClasses()}>Rick and Morty List</h2>

        <Popover.Root open={isFiltersOpen}>
          <Popover.Anchor asChild>
            <Searchbar
              handleFilterOpen={handleFilterPanelOpen}
              onChange={handleSearch}
            />
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              className="md:w-[calc(23.4375rem-2rem)] w-[calc(100vw-2rem)]"
              sideOffset={8}
              onInteractOutside={() => setIsFiltersOpen(false)}
            >
              <FiltersPanel />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {starredCharacters.length > 0 && (
        <StarrredCharacterList characters={characters} />
      )}

      <ResultCharacterList characters={characters} />
    </aside>
  );
};

export default SearchSidebar;
