import React from 'react';

interface FlyToCartAnimationProps {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({ startPos, endPos }) => {
  return (
    <div
      className="fixed z-[99999] pointer-events-none"
      style={{
        left: startPos.x,
        top: startPos.y,
        animation: 'flyToCart 0.8s ease-in-out forwards',
      }}
    >
      <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center text-white text-xl shadow-2xl">
        🎂
      </div>
      <style>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(${(endPos.x - startPos.x) / 2}px, ${(endPos.y - startPos.y) / 2 - 100}px) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(${endPos.x - startPos.x}px, ${endPos.y - startPos.y}px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};