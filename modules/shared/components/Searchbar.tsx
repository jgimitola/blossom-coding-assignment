import { forwardRef, type HTMLProps, type MouseEventHandler } from 'react';

import MagnifierIcon from './MagnifierIcon';
import MixerVerticalIcon from './MixerVerticalIcon';

interface SearchbarProps extends HTMLProps<HTMLInputElement> {
  handleFilterOpen?: MouseEventHandler<HTMLButtonElement>;
}

const Searchbar = forwardRef<HTMLDivElement, SearchbarProps>((props, ref) => {
  const { handleFilterOpen, ...rest } = props;

  return (
    <div
      ref={ref}
      className="flex items-center gap-2 rounded-lg x-2 w-full bg-search px-3 md:py-2"
    >
      <div className="shrink-0 w-5 h-5 text-magnifier">
        <MagnifierIcon />
      </div>

      <input
        type="text"
        className="flex bg-transparent outline-0 text-sm font-medium w-full"
        placeholder="Search or filter results"
        {...rest}
      />

      <button
        className="shrink-0 w-9 h-9 p-2 rounded-lg ms-auto cursor-pointer md:bg-primary.100 text-primary.700"
        onClick={handleFilterOpen}
      >
        <MixerVerticalIcon />
      </button>
    </div>
  );
});
Searchbar.displayName = 'Searchbar';

export default Searchbar;
