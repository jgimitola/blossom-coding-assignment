import { type MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import { CharacterData } from '@/character/types';

import Avatar from '@/shared/components/Avatar';
import FilledHeartIcon from '@/shared/components/FilledHeartIcon';
import OutlinedHeartIcon from '@/shared/components/OutlinedHeartIcon';

interface CharacterCardProps {
  characterData: CharacterData;
  isStarred?: boolean;
  isSelected?: boolean;

  handleClick?: MouseEventHandler<HTMLLIElement>;
  handleToggle?: MouseEventHandler<HTMLButtonElement>;
}

const containerClasses = cva(
  [
    'relative',
    'flex',
    'gap-4',
    'py-4',
    'px-5',
    'items-center',
    'rounded-lg',
    'cursor-pointer',
  ],
  {
    variants: {
      state: { unselected: ['bg-white'], selected: ['bg-primary.100'] },
    },
    defaultVariants: {
      state: 'unselected',
    },
  }
);

const nameClasses = cva([
  'text-base',
  'font-semibold',
  'text-titles',

  'max-w-[20ch]',
  'text-ellipsis',
  'whitespace-nowrap',
  'overflow-hidden',
]);

const speciesClasses = cva(['text-base', 'font-normal', 'text-label']);

const actionClasses = cva(['shrink-0', 'ms-auto', 'my-auto']);

const buttonClasses = cva(
  [
    'font-medium',
    'rounded-full',
    'text-sm',
    'p-1',
    'text-center',
    'inline-flex',
    'items-center',
    'w-8',
    'h-8',
    'bg-white',
  ],
  {
    variants: {
      state: {
        unstarred: ['text-disabled'],
        starred: ['text-secondary.600'],
      },
    },
    defaultVariants: {
      state: 'unstarred',
    },
  }
);

const CharacterCard = (props: CharacterCardProps) => {
  const {
    characterData,
    isStarred = false,
    isSelected = true,
    handleClick,
    handleToggle,
  } = props;

  return (
    <li
      className={containerClasses({
        state: isSelected ? 'selected' : 'unselected',
      })}
      onClick={handleClick}
    >
      <hr className="absolute top-0 left-5 right-5" />

      <Avatar
        src={characterData.image}
        alt={`${characterData.name} profile image`}
      />

      <div>
        <p className={nameClasses()}>{characterData.name}</p>
        <p className={speciesClasses()}>{characterData.species}</p>
      </div>

      <div className={actionClasses()}>
        <button
          type="button"
          className={buttonClasses({
            state: isStarred ? 'starred' : 'unstarred',
          })}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle?.(e);
          }}
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
