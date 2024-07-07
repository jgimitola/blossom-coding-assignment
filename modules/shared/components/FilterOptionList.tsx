import { type HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

const listClasses = cva(['flex', 'gap-2', 'mt-2']);

interface FilterOptionListProps extends HTMLProps<HTMLDivElement> {}

const FilterOptionList = (props: FilterOptionListProps) => {
  const { className, ...rest } = props;

  return <div className={listClasses({ className })} {...rest} />;
};

export default FilterOptionList;
