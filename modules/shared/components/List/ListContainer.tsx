import { forwardRef, type HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

interface ListContainerProps extends HTMLProps<HTMLElement> {}

const containerClassName = cva(['flex', 'flex-col', 'overflow-y-auto']);

const ListContainer = forwardRef<HTMLElement, ListContainerProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <figure
        ref={ref}
        className={containerClassName({ className })}
        {...rest}
      />
    );
  }
);
ListContainer.displayName = 'ListContainer';

export default ListContainer;
