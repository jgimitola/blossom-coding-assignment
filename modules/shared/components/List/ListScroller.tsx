import { forwardRef, HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

interface ListScrollerProps extends HTMLProps<HTMLUListElement> {}

const scrollerClassName = cva(['overflow-y-auto']);

const ListScroller = forwardRef<HTMLUListElement, ListScrollerProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <figcaption
        ref={ref}
        className={scrollerClassName({ className })}
        {...rest}
      />
    );
  }
);
ListScroller.displayName = 'ListContainer';

export default ListScroller;
