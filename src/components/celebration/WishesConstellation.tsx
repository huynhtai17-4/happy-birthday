import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Sparkles, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface WishesConstellationProps {
  celebration?: any;
  senderName?: string;
}

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
  onExplode?: () => void;
}

export const WishesConstellation: React.FC<WishesConstellationProps> = () => {
  const [wishText, setWishText] = useState('');
  // Status: 'idle' | 'shooting' | 'revealed'
  const [status, setStatus] = useState<'idle' | 'shooting' | 'revealed'>('idle');
  const [activeWish, setActiveWish] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animationIdRef = useRef<number | null>(null);

  const colors = ['#fbbf24', '#f472b6', '#fef08a', '#ec4899', '#c084fc', '#38bdf8', '#ffffff'];

  // Clean storage on mount
  useEffect(() => {
    try {
      localStorage.removeItem('birthday_wishes_constellation');
    } catch {
      // Ignore
    }
  }, []);

  const createExplosion = (x: number, y: number, color: string, particleCount: number = 75) => {
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.3 - 0.15);
      const speed = Math.random() * 7 + 2.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        radius: Math.random() * 2.8 + 1,
        decay: Math.random() * 0.018 + 0.012,
      });
    }
  };

  const launchRocket = (startX: number, targetY: number, color: string, onExplode?: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    rocketsRef.current.push({
      x: startX,
      y: canvas.height,
      targetY,
      vy: -13,
      color,
      onExplode,
    });
  };

  // Canvas render loop
  useEffect(() => {
    if (status === 'idle') {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 520;

    const render = () => {
      // Night sky trailing clear
      ctx.fillStyle = 'rgba(7, 2, 18, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.y += r.vy;

        // Draw glowing rocket trail
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = r.color;
        ctx.fill();

        // Spark tail
        if (Math.random() < 0.6) {
          particlesRef.current.push({
            x: r.x + (Math.random() * 4 - 2),
            y: r.y + 6,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 2 + 1,
            alpha: 0.8,
            color: '#fbbf24',
            radius: Math.random() * 2 + 0.8,
            decay: 0.05,
          });
        }

        // Explode when rocket reaches target height
        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          if (r.onExplode) {
            r.onExplode();
          }
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update explosion particles
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
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    const currentText = wishText.trim();
    setActiveWish(currentText);
    setStatus('shooting');

    // 1. Play rocket whoosh sound
    soundEngine.playRocketLaunch();

    // 2. Launch main firework rocket directly up to the center
    setTimeout(() => {
      const canvas = canvasRef.current;
      const width = canvas ? canvas.width : window.innerWidth;
      const height = canvas ? canvas.height : 520;

      launchRocket(width / 2, height * 0.42, '#fbbf24', () => {
        // ROCKET EXPLODES IN THE SKY!
        soundEngine.playFireworkBoom();

        // Dual confetti starburst
        confetti({
          particleCount: 90,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f472b6', '#fef08a', '#ec4899', '#ffffff'],
          scalar: 1.1,
          zIndex: 9999,
        });

        // REVEAL WISH TEXT RIGHT AS FIREWORK EXPLODES
        setStatus('revealed');

        // Optional companion bursts on sides
        setTimeout(() => {
          launchRocket(width * 0.25, height * 0.35, '#f472b6', () => soundEngine.playFireworkBoom());
          launchRocket(width * 0.75, height * 0.35, '#c084fc', () => soundEngine.playFireworkBoom());
        }, 500);
      });
    }, 150);
  };

  // Called when text finishes its full cycle (after fading out completely)
  const handleFadeComplete = () => {
    setStatus('idle');
    setWishText('');
    rocketsRef.current = [];
    particlesRef.current = [];
  };

  const handleManualReset = () => {
    setStatus('idle');
    setWishText('');
    rocketsRef.current = [];
    particlesRef.current = [];
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl glass-panel border border-pink-400/30 overflow-hidden select-none shadow-2xl">
      {/* Background Starry Nebula */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13062b]/85 via-[#0b031b]/95 to-[#050110] pointer-events-none" />

      {/* Canvas for Realistic Rocket Launch and Explosion */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-700 ${
          status === 'idle' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          /* PHẦN 1: KHUNG NHẬP ĐIỀU ƯỚC */
          <motion.div
            key="wishing-input-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 w-full max-w-lg flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              <span>BẦU TRỜI ĐIỀU ƯỚC TINH TÚ</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold text-pink-100 mb-2">
              Gửi Điều Ước Của Bé Xu Xinh
            </h3>
            <p className="font-serif italic text-sm sm:text-base text-pink-200/70 mb-6 max-w-md">
              Nhập điều ước của em rồi bấm gửi để pháo hoa phóng lên trời nổ bùng bùng và thắp sáng điều ước nhé ✨
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <textarea
                rows={3}
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Nhập điều ước của em vào đây..."
                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-pink-400/30 text-white placeholder-pink-300/40 text-base focus:outline-none focus:border-pink-400 resize-none shadow-inner leading-relaxed"
                required
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 border border-pink-300/40 shadow-lg hover:shadow-[0_10px_35px_rgba(236,72,153,0.5)] transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Send className="w-4 h-4 text-amber-200" />
                <span>BẮN PHÁO HOA & GỬI ĐIỀU ƯỚC 🌠</span>
              </button>
            </form>
          </motion.div>
        ) : status === 'shooting' ? (
          /* PHẦN 2: PHÁO HOA ĐANG BẮN LÊN TRỜI (CHỜ NỔ) */
          <motion.div
            key="rocket-rising"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            <p className="font-mono text-xs text-amber-300/80 tracking-widest uppercase animate-pulse">
              🚀 Pháo hoa đang vút lên bầu trời đêm...
            </p>
          </motion.div>
        ) : (
          /* PHẦN 3: NỔ BÙNG BÙNG -> HIỆN DÒNG CHỮ -> MỜ MỜ RỒI TẮT */
          <motion.div
            key="revealed-wish-sky"
            className="relative z-30 max-w-3xl px-4 flex flex-col items-center justify-center text-center"
          >
            {/* Luminous aura behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-amber-400/25 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* DÒNG CHỮ HIỆN RA -> SÁNG LẤP LÁNH -> MỜ MỜ -> TẮT DẦN */}
            <motion.div
              initial={{ scale: 0.35, opacity: 0, filter: 'blur(16px)', y: 30 }}
              animate={{
                scale: [0.35, 1.1, 1, 1, 1],
                opacity: [0, 1, 1, 0.5, 0], // Hiện ra rõ -> sáng -> mờ mờ -> tắt hẳn
                filter: ['blur(16px)', 'blur(0px)', 'blur(0px)', 'blur(4px)', 'blur(16px)'],
                y: [30, 0, 0, -10, -25],
              }}
              transition={{
                duration: 6.8, // Toàn bộ chu kỳ 6.8 giây
                times: [0, 0.15, 0.6, 0.85, 1],
                ease: 'easeInOut',
              }}
              onAnimationComplete={handleFadeComplete}
              className="relative z-30 max-w-2xl px-4 py-2"
            >
              <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 drop-shadow-[0_0_35px_rgba(251,191,36,0.95)] leading-tight font-medium">
                “{activeWish}”
              </h2>

              <p className="mt-4 text-xs sm:text-sm font-mono tracking-widest text-amber-300/90 uppercase drop-shadow">
                ✨ Bé Xu Xinh • 30/10 ✨
              </p>
            </motion.div>

            {/* Nút thoát nhanh nếu không muốn đợi đủ 6.8 giây */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 6.8, times: [0, 0.3, 0.95] }}
              className="relative z-30 mt-6"
            >
              <button
                onClick={handleManualReset}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-mono text-pink-200/70 hover:text-white bg-black/40 hover:bg-black/60 border border-pink-400/20 transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Ước lại ngay</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
