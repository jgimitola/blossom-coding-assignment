import { type ReactNode } from 'react';

import SearchSidebar from '@/shared/components/SearchSidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;

  return (
    <div className="flex h-full">
      <SearchSidebar />

      <div className="h-full grow">{children}</div>
    </div>
  );
};

export default DefaultLayout;
