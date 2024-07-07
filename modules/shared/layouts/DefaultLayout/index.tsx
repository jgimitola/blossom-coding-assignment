import { type ReactNode } from 'react';

import { useRouter } from 'next/router';

import { useMediaQuery } from 'usehooks-ts';

import SearchSidebar from '@/shared/components/SearchSidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;

  const router = useRouter();
  const path = router.pathname;
  const isCharacterRoute = path.startsWith('/character');

  const matchesMd = useMediaQuery('(max-width: 768px)');

  const showChildren = !matchesMd || isCharacterRoute;

  const showSidebar = !matchesMd || !isCharacterRoute;

  return (
    <div className="flex h-full isolate">
      {showSidebar && <SearchSidebar />}

      {showChildren && (
        <div className="h-full grow md:shadow-md ">{children}</div>
      )}
    </div>
  );
};

export default DefaultLayout;
