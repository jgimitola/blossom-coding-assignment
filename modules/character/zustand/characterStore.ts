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
  starredCharacters: CharacterData[];

  isCharacterStarred: (id: string) => boolean;
  toggleCharacter: (data: CharacterData) => void;
}

const defaultState: Omit<
  Characterstate,
  'toggleCharacter' | 'isCharacterStarred'
> = {
  filters: {
    gender: '',
    species: '',
    status: '',
  },
  starredCharacters: [],
};

const storeApi: StateCreator<Characterstate> = (set, get) => ({
  ...defaultState,

  isCharacterStarred: (id) =>
    Boolean(get().starredCharacters.find((c) => c.id === id)),

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
