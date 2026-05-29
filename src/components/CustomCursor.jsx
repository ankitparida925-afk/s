import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      const mobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkTouchDevice();

    if (isMobile) return;

    const mMove = (el) => {
      setPosition({ x: el.clientX, y: el.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
    };

    const mUp = () => {
      setClicked(false);
    };

    window.addEventListener('mousemove', mMove);
    document.addEventListener('mouseleave', mLeave);
    window.addEventListener('mousedown', mDown);
    window.addEventListener('mouseup', mUp);

    return () => {
      window.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseleave', mLeave);
      window.removeEventListener('mousedown', mDown);
      window.removeEventListener('mouseup', mUp);
    };
  }, [isMobile]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Outer Glowing Ring */}
      <div
        className="custom-cursor-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: clicked ? '50px' : '40px',
          height: clicked ? '50px' : '40px',
          backgroundColor: clicked ? 'rgba(244, 63, 94, 0.15)' : 'transparent',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out',
        }}
      />
      {/* Inner Heart or Dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
