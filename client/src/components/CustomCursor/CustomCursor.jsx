import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"]')) {
        setHoveringInteractive(true);
      }
    };

    const handleOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"]')) {
        setHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      <div
        className={`cursor-circle ${hoveringInteractive ? 'cursor-circle--active' : ''}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
    </>
  );
}

