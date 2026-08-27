import React, { useState, useEffect } from 'react';

interface FlyToCartAnimationProps {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({ startPos, endPos }) => {
  const [pos, setPos] = useState(startPos);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Запускаем анимацию через requestAnimationFrame
    requestAnimationFrame(() => {
      setPos(endPos);
      setOpacity(0);
      setScale(0.1);
    });
  }, [endPos]);

  return (
    <div
      className="fixed z-[99999] pointer-events-none"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: opacity,
        transform: `scale(${scale})`,
        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center text-xl shadow-2xl">
        🎂
      </div>
    </div>
  );
};