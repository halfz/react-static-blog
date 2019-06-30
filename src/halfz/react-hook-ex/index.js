import {
  useEffect,
  useLayoutEffect,
} from 'react';


export const useComponentDidMount = (componentDidMount) => useEffect(componentDidMount, []);
export const useComponentDidUnmount = (componentDidUnmount) => useEffect(() => componentDidUnmount, []);
export const useIsomorphicLayoutEffect = (typeof window === 'undefined') ? useEffect : useLayoutEffect;
