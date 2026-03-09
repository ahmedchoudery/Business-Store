import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * Returns a ref and boolean that becomes true the first time
 * the element enters the viewport, using IntersectionObserver.
 */
export function useScrollReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      options
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}

