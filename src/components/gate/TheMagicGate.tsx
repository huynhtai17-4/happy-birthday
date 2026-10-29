import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface TheMagicGateProps {
  onOpen: () => void;
  recipientName: string;
}

export const TheMagicGate: React.FC<TheMagicGateProps> = ({ onOpen, recipientName }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleOpenGate = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play magical gate audio chime
    soundEngine.playGateChime();

    // Trigger dual-side romantic confetti explosion (hearts, stars, champagne gold & rose petals)
    const duration = 2.4 * 1000;
    const end = Date.now() + duration;

    // Center burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#f472b6', '#ec4899', '#fbbf24', '#fdf2f8', '#c084fc', '#e11d48'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
      zIndex: 9999,
    });

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#f472b6', '#fbbf24', '#fbcfe8'],
        zIndex: 9999,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#c084fc', '#ec4899', '#fde047'],
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Transition smoothly to main screen after visual reveal
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="magic-gate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.15,
          filter: 'blur(20px)',
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#090214] via-[#120524] to-[#07010f] px-4 select-none"
      >
        {/* Luminous background nebula circles */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none -bottom-32 -right-20 animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-amber-400/10 blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Orbiting light ring */}
        <div
          className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-pink-500/20 pointer-events-none transition-all duration-1000 ${
            hovered ? 'scale-110 border-pink-400/40 shadow-[0_0_60px_rgba(236,72,153,0.3)]' : 'scale-100'
          }`}
          style={{ animation: 'spin 25s linear infinite' }}
        />
        <div
          className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-purple-400/20 pointer-events-none"
          style={{ animation: 'spin 35s linear infinite reverse' }}
        />

        {/* Center glowing crystal letter / gift box presentation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center max-w-lg text-center"
        >
          {/* Glowing Crystal Envelope */}
          <div
            className="relative cursor-pointer group my-8"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleOpenGate}
          >
            {/* Pulsating light bloom behind envelope */}
            <motion.div
              animate={{
                scale: isOpening ? [1, 2.5, 4] : hovered ? [1, 1.25, 1.1] : [1, 1.15, 1],
                opacity: isOpening ? [0.6, 1, 0] : [0.35, 0.65, 0.35],
              }}
              transition={{ repeat: isOpening ? 0 : Infinity, duration: isOpening ? 1.5 : 3.5, ease: 'easeInOut' }}
              className="absolute -inset-8 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 rounded-3xl blur-2xl pointer-events-none"
            />

            {/* Envelope Frame */}
            <motion.div
              animate={
                isOpening
                  ? { y: -40, rotateX: 60, scale: 1.1, opacity: 0 }
                  : { y: [0, -8, 0] }
              }
              transition={
                isOpening
                  ? { duration: 1.2, ease: 'easeInOut' }
                  : { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
              }
              className="relative w-56 h-36 sm:w-64 sm:h-40 rounded-2xl glass-panel border border-pink-300/40 p-3 flex flex-col items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105"
            >
              {/* Envelope flap aesthetic */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-pink-300/25 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />

              {/* Glowing wax seal heart button */}
              <motion.div
                animate={{ scale: hovered ? 1.15 : 1 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 via-pink-600 to-amber-600 flex items-center justify-center shadow-[0_0_25px_rgba(244,114,182,0.8)] border border-pink-200/60 z-20"
              >
                <Heart className="w-7 h-7 text-white fill-white drop-shadow" />
              </motion.div>

              <span className="mt-3 text-xs tracking-widest text-pink-200/80 font-medium uppercase">
                {recipientName ? `To: ${recipientName}` : 'For You, My Love'}
              </span>

              {/* Sparkles around envelope */}
              <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-amber-300 animate-bounce" />
              <Sparkles className="absolute -bottom-2 -left-3 w-5 h-5 text-pink-300 animate-pulse" />
            </motion.div>
          </div>

          {/* Subtitle / Whisper */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif italic text-lg sm:text-2xl text-pink-100/90 tracking-wide font-light mb-2 max-w-md drop-shadow"
          >
            “Anh có một điều đặc biệt muốn dành tặng em…”
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xs sm:text-sm text-pink-200/60 tracking-wider mb-8 uppercase font-mono"
          >
            Our Little Universe — Happy Birthday, My Love
          </motion.p>

          {/* Interactive Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(244,114,182,0.6)' }}
            whileTap={{ scale: 0.96 }}
            disabled={isOpening}
            onClick={handleOpenGate}
            className="relative px-8 py-4 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wider text-white uppercase bg-gradient-to-r from-pink-500 via-purple-600 to-rose-500 border border-pink-300/40 shadow-[0_10px_30px_rgba(236,72,153,0.4)] overflow-hidden group transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isOpening ? 'BƯỚC VÀO VŨ TRỤ...' : 'OPEN YOUR LITTLE UNIVERSE ✨'}</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Ambient footer indicator */}
        <div className="absolute bottom-6 text-center text-xs text-pink-300/40 tracking-widest font-light pointer-events-none">
          CHẠM ĐỂ BẬT ÂM THANH VÀ TRẢI NGHIỆM TRỌN VẸN
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

