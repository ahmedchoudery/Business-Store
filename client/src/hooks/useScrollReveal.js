import { useEffect, useRef, useState, useMemo } from 'react';

/**
 * useScrollReveal
 *
 * Returns a ref and a boolean (`visible`) that becomes true the first time
 * the element enters the viewport, using IntersectionObserver.
 *
 * @param {Object}  [options]
 * @param {number}  [options.threshold=0.2]  - Intersection ratio (0–1) before triggering.
 * @param {string}  [options.rootMargin='0px'] - Margin around the root.
 * @returns {{ ref: import('react').RefObject<Element>, visible: boolean }}
 *
 * REACT PATTERN FIX: The previous version accepted a plain object as a prop
 * (e.g. `{ threshold: 0.25 }`). Because callers create a new object literal on
 * every render, including it in useEffect's dependency array caused the effect
 * to re-run on every render — an infinite observation loop. We now destructure
 * the primitives and memoize the options object internally so the effect only
 * runs when the actual values change.
 */
export function useScrollReveal({ threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Memoize the options object so the effect only re-fires when the primitive
  // values actually change — not on every render of the calling component.
  const observerOptions = useMemo(
    () => ({ threshold, rootMargin }),
    [threshold, rootMargin]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(node);
    return () => observer.disconnect();
  }, [observerOptions]);

  return { ref, visible };
}