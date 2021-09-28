import { useEffect, useRef } from 'react';

/**
 * 1つ前の値にアクセスするためのHook
 */
export const usePrevious: <T>(value: T) => T | undefined = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
