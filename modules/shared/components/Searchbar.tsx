import MagnifierIcon from './MagnifierIcon';
import MixerVerticalIcon from './MixerVerticalIcon';

const Searchbar = () => {
  return (
    <div className="flex items-center gap-2 rounded-lg x-2 w-full bg-search px-3 py-2">
      <div className="shrink-0 w-5 h-5 text-magnifier">
        <MagnifierIcon />
      </div>

      <input
        type="text"
        className="flex bg-transparent outline-0 text-sm font-medium w-full"
        placeholder="Search or filter results"
      />

      <button className="shrink-0 w-9 h-9 p-2 rounded-lg ms-auto cursor-pointer bg-primary.100 text-primary.700">
        <MixerVerticalIcon />
      </button>
    </div>
  );
};

export default Searchbar;
