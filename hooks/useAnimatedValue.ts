import { useState, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedValue {
  value: number;
  setValue: (newValue: number) => void;
}

export function useAnimatedValue(initial: number, duration = 0.5): AnimatedValue {
  const animatedValue = useRef(initial);
  
  const setValue = (newValue: number) => {
    animatedValue.current = newValue;
  };

  useEffect(() => {
    const controls = animate(animatedValue.current, initial, {
      duration,
      onUpdate: (latest) => animatedValue.current = latest,
    });

    return () => controls.stop();
  }, [initial, duration]);

  return {
    value: animatedValue.current,
    setValue
  };
} 