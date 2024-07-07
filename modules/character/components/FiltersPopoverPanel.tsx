import { cva } from 'class-variance-authority';

import ListFilters from './ListFilters';

interface FiltersPopoverPanelProps {}

const containerClasses = cva([
  'p-6',
  'rounded-md',
  'bg-white',
  'shadow-lg',
  'w-full',
  'border-[1px]',
]);

const FiltersPopoverPanel = (props: FiltersPopoverPanelProps) => {
  const {} = props;

  return (
    <div className={containerClasses()}>
      <ListFilters />
    </div>
  );
};

export default FiltersPopoverPanel;
