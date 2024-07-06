import CharacterProfile from '@/character/components/CharacterProfile';
import type { CharacterData } from '@/character/types';

const myCharacter: CharacterData = {
  id: '-1',
  name: 'Jesus Imitola',
  status: 'alive',
  species: 'Human',
  gender: 'male',
  image: 'https://github.com/jgimitola.png',
};

export default function Home() {
  return (
    <main className="h-full">
      <CharacterProfile character={myCharacter} />
    </main>
  );
}
