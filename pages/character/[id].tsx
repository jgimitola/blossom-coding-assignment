import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';

import CharacterProfile from '@/character/components/CharacterProfile';
import GET_CHARACTER_BY_ID from '@/character/queries/GET_CHARACTER_BY_ID';

const CharacterProfileId = () => {
  const router = useRouter();

  const query = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id: router.query.id }, // TODO: Get Id From getServerSideProps
  });

  // TODO: parse object to work with the correct type
  const character = query.data?.character;

  if (!character) return null;

  return (
    <main className="h-full">
      <CharacterProfile character={character} />
    </main>
  );
};

export default CharacterProfileId;
