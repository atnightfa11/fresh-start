import { FC, useEffect, useState, PropsWithChildren } from 'react';

interface ClientOnlyProps extends PropsWithChildren {
  [key: string]: any;
}

const ClientOnly: FC<ClientOnlyProps> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly; 