import * as Dialog from '@radix-ui/react-dialog';

import { cva } from 'class-variance-authority';

import LeftArrowIcon from '@/shared/components/LeftArrowIcon';

import ListFilters from './ListFilters';

interface FiltersDrawerPanelProps {
  handleClose: () => void;
}

const containerClasses = cva([
  'rounded-t-xl',
  'bg-white',
  'h-[calc(100%-2rem)]',
  'p-4',
  'flex',
  'flex-col',
]);

const FiltersDrawerPanel = (props: FiltersDrawerPanelProps) => {
  const { handleClose } = props;

  return (
    <div className={containerClasses()}>
      <div className="flex py-2 mb-10">
        <Dialog.Close asChild>
          <button
            className="w-6 h-6 text-primary.600"
            aria-label="Close"
            onClick={handleClose}
          >
            <LeftArrowIcon />
          </button>
        </Dialog.Close>

        <Dialog.Title className="mx-auto text-base font-semibold text-titles">
          Filters
        </Dialog.Title>
      </div>

      <ListFilters renderedOnDrawer />
    </div>
  );
};

export default FiltersDrawerPanel;
