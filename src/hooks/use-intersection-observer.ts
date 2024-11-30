import { useEffect, useRef, useState } from 'react';

type IntersectionObserverOptions = {
  threshold?: number;
  rootMargin?: string;
};

export const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { elementRef, isVisible } as const;
}; 