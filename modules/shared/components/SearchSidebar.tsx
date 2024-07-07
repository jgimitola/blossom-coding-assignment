import {
  useCallback,
  useEffect,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
} from 'react';

import { useMediaQuery } from 'usehooks-ts';

import debounce from 'lodash/debounce';

import { cva } from 'class-variance-authority';

import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';

import { useQuery } from '@apollo/client';

import FiltersDrawerPanel from '@/character/components/FiltersDrawerPanel';
import FiltersPopoverPanel from '@/character/components/FiltersPopoverPanel';
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
  const matchesMd = useMediaQuery('(max-width: 768px)');

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const handleClose = () => setIsFiltersOpen(false);

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

        {!matchesMd && (
          <Popover.Root open={isFiltersOpen}>
            <Popover.Anchor asChild>
              <Searchbar
                defaultValue={filters.name}
                handleFilterOpen={handleFilterPanelOpen}
                onChange={handleSearch}
              />
            </Popover.Anchor>

            <Popover.Portal>
              <Popover.Content
                className="md:w-[calc(23.4375rem-2rem)] w-[calc(100vw-2rem)]"
                sideOffset={8}
                onInteractOutside={handleClose}
              >
                <FiltersPopoverPanel />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}

        {matchesMd && (
          <>
            <Searchbar
              defaultValue={filters.name}
              handleFilterOpen={handleFilterPanelOpen}
              onChange={handleSearch}
            />

            <Dialog.Root open={isFiltersOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-slate-500 bg-opacity-80" />
                <Dialog.Content
                  className="fixed top-8 bottom-0 w-full h-full"
                  onInteractOutside={handleClose}
                >
                  <FiltersDrawerPanel handleClose={handleClose} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </>
        )}
      </div>

      {starredCharacters.length > 0 && (
        <StarrredCharacterList characters={characters} />
      )}

      <ResultCharacterList characters={characters} />
    </aside>
  );
};

export default SearchSidebar;
