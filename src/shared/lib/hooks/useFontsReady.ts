import { useEffect, useState } from 'react';

export const useFontsReady = (): boolean => {
  const [isReady, setIsReady] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    if (!document.fonts) return true;

    return document.fonts.status === 'loaded';
  });

  useEffect(() => {
    if (isReady || !document.fonts) return;

    let isActive = true;
    document.fonts.ready.then(() => {
      if (isActive) setIsReady(true);
    });

    return () => {
      isActive = false;
    };
  }, [isReady]);

  return isReady;
};
