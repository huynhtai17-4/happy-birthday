import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface FinalSectionProps {
  onRestart: () => void;
  senderName: string;
  recipientName?: string;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onRestart, senderName, recipientName = 'Bé Xu Xinh' }) => {
  const handleGrandCelebration = () => {
    soundEngine.playFireworkBoom();

    // Grand final confetti shower
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#fbbf24', '#fbcfe8', '#e11d48', '#c084fc', '#ffffff'],
      scalar: 1.2,
    });
  };

  const handleRestartJourney = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onRestart();
    }, 600);
  };

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto select-none overflow-hidden">
      {/* Luminous galactic background aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-amber-500/15 blur-[120px] pointer-events-none" />

      {/* Heart Aura */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative my-6"
        onClick={handleGrandCelebration}
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full glass-panel border border-pink-400/40 flex items-center justify-center shadow-[0_0_50px_rgba(244,114,182,0.5)] cursor-pointer group">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 fill-pink-500 group-hover:scale-115 transition-transform drop-shadow" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
      </motion.div>

      {/* Main Closing Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-300/90 mb-3">
          ✦ TO MY FAVORITE PERSON ✦
        </p>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-200 to-amber-100 glow-text-pink leading-tight uppercase">
          THE WORLD IS MORE BEAUTIFUL WITH YOU IN IT.
        </h2>
      </motion.div>

      {/* Emotional Closing Paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-8 max-w-xl px-6 py-4 rounded-2xl glass-card border border-pink-300/20"
      >
        <p className="font-serif italic text-lg sm:text-2xl text-pink-100/95 leading-relaxed">
          “Chúc mừng sinh nhật {recipientName} tròn 21 tuổi. Yêu em siêu nhiều, yêu vô tận, yêu tới khi hai đứa già nhăn nheo luôn ^^”
        </p>
        <p className="mt-4 font-display text-xl sm:text-2xl text-rose-300 font-bold tracking-wide">
          IU BÉ NHẤT TRÊN ĐỜI! Je t'aime! ❤️
        </p>
        <p className="text-xs text-pink-300/80 font-mono mt-2">
          — {senderName} —
        </p>
      </motion.div>

      {/* Replay Journey Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12"
      >
        <button
          onClick={handleRestartJourney}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase text-white bg-white/10 hover:bg-white/20 border border-pink-400/40 hover:border-pink-300 shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <RotateCcw className="w-4 h-4 text-pink-300 group-hover:-rotate-90 transition-transform duration-300" />
          <span>XEM LẠI MÓN QUÀ TỪ ĐẦU ↺</span>
        </button>
      </motion.div>

      {/* Tiny Romantic Footer */}
      <div className="mt-16 text-xs text-pink-300/40 font-mono tracking-wider">
        OUR LITTLE UNIVERSE • HAPPY BIRTHDAY, MY LOVE • FOREVER & ALWAYS
      </div>
    </section>
  );
};

