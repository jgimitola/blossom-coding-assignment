import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CharacterData, CharacterFilters } from '@/character/types';

export interface Characterstate {
  filters: CharacterFilters;
  selectedCharacter: CharacterData | null;
  starredCharacters: CharacterData[];

  updateNameFilter: (name: string) => void;
  updateFilters: (filters: CharacterFilters) => void;

  filterNumber: () => number;
  filteredStarred: () => CharacterData[];

  isCharacterSelected: (id: string) => boolean;
  isCharacterStarred: (id: string) => boolean;
  selectCharacter: (data: CharacterData) => void;
  toggleCharacter: (data: CharacterData) => void;
}

const defaultState: Omit<
  Characterstate,
  | 'toggleCharacter'
  | 'isCharacterStarred'
  | 'isCharacterSelected'
  | 'selectCharacter'
  | 'filterNumber'
  | 'updateFilters'
  | 'updateNameFilter'
  | 'filteredStarred'
> = {
  filters: {
    name: '',
    character: '',
    gender: '',
    species: '',
    status: '',
  },
  selectedCharacter: null,
  starredCharacters: [],
};

const storeApi: StateCreator<Characterstate> = (set, get) => ({
  ...defaultState,

  filteredStarred: () => {
    const filters = get().filters;

    const filteredData = get()
      .starredCharacters.filter((char) =>
        !!filters.status ? char.status === filters.status : true
      )
      .filter((char) =>
        !!filters.gender ? char.gender === filters.gender : true
      )
      .filter((char) =>
        !!filters.name
          ? char.name.toLowerCase().includes(filters.name.toLowerCase())
          : true
      );

    return filteredData;
  },

  updateNameFilter: (name) => {
    set({ filters: { ...get().filters, name } });
  },

  updateFilters: (filters) => {
    set({ filters });
  },

  filterNumber: () =>
    Object.entries(get().filters)
      .map(([_, value]) => value)
      .reduce((p, c) => p + (!!c ? 1 : 0), 0),

  isCharacterSelected: (id) => {
    const currentCharacter = get().selectedCharacter;

    if (!currentCharacter) return false;

    return currentCharacter.id === id;
  },

  isCharacterStarred: (id) =>
    Boolean(get().starredCharacters.find((c) => c.id === id)),

  selectCharacter: (data) => {
    set({
      selectedCharacter: data,
    });
  },

  toggleCharacter: (data) => {
    if (get().isCharacterStarred(data.id)) {
      set({
        starredCharacters: get().starredCharacters.filter(
          (c) => c.id !== data.id
        ),
      });

      return;
    }

    set({
      starredCharacters: [...get().starredCharacters, { ...data }],
    });
  },
});

const useCharacterStore = create<Characterstate>()(
  persist(storeApi, { name: 'chracterStore', skipHydration: true })
);

export default useCharacterStore;
