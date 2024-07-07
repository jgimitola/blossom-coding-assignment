import { v4 as uuid } from 'uuid';

import type { CharacterFilters } from '../types';

interface FilterBase {
  id: string;
  label: string;
}

interface AvailableFilter<T extends FilterBase> {
  id: string;
  label: string;
  path: keyof CharacterFilters;
  options: T[];
}

type CharacterOptions = FilterBase & { value: CharacterFilters['character'] };

type CharacterFilter = AvailableFilter<CharacterOptions>;

type StatusOptions = FilterBase & { value: CharacterFilters['status'] };

type StatusFilter = AvailableFilter<StatusOptions>;

type GenderOptions = FilterBase & { value: CharacterFilters['gender'] };

type GenderFilter = AvailableFilter<GenderOptions>;

type AvailableFilters = [CharacterFilter, StatusFilter, GenderFilter];

const availableFilters: AvailableFilters = [
  {
    id: uuid(),
    label: 'Character',
    path: 'character',
    options: [
      {
        id: uuid(),
        label: 'All',
        value: '',
      },
      {
        id: uuid(),
        label: 'Starred',
        value: 'starred',
      },
    ],
  },
  {
    id: uuid(),
    label: 'Status',
    path: 'status',
    options: [
      {
        id: uuid(),
        label: 'All',
        value: '',
      },
      {
        id: uuid(),
        label: 'Alive',
        value: 'alive',
      },
      {
        id: uuid(),
        label: 'Dead',
        value: 'dead',
      },
    ],
  },
  {
    id: uuid(),
    label: 'Gender',
    path: 'gender',
    options: [
      {
        id: uuid(),
        label: 'All',
        value: '',
      },
      {
        id: uuid(),
        label: 'Female',
        value: 'female',
      },
      {
        id: uuid(),
        label: 'Male',
        value: 'male',
      },
    ],
  },
];

export default availableFilters;
