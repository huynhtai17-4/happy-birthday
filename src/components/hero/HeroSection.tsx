import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { HeroConfig, RecipientConfig } from '../../types';

interface HeroSectionProps {
  hero: HeroConfig;
  recipient: RecipientConfig;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hero, recipient, onExploreClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden select-none"
    >
      {/* Parallax ambient light orbs */}
      <motion.div
        animate={{
          x: mousePos.x * -1.5,
          y: mousePos.y * -1.5,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 60 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[130px] pointer-events-none -top-32"
      />
      <motion.div
        animate={{
          x: mousePos.x * 2,
          y: mousePos.y * 2,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 50 }}
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none -bottom-20"
      />

      {/* Decorative Celestial Orbit Ring */}
      <div className="absolute w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] rounded-full border border-pink-400/15 pointer-events-none animate-spin" style={{ animationDuration: '40s' }} />
      <div className="absolute w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] rounded-full border border-dashed border-purple-400/10 pointer-events-none animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

      {/* Center 3D Glowing Heart with volumetric breathing effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-6"
      >
        {/* Pulsating glow aura */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="absolute -inset-6 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 rounded-full blur-xl pointer-events-none"
        />

        {/* Outer Crystal Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-panel border border-pink-300/40 flex items-center justify-center shadow-[0_0_50px_rgba(244,114,182,0.45)]">
          {/* Animated SVG Crystal Heart with inner light */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_20px_rgba(244,114,182,0.9)]"
              viewBox="0 0 24 24"
              fill="url(#heartGradient)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="40%" stopColor="#ec4899" />
                  <stop offset="80%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Star twinkle badges */}
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-300 animate-pulse" />
          <Heart className="absolute -bottom-1 -left-1 w-4 h-4 text-pink-300 fill-pink-300 animate-bounce" />
        </div>
      </motion.div>

      {/* Recipient Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-widest uppercase bg-pink-500/10 border border-pink-400/30 text-pink-200 shadow-sm backdrop-blur-md mb-4"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
        <span>For {recipient.name || 'My Princess'}</span>
      </motion.div>

      {/* Main Title Reveal (Cinematic Typography) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="max-w-4xl"
      >
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight uppercase">
          <span className="block text-shimmer drop-shadow-md">
            {hero.titleEn}
          </span>
          <span className="block font-serif italic font-normal tracking-wide text-2xl sm:text-4xl md:text-5xl text-rose-200 mt-2">
            {hero.subtitleEn}
          </span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-4 text-sm sm:text-base md:text-lg text-amber-200/90 tracking-widest uppercase font-mono font-light"
      >
        ✨ {hero.taglineEn} ✨
      </motion.p>

      {/* Heartfelt Vietnamese Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-8 max-w-2xl px-6 py-5 rounded-2xl glass-card border border-pink-300/20 text-center shadow-lg"
      >
        <p className="font-serif text-lg sm:text-2xl text-pink-100 font-normal leading-relaxed italic">
          “{hero.messageVi}”
        </p>
        {hero.subMessageVi && (
          <p className="mt-2.5 text-xs sm:text-sm text-pink-200/70 font-light leading-relaxed">
            {hero.subMessageVi}
          </p>
        )}
      </motion.div>

      {/* CTA Button: KHÁM PHÁ ĐIỀU BẤT NGỜ 💌 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-10 z-20"
      >
        <button
          onClick={onExploreClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-sans font-semibold text-sm sm:text-base tracking-widest text-white uppercase bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 border border-pink-300/40 shadow-[0_10px_35px_rgba(236,72,153,0.35)] hover:shadow-[0_15px_45px_rgba(236,72,153,0.55)] transition-all transform hover:-translate-y-1"
        >
          <span>{hero.ctaText}</span>
          <ChevronDown className="w-5 h-5 text-amber-200 group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

