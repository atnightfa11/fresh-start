import { FC, useEffect, useState, PropsWithChildren } from 'react';

interface ClientOnlyProps extends PropsWithChildren {
  fallback?: React.ReactNode;
  [key: string]: any;
}

const ClientOnly: FC<ClientOnlyProps> = ({ children, fallback = null, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly; 