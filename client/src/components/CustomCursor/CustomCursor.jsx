import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);

  useEffect(() => {
    const onMove = (e) => { mx.current = e.clientX; my.current = e.clientY; };
    window.addEventListener('mousemove', onMove);

    let raf;
    const track = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx.current}px,${my.current}px) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx.current}px,${ry.current}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(track);
    };
    raf = requestAnimationFrame(track);

    const onOver = (e) => {
      if (e.target.closest('a,button,[role="button"]'))
        ringRef.current?.classList.add('cursor-ring--hover');
    };
    const onOut = (e) => {
      if (e.target.closest('a,button,[role="button"]'))
        ringRef.current?.classList.remove('cursor-ring--hover');
    };
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}