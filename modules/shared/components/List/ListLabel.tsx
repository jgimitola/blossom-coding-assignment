import { forwardRef, type HTMLProps } from 'react';

import { cva } from 'class-variance-authority';

interface ListLabelProps extends HTMLProps<HTMLElement> {}

const labelClassName = cva([
  'shrink-0',
  'p-4',
  'uppercase',
  'text-xs',
  'text-label',
  'font-semibold',
]);

const ListLabel = forwardRef<HTMLElement, ListLabelProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <figcaption ref={ref} className={labelClassName({ className })} {...rest} />
  );
});
ListLabel.displayName = 'ListLabel';

export default ListLabel;
