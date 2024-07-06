import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CharacterData } from '@/character/types';

export interface Characterstate {
  starredCharacters: CharacterData[];

  isCharacterStarred: (id: string) => boolean;
  addCharacter: (data: CharacterData) => void;
  removeCharacter: (id: string) => void;
}

const defaultState: Omit<
  Characterstate,
  'addCharacter' | 'removeCharacter' | 'isCharacterStarred'
> = {
  starredCharacters: [],
};

const storeApi: StateCreator<Characterstate> = (set, get) => ({
  ...defaultState,

  isCharacterStarred: (id) =>
    Boolean(get().starredCharacters.find((c) => c.id === id)),

  addCharacter: (data) => {
    set({
      starredCharacters: [...get().starredCharacters, { ...data }],
    });
  },
  removeCharacter: (id) => {
    set({
      starredCharacters: get().starredCharacters.filter((c) => c.id !== id),
    });
  },
});

const useCharacterStore = create<Characterstate>()(
  persist(storeApi, { name: 'chracterStore', skipHydration: true })
);

export default useCharacterStore;
