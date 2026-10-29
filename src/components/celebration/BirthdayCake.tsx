import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, Flame } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface BirthdayCakeProps {
  cakeTitle: string;
  cakeSubtitle: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ cakeTitle, cakeSubtitle }) => {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [candlesCount] = useState([1, 2, 3]); // 3 glowing candles

  const handleBlowCandles = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);
    soundEngine.playCandleBlow();

    // Trigger celebratory confetti burst
    setTimeout(() => {
      soundEngine.playFireworkBoom();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f472b6', '#ec4899', '#fef08a', '#c084fc'],
      });
    }, 400);
  };

  const handleRelight = () => {
    setIsBlownOut(false);
  };

  return (
    <div className="flex flex-col items-center p-6 sm:p-10 rounded-3xl glass-panel border border-pink-400/30 text-center relative overflow-hidden shadow-2xl">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-mono mb-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>MAKE A BIRTHDAY WISH</span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-bold text-pink-100">
        {cakeTitle}
      </h3>
      <p className="font-serif italic text-sm sm:text-base text-pink-200/80 mt-1 mb-8 max-w-md">
        {isBlownOut
          ? '“Điều ước đã được gửi đến vũ trụ! Nguyện chúc mọi mong ước của em đều trở thành hiện thực.”'
          : cakeSubtitle}
      </p>

      {/* Realistic Multi-Tier SVG/CSS Birthday Cake */}
      <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex flex-col items-center justify-end mb-6">
        {/* Candle Flame and Smoke Container */}
        <div className="absolute top-2 flex items-end justify-center gap-8 sm:gap-10 z-20">
          {candlesCount.map((candleId, idx) => (
            <div key={candleId} className="flex flex-col items-center">
              {/* Flame or Smoke */}
              <AnimatePresence>
                {!isBlownOut ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.1, 0.95, 1] }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{ repeat: Infinity, duration: 1.5 + idx * 0.2 }}
                    className="relative w-4 h-7 mb-1"
                  >
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 flame-animated" />
                    <div className="absolute inset-0 bg-amber-400/50 rounded-full blur-[4px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.5 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="w-3 h-6 mb-1 text-pink-200/40 text-[10px] font-mono"
                  >
                    ☁️
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-2.5 h-12 rounded-t bg-gradient-to-b from-pink-200 via-rose-300 to-pink-400 shadow-sm border border-pink-200/40" />
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="relative w-36 sm:w-40 h-16 rounded-t-2xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-2 border-pink-100/60 shadow-md flex items-center justify-center z-10">
          {/* Icing drips */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/70 rounded-t-2xl flex justify-around">
            <span className="w-3 h-4 bg-white/70 rounded-b-full -mb-1" />
            <span className="w-2.5 h-5 bg-white/70 rounded-b-full -mb-2" />
            <span className="w-3.5 h-3 bg-white/70 rounded-b-full" />
            <span className="w-2 h-4 bg-white/70 rounded-b-full -mb-1" />
          </div>
          <span className="font-script text-xl sm:text-2xl text-rose-800 font-semibold drop-shadow">
            My Love
          </span>
        </div>

        {/* Middle Cake Tier */}
        <div className="relative w-48 sm:w-56 h-18 rounded-t-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 border-2 border-pink-200/50 shadow-lg flex items-center justify-center z-0 -mt-2">
          {/* Golden decorative cream beads */}
          <div className="absolute inset-x-3 top-2 flex justify-between">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2 h-2 rounded-full bg-amber-300 shadow-sm" />
            ))}
          </div>
          <span className="font-serif italic text-xs sm:text-sm text-pink-100 font-medium tracking-widest uppercase">
            Happy Birthday
          </span>
        </div>

        {/* Bottom Cake Stand / Plate */}
        <div className="w-56 sm:w-64 h-5 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 border border-amber-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-0 -mt-1" />
      </div>

      {/* Blow Candle Action Button */}
      <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
        {!isBlownOut ? (
          <button
            onClick={handleBlowCandles}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wider text-white uppercase bg-gradient-to-r from-amber-500 via-pink-600 to-rose-500 hover:from-amber-400 hover:to-rose-400 border border-amber-300/40 shadow-lg hover:shadow-[0_10px_30px_rgba(251,191,36,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <Wind className="w-4 h-4 text-amber-200 group-hover:animate-pulse" />
            <span>THỔI NẾN ✨</span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide text-pink-200 bg-white/10 hover:bg-white/20 border border-pink-400/30 transition-colors"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Thắp nến lại để ước thêm lần nữa 🕯️</span>
          </button>
        )}
      </div>
    </div>
  );
};

