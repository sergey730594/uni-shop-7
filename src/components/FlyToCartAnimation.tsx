import React from 'react';

interface FlyToCartAnimationProps {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export const FlyToCartAnimation: React.FC<FlyToCartAnimationProps> = ({ startPos, endPos }) => {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  
  // Контрольные точки для петли
  const midX = startPos.x + dx * 0.5;
  const midY = startPos.y - 200; // верхняя точка петли
  const loopX = startPos.x + dx * 0.3;
  const loopY = startPos.y - 300; // ещё выше для петли

  return (
    <>
      <div
        className="fixed z-[99999] pointer-events-none"
        style={{
          left: 0,
          top: 0,
          position: 'fixed',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-2xl"
          style={{
            backgroundColor: '#ff0000',
            animation: `flyWithLoop 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            position: 'fixed',
            left: startPos.x,
            top: startPos.y,
          }}
        >
          🎂
        </div>
      </div>
      
      <style>{`
        @keyframes flyWithLoop {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translate(${dx * 0.2}px, ${-150}px) scale(0.9) rotate(10deg);
            opacity: 1;
          }
          50% {
            transform: translate(${dx * 0.5}px, ${-250}px) scale(0.7) rotate(-15deg);
            opacity: 0.9;
          }
          75% {
            transform: translate(${dx * 0.7}px, ${dy * 0.6}px) scale(0.5) rotate(15deg);
            opacity: 0.7;
          }
          100% {
            transform: translate(${dx}px, ${dy}px) scale(0.2) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};