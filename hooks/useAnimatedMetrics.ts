import { useEffect, useMemo } from "react";
import { useAnimatedValue } from "./useAnimatedValue";

export function useAnimatedMetrics(metrics?: Array<{ value: number }>) {
  // Initialize with empty array if no metrics
  const initialMetrics = metrics || [];
  
  // Create stable array of animated values
  const animatedValues = useMemo(
    () => initialMetrics.map(() => useAnimatedValue(0, 1)),
    [initialMetrics.length] // Only recreate when length changes
  );

  // Update values when metrics change
  useEffect(() => {
    initialMetrics.forEach((metric, i) => {
      const [, setValue] = animatedValues[i];
      setValue(metric.value);
    });
  }, [initialMetrics, animatedValues]);

  // Return only current values
  return animatedValues.map(([value]) => value);
}