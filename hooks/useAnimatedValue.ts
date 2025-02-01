import { useState, useEffect } from 'react';
import { animate } from 'framer-motion';

export function useAnimatedValue(value: number, duration: number = 0.5) {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    const controls = animate(animatedValue, value, {
      duration,
      onUpdate: (latest) => setAnimatedValue(latest),
    });

    return () => controls.stop();
  }, [value, duration]);

  return animatedValue;
} 