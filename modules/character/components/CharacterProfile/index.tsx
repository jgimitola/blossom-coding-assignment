import Link from 'next/link';

import { cva } from 'class-variance-authority';

import capitalize from 'lodash/capitalize';

import type { CharacterData } from '@/character/types';
import useCharacterStore from '@/character/zustand/characterStore';

import Avatar from '@/shared/components/Avatar';
import FilledHeartIcon from '@/shared/components/FilledHeartIcon';
import LeftArrowIcon from '@/shared/components/LeftArrowIcon';

interface CharacterProfileProps {
  character: CharacterData;
}

const containerClasses = cva(['px-6', 'md:px-12', 'md:pt-10', 'lg:px-28']);

const avatarWrapperClasses = cva(['relative', 'w-fit']);

const titleClasses = cva([
  'text-2xl',
  'font-bold',
  'text-titles',
  'mt-2',
  'mb-4',
]);

const definitionClasses = cva(['border-b-[1px]', 'py-4']);

const definitionLabelClasses = cva([
  'text-base',
  'text-titles',
  'font-semibold',
]);

const definitionValueClasses = cva(['text-base', 'text-label', 'font-medium']);

const buttonClasses = cva([
  'font-medium',
  'rounded-full',
  'text-sm',
  'p-1',
  'inline-flex',
  'items-center',
  'w-8',
  'h-8',
  'bg-white',
  'text-secondary.600',
  'absolute',
  'bottom-0',
  '-right-3',
]);

const CharacterProfile = (props: CharacterProfileProps) => {
  const { character } = props;

  // Call without use to force re-render when array values change
  useCharacterStore((store) => store.starredCharacters);

  const isCharacterStarred = useCharacterStore(
    (store) => store.isCharacterStarred
  );

  return (
    <section className={containerClasses()}>
      <div className="p-4 pl-0 md:hidden">
        <Link href="/" className="block h-9 w-9 p-1 text-primary.600">
          <LeftArrowIcon />
        </Link>
      </div>

      <div>
        <div className={avatarWrapperClasses()}>
          <Avatar
            src={character.image}
            className="w-[4.6875rem] h-[4.6875rem]"
          />
          {isCharacterStarred(character.id) && (
            <div className={buttonClasses()}>
              <FilledHeartIcon />
            </div>
          )}
        </div>
        <h1 className={titleClasses()}>{character.name}</h1>
      </div>
      <dl>
        <div className={definitionClasses()}>
          <dt className={definitionLabelClasses()}>Specie</dt>
          <dd className={definitionValueClasses()}>
            {capitalize(character.species)}
          </dd>
        </div>

        <div className={definitionClasses()}>
          <dt className={definitionLabelClasses()}>Status</dt>
          <dd className={definitionValueClasses()}>
            {capitalize(character.status)}
          </dd>
        </div>

        <div className={definitionClasses({ className: 'border-none' })}>
          <dt className={definitionLabelClasses()}>Gender</dt>
          <dd className={definitionValueClasses()}>
            {capitalize(character.gender)}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default CharacterProfile;
