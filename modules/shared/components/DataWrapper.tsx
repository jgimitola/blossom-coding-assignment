import { useEffect, useState, type ReactNode } from 'react';

import useCharacterStore from '@/character/zustand/characterStore';

interface DataWrapperProps {
  children: ReactNode;
}

const DataWrapper = (props: DataWrapperProps) => {
  const { children } = props;

  const [isStoreHydrationPending, setIsStoreHydrationPending] = useState(true);

  useEffect(() => {
    useCharacterStore.persist.onFinishHydration(() => {
      setIsStoreHydrationPending(false);
    });

    useCharacterStore.persist.rehydrate();
  }, []);

  const shouldDisplayLoading = isStoreHydrationPending;

  if (shouldDisplayLoading) return <>Loading...</>;

  return <>{children}</>;
};

export default DataWrapper;
