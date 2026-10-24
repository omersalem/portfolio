import { RefObject, useEffect, useState } from 'react';

// True while the element is within `margin` of the viewport. Lets heavy WebGL scenes
// exist only near the screen, so the page never holds every context at once.
export const useNearViewport = (ref: RefObject<Element>, margin = '400px'): boolean => {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setNear(entry.isIntersecting)),
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);

  return near;
};
