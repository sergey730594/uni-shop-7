import React from 'react';

interface FlyToCartAnimationProps {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({ startPos, endPos }) => {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  
  // Случайная траектория
  const curve = Math.random() * 100 - 50; // -50 до 50
  const height = Math.random() * 80 + 40; // 40 до 120
  
  const duration = 1.2; // фиксированная длительность

  return (
    <>
      <div
        className="fixed z-[99999] pointer-events-none"
        style={{
          left: startPos.x,
          top: startPos.y,
          animation: `flyRandom ${duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      >
        <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center text-xl shadow-2xl">
          🎂
        </div>
      </div>
      
      <style>{`
        @keyframes flyRandom {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          30% {
            transform: translate(${dx * 0.3 + curve}px, ${dy * 0.3 - height}px) scale(0.8) rotate(10deg);
            opacity: 0.9;
          }
          60% {
            transform: translate(${dx * 0.6 - curve}px, ${dy * 0.6 - height / 2}px) scale(0.5) rotate(-10deg);
            opacity: 0.7;
          }
          100% {
            transform: translate(${dx}px, ${dy}px) scale(0.15) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};