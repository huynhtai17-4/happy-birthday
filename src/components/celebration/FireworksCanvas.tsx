import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  decay: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);

  const colors = ['#f472b6', '#fbbf24', '#fbcfe8', '#ec4899', '#c084fc', '#38bdf8', '#fde047', '#ffffff'];

  const launchFirework = useCallback((customX?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    soundEngine.playFireworkBoom();

    const startX = customX ?? Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
    const targetY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
    const color = colors[Math.floor(Math.random() * colors.length)];

    rocketsRef.current.push({
      x: startX,
      y: canvas.height,
      targetY,
      vy: -(Math.random() * 4 + 10),
      color,
    });
  }, []);

  const createExplosion = (x: number, y: number, color: string) => {
    const count = 45; // Strictly capped for 60 FPS
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        radius: Math.random() * 2 + 1,
        decay: Math.random() * 0.018 + 0.012,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 450;

    const render = () => {
      // Gentle trail fade
      ctx.fillStyle = 'rgba(10, 4, 22, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.y += r.vy;

        // Draw trail
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = r.color;
        ctx.fill();

        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // Gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const triggerShow = () => {
    setIsActive(true);
    let count = 0;
    const interval = setInterval(() => {
      launchFirework();
      count++;
      if (count >= 5) {
        clearInterval(interval);
        setTimeout(() => setIsActive(false), 2000);
      }
    }, 450);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-pink-400/30 p-6 flex flex-col items-center">
      <div className="w-full h-64 sm:h-80 relative rounded-2xl overflow-hidden bg-[#0a0416]">
        <canvas
          ref={canvasRef}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            launchFirework(e.clientX - rect.left);
          }}
          className="w-full h-full cursor-pointer"
        />
        <div className="absolute top-3 left-4 text-xs font-mono text-pink-200/60 pointer-events-none">
          ✨ Chạm lên bầu trời để bắn pháo hoa
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={triggerShow}
          disabled={isActive}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 border border-pink-300/40 shadow-md transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isActive ? 'ĐANG BẮN PHÁO HOA...' : 'BẮN PHÁO HOA ĂN MỪNG 🎆'}</span>
        </button>
      </div>
    </div>
  );
};

