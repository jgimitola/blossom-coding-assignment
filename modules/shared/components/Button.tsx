import { cva } from 'class-variance-authority';
import { HTMLProps } from 'react';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  type?: 'submit' | 'reset' | 'button';
}

const buttonClasses = cva([
  'w-full',
  'rounded-lg',
  ' py-2',
  'bg-primary.600',
  'text-white',
  'text-sm',
  'font-medium',
  'hover:bg-primary.700',
  'disabled:bg-search',
  'disabled:text-label',
]);

const Button = (props: ButtonProps) => {
  const { className, ...rest } = props;

  return <button className={buttonClasses({ className })} {...rest} />;
};

export default Button;
