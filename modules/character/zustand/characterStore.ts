import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  CharacterData,
  CharacterGender,
  CharacterStatus,
} from '@/character/types';

export interface Characterstate {
  filters: {
    gender: CharacterGender | '';
    species: string;
    status: CharacterStatus | '';
  };
  selectedCharacter: CharacterData | null;
  starredCharacters: CharacterData[];

  filterNumber: () => number;
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
> = {
  filters: {
    gender: '',
    species: '',
    status: '',
  },
  selectedCharacter: null,
  starredCharacters: [],
};

const storeApi: StateCreator<Characterstate> = (set, get) => ({
  ...defaultState,

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
