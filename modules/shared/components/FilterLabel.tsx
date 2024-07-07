import { type HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

const labelClasses = cva(['text-sm', 'font-medium', 'text-label']);

interface FilterOptionProps extends HTMLProps<HTMLSpanElement> {}

const FilterLabel = (props: FilterOptionProps) => {
  const { className, ...rest } = props;

  return <span className={labelClasses({ className })} {...rest} />;
};

export default FilterLabel;
