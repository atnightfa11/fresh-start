import { animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export function useAnimatedValue(initial: number, duration = 0.5) {
  const [value, setValue] = useState(initial);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const setAnimatedValue = (newValue: number) => {
    animationRef.current?.stop();
    animationRef.current = animate(value, newValue, {
      duration,
      onUpdate: (latest) => setValue(latest)
    });
  };

  useEffect(() => {
    return () => animationRef.current?.stop();
  }, []);

  return [value, setAnimatedValue] as const;
} 