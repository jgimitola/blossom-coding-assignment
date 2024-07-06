import { cva } from 'class-variance-authority';

import capitalize from 'lodash/capitalize';

import type { CharacterData } from '@/character/types';

import Avatar from '@/shared/components/Avatar';

interface CharacterProfileProps {
  character: CharacterData;
}

const containerClasses = cva(['md:px-28', 'px-16', 'pt-10']);

const CharacterProfile = (props: CharacterProfileProps) => {
  const { character } = props;

  return (
    <section className={containerClasses()}>
      <div>
        <Avatar src={character.image} className="w-[4.6875rem] h-[4.6875rem]" />
        <h1 className="font-bold">{character.name}</h1>
      </div>

      <dl>
        <div>
          <dt className="font-semibold">Specie</dt>
          <dd>{capitalize(character.species)}</dd>
        </div>

        <div>
          <dt className="font-semibold">Status</dt>
          <dd>{capitalize(character.status)}</dd>
        </div>

        <div>
          <dt className="font-semibold">Gender</dt>
          <dd>{capitalize(character.gender)}</dd>
        </div>
      </dl>
    </section>
  );
};

export default CharacterProfile;
