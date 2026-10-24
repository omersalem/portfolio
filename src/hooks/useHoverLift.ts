import { useEffect } from 'react';
import { useSpring } from 'framer-motion';

type SpringConfig = Parameters<typeof useSpring>[1];

// useSpring only reads a plain number on first render, so drive it with set() when `active` changes.
export const useHoverLift = (active: boolean, restValue: number, activeValue: number, config: SpringConfig) => {
  const spring = useSpring(restValue, config);
  useEffect(() => {
    spring.set(active ? activeValue : restValue);
  }, [active, activeValue, restValue, spring]);
  return spring;
};
