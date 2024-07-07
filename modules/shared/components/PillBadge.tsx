import { cva } from 'class-variance-authority';
import { type HTMLProps } from 'react';

interface PillBadgeProps extends HTMLProps<HTMLSpanElement> {}

const badgeClasses = cva([
  'bg-secondary.600-20 text-secondary.700 text-sm font-semibold px-2.5 py-0.5 rounded-full ',
]);

const PillBadge = (props: PillBadgeProps) => {
  const { className, ...rest } = props;

  return <span className={badgeClasses({ className })} {...rest} />;
};

export default PillBadge;
