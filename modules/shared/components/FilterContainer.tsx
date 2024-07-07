import { type HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

const filterContainerClasses = cva(['mb-6']);

interface FilterOptionProps extends HTMLProps<HTMLDivElement> {}

const FilterContainer = (props: FilterOptionProps) => {
  const { className, ...rest } = props;

  return <div className={filterContainerClasses({ className })} {...rest} />;
};

export default FilterContainer;
