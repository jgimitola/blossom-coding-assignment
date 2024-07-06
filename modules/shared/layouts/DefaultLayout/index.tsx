import { type ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;

  return <div>Hola</div>;
};

export default DefaultLayout;
