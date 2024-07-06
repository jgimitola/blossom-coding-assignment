import { ChangeEventHandler, useState } from 'react';

import Image from 'next/image';

import { useQuery } from '@apollo/client';

import useParseCharacters from '@/character/hooks/useParseCharacters';
import GET_CHARACTERS_QUERY from '@/character/queries/GET_CHARACTERS';
import { CharacterGender, CharacterStatus } from '@/character/types';

interface Filters {
  gender: CharacterGender | '';
  species: string;
  status: CharacterStatus | '';
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    gender: '',
    species: '',
    status: '',
  });

  const query = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page: 0, ...filters },
  });

  const characters = useParseCharacters(query.data?.characters?.results);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilters((p) => ({ ...p, gender: event.target.value }));
  };

  return (
    <main className="text-lg">
      <input type="text" value={filters.gender} onChange={handleInput} />

      <hr></hr>

      {characters.map((c) => (
        <>
          <Image
            src={c.image}
            alt={`${c.name} profile image`}
            width={20}
            height={20}
          />
          <p key={c.id}>
            {c.name} ||
            {c.id} - {c.gender} - {c.species} - {c.status}
          </p>
        </>
      ))}
    </main>
  );
}
