import { useState } from 'react';

import isEqual from 'lodash/isEqual';

import { cva } from 'class-variance-authority';

import { CharacterFilters } from '@/character/types';
import useCharacterStore from '@/character/zustand/characterStore';

import Button from '@/shared/components/Button';
import FilterContainer from '@/shared/components/FilterContainer';
import FilterLabel from '@/shared/components/FilterLabel';
import FilterOption from '@/shared/components/FilterOption';
import FilterOptionList from '@/shared/components/FilterOptionList';

import availableFilters from '../lib/availableFilters';

interface FiltersPanelProps {}

const containerClasses = cva([
  'p-6',
  'rounded-md',
  'bg-white',
  'shadow-lg',
  'w-full',
  'border-[1px]',
]);

const FiltersPanel = (props: FiltersPanelProps) => {
  const {} = props;

  const filters = useCharacterStore((store) => store.filters);
  const updateFilters = useCharacterStore((store) => store.updateFilters);

  const [localFilters, setLocalFilters] = useState<CharacterFilters>({
    ...filters,
  });

  const handleUpdateFilters = () => {
    updateFilters(localFilters);
  };

  return (
    <div className={containerClasses()}>
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
        disabled={isEqual(localFilters, filters)}
        onClick={handleUpdateFilters}
      >
        Filter
      </Button>
    </div>
  );
};

export default FiltersPanel;
