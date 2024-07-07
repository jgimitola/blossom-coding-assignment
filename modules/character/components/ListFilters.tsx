import { useState } from 'react';

import { cva } from 'class-variance-authority';

import isEqual from 'lodash/isEqual';

import { CharacterFilters } from '@/character/types';
import useCharacterStore from '@/character/zustand/characterStore';

import Button from '@/shared/components/Button';
import FilterContainer from '@/shared/components/FilterContainer';
import FilterLabel from '@/shared/components/FilterLabel';
import FilterOption from '@/shared/components/FilterOption';
import FilterOptionList from '@/shared/components/FilterOptionList';

import availableFilters from '../lib/availableFilters';

interface ListFiltersProps {
  renderedOnDrawer?: boolean;
}

const buttonClasses = cva([''], {
  variants: {
    state: {
      popover: [],
      drawer: ['mt-auto'],
    },
  },
});

const ListFilters = (props: ListFiltersProps) => {
  const { renderedOnDrawer = false } = props;

  const filters = useCharacterStore((store) => store.filters);
  const updateFilters = useCharacterStore((store) => store.updateFilters);

  const [localFilters, setLocalFilters] = useState<CharacterFilters>({
    ...filters,
  });

  const handleUpdateFilters = () => {
    updateFilters(localFilters);
  };

  return (
    <>
      {availableFilters.map((filter) => (
        <FilterContainer key={filter.id}>
          <FilterLabel>{filter.label}</FilterLabel>
          <FilterOptionList>
            {filter.options.map((option) => {
              const isSelected = localFilters[filter.path] === option.value;

              const handleSelect = () => {
                setLocalFilters((p) => ({ ...p, [filter.path]: option.value }));
              };

              return (
                <FilterOption
                  key={option.id}
                  selected={isSelected}
                  onClick={handleSelect}
                >
                  {option.label}
                </FilterOption>
              );
            })}
          </FilterOptionList>
        </FilterContainer>
      ))}

      <Button
        className={buttonClasses({
          state: renderedOnDrawer ? 'drawer' : 'popover',
        })}
        disabled={isEqual(localFilters, filters)}
        onClick={handleUpdateFilters}
      >
        Filter
      </Button>
    </>
  );
};

export default ListFilters;
