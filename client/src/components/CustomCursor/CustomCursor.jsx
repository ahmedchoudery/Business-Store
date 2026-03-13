// FILE: client/src/components/CustomCursor/CustomCursor.jsx

import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;  // mouse
    let rx = 0, ry = 0;  // ring (lagging)
    let tx = 0, ty = 0;  // trail (lagging more)
    let raf;
    let hovered = false;
    let clicked = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select')) {
        hovered = true;
        ring.classList.add('cursor-ring--hover');
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select')) {
        hovered = false;
        ring.classList.remove('cursor-ring--hover');
      }
    };

    const onDown = () => { clicked = true; ring.classList.add('cursor-ring--click'); };
    const onUp = () => { clicked = false; ring.classList.remove('cursor-ring--click'); };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      // Dot snaps to cursor
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;

      // Ring trails with spring
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;

      // Trail trails more
      if (trail) {
        tx = lerp(tx, mx, 0.055);
        ty = lerp(ty, my, 0.055);
        trail.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      {/* Outermost ghost trail */}
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
      {/* Spring ring */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      {/* Dot snaps to mouse */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}