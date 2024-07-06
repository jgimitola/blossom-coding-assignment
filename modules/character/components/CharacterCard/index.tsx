import { type MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import { CharacterData } from '@/character/types';

import Avatar from '@/shared/components/Avatar';
import FilledHeartIcon from '@/shared/components/FilledHeartIcon';
import OutlinedHeartIcon from '@/shared/components/OutlinedHeartIcon';

interface CharacterCardProps {
  characterData: CharacterData;
  isStarred?: boolean;

  handleToggle?: MouseEventHandler<HTMLButtonElement>;
}

const containerClasses = cva(['flex', 'gap-4', 'py-4', 'px-5', 'items-center']);

const actionClasses = cva(['shrink-0', 'ms-auto', 'my-auto']);

const buttonClasses = cva([
  'font-medium',
  'rounded-full',
  'text-sm',
  'p-1',
  'text-center',
  'inline-flex',
  'items-center',
  'w-8',
  'h-8',
]);

const CharacterCard = (props: CharacterCardProps) => {
  const { characterData, isStarred = false, handleToggle } = props;

  return (
    <li className={containerClasses()}>
      <Avatar
        src={characterData.image}
        alt={`${characterData.name} profile image`}
      />

      <div>
        <p>{characterData.name}</p>
        <p>{characterData.species}</p>
      </div>

      <div className={actionClasses()}>
        <button
          type="button"
          className={buttonClasses()}
          onClick={handleToggle}
        >
          {isStarred ? (
            <>
              <FilledHeartIcon />
              <span className="sr-only fixed">Filled Heart Icon</span>
            </>
          ) : (
            <>
              <OutlinedHeartIcon />
              <span className="sr-only fixed">Outlined Heart Icon</span>
            </>
          )}
        </button>
      </div>
    </li>
  );
};

export default CharacterCard;