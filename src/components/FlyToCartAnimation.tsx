import React from 'react';

interface FlyToCartAnimationProps {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({ startPos, endPos }) => {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;

  return (
    <>
      <div
        className="fixed z-[99999] pointer-events-none"
        style={{
          left: startPos.x,
          top: startPos.y,
          animation: 'flyStraight 0.8s linear forwards',
        }}
      >
        <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center text-xl shadow-2xl">
          🎂
        </div>
      </div>
      
      <style>{`
        @keyframes flyStraight {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${dx}px, ${dy}px) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};