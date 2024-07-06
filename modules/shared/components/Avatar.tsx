import Image from 'next/image';

import { cva } from 'class-variance-authority';

interface AvatarProps {
  className?: string;
  src: string;
  alt?: string;
}

const avatarClasses = cva([
  'w-8',
  'h-8',
  'rounded-full',
  'relative',
  'overflow-hidden',
]);

const Avatar = (props: AvatarProps) => {
  const { className, src, alt = '' } = props;

  return (
    <div className={avatarClasses({ className })}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default Avatar;
