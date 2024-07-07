import { type HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

const optionClasses = cva(
  [
    'flex-1',
    'rounded-lg',
    'border-[1px]',
    'px-[0.625rem]',
    'py-3',
    'text-sm',
    'font-semibold',
    'text-titles',
  ],
  {
    variants: {
      state: {
        unselected: [''],
        selected: ['text-primary.600', 'bg-primary.100'],
      },
    },
    defaultVariants: {
      state: 'unselected',
    },
  }
);

interface FilterOptionProps extends HTMLProps<HTMLButtonElement> {
  selected?: boolean;
}

const FilterOption = (props: FilterOptionProps) => {
  const { className, selected = false, ...rest } = props;

  return (
    <button
      className={optionClasses({
        className,
        state: selected ? 'selected' : 'unselected',
      })}
      {...rest}
      type="button"
    />
  );
};

export default FilterOption;
