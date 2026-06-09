import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useScrollProgress(
  offset?: [string, string]
): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset || ["start start", "end end"],
  });

  return { containerRef, progress: scrollYProgress };
}

export function useProgressValue(
  progress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[]
): MotionValue<number> {
  return useTransform(progress, inputRange, outputRange);
}
