import React, { useEffect, useRef } from 'react';

interface FloatingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export const FloatingHeartsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const heartColors = [
      'rgba(244, 114, 182, 0.45)', // pink-400
      'rgba(236, 72, 153, 0.35)',  // pink-500
      'rgba(192, 132, 252, 0.40)', // purple-400
      'rgba(251, 191, 36, 0.30)',  // amber-400
      'rgba(253, 164, 175, 0.50)'  // rose-300
    ];

    const maxHearts = Math.min(24, Math.floor(width / 50));
    const hearts: FloatingHeart[] = [];

    const createHeart = (initialY?: number): FloatingHeart => ({
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : height + Math.random() * 80,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    });

    for (let i = 0; i < maxHearts; i++) {
      hearts.push(createHeart(Math.random() * height));
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.scale(size / 30, size / 30);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-15, -15, -25, 5, 0, 25);
      c.bezierCurveTo(25, 5, 15, -15, 0, 0);
      c.fillStyle = color;
      c.shadowBlur = 10;
      c.shadowColor = color;
      c.fill();
      c.restore();
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y -= h.speedY;
        h.x += Math.sin(h.y * 0.01) * 0.5 + h.speedX;
        h.rotation += h.rotationSpeed;

        if (h.y < -50) {
          hearts[i] = createHeart(height + 20);
        }

        drawHeart(ctx, h.x, h.y, h.size, h.color, h.rotation);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
};

