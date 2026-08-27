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
          animation: 'flyLoop 1.8s ease-in-out forwards',
        }}
      >
        <div className="w-12 h-12 bg-[#ff0000] rounded-full flex items-center justify-center text-2xl shadow-2xl">
          🎂
        </div>
      </div>
      
      <style>{`
        @keyframes flyLoop {
          0% {
            transform: translate(0, 0) scale(1);
          }
          15% {
            transform: translate(${dx * 0.05}px, ${-80}px) scale(0.95);
          }
          30% {
            transform: translate(${dx * 0.15}px, ${-180}px) scale(0.85);
          }
          45% {
            transform: translate(${dx * 0.3}px, ${-280}px) scale(0.7);
          }
          60% {
            transform: translate(${dx * 0.5}px, ${-220}px) scale(0.6);
          }
          75% {
            transform: translate(${dx * 0.7}px, ${dy * 0.5}px) scale(0.45);
          }
          90% {
            transform: translate(${dx * 0.9}px, ${dy * 0.8}px) scale(0.3);
          }
          100% {
            transform: translate(${dx}px, ${dy}px) scale(0.1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};