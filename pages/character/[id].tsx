import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { z } from 'zod';

import CharacterProfile from '@/character/components/CharacterProfile';
import parseCharacter from '@/character/lib/parseCharacter';
import GET_CHARACTER_BY_ID from '@/character/queries/GET_CHARACTER_BY_ID';

import createApolloClient from '@/shared/lib/apolloClient';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const idResult = z.string().safeParse(ctx.params?.id);

  if (idResult.error) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }

  const id = idResult.data;

  const client = createApolloClient();

  const { data } = await client.query({
    query: GET_CHARACTER_BY_ID,
    variables: { id },
  });

  const character = parseCharacter(data.character);

  if (!character)
    return {
      redirect: { destination: '/', permanent: false },
    };

  return { props: { character } };
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const CharacterProfileId = (props: PageProps) => {
  const { character } = props;

  return (
    <main className="h-full">
      <CharacterProfile character={character} />
    </main>
  );
};

export default CharacterProfileId;
