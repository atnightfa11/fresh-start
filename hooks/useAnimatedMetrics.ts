import { useAnimatedValue } from "./useAnimatedValue";
import { useEffect, useRef } from "react";

export function useAnimatedMetrics(metrics?: Array<{ value: number }>) {
  // 1. Initialize hooks at top level
  const animatedValues = metrics?.map(m => useAnimatedValue(m.value, 1)) || [];
  
  // 2. Store in ref for persistence
  const animatedValuesRef = useRef(animatedValues);

  // 3. Update ref when metrics change
  useEffect(() => {
    animatedValuesRef.current = metrics?.map((m, i) => {
      const existing = animatedValuesRef.current[i];
      if (existing) existing.setValue(m.value);
      return existing || useAnimatedValue(m.value, 1);
    }) || [];
  }, [metrics]);

  // 4. Return current values
  return animatedValuesRef.current.map(av => av.value);
} 