import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, FastForward, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { TypewriterText } from './TypewriterText';
import { LetterConfig } from '../../types';
import { soundEngine } from '../../utils/soundEffects';

interface LoveLetterSectionProps {
  letter: LetterConfig;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ letter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleOpenLetter = () => {
    soundEngine.playLetterOpen();
    setIsOpen(true);
  };

  const handleSkipTyping = () => {
    setIsTypingDone(true);
  };

  return (
    <section id="letter-section" className="py-24 px-4 sm:px-6 relative z-10 max-w-4xl mx-auto select-none">
      <SectionHeader
        badge="A LETTER FROM MY HEART"
        title="Lá Thư Tình Gửi Em"
        subtitle="Những lời chân thành từ sâu thẳm trái tim anh dành riêng cho ngày sinh nhật của em"
      />

      {/* Romantic Ambient Atmosphere: Candlesticks & Roses Backdrop */}
      <div className="relative mt-10">
        {/* Soft candle flame aura on left and right */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center pointer-events-none opacity-80">
          <div className="w-5 h-8 bg-amber-400 rounded-full flame-animated blur-[1px]" />
          <div className="w-4 h-24 bg-gradient-to-b from-amber-100 to-rose-200 rounded-t shadow-md mt-1" />
        </div>
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center pointer-events-none opacity-80">
          <div className="w-5 h-8 bg-amber-400 rounded-full flame-animated blur-[1px]" />
          <div className="w-4 h-24 bg-gradient-to-b from-amber-100 to-rose-200 rounded-t shadow-md mt-1" />
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope in Closed State */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative mx-auto max-w-md p-8 sm:p-12 rounded-3xl glass-panel border border-pink-400/30 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Envelope Graphic */}
              <div className="relative my-4 group cursor-pointer" onClick={handleOpenLetter}>
                <div className="w-64 h-44 sm:w-72 sm:h-48 rounded-2xl bg-gradient-to-br from-pink-900/60 via-purple-900/60 to-rose-950/70 border border-pink-300/30 p-4 flex flex-col items-center justify-center relative shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-x-0 top-0 h-1/2 border-b border-pink-400/20 bg-white/5 rounded-t-2xl pointer-events-none" />

                  {/* Wax Seal */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(244,114,182,0.8)] border-2 border-amber-200/50 z-10"
                  >
                    <Heart className="w-8 h-8 text-white fill-white drop-shadow" />
                  </motion.div>

                  <span className="mt-4 text-xs tracking-widest text-pink-200/90 font-mono uppercase">
                    For My Beloved Girl
                  </span>
                </div>
              </div>

              <p className="font-serif italic text-base sm:text-lg text-pink-200/80 mb-6 mt-2">
                “Lá thư này được viết bằng tất cả sự dịu dàng và thương yêu…”
              </p>

              {/* Action Button */}
              <button
                onClick={handleOpenLetter}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wider text-white uppercase bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 border border-pink-300/40 shadow-lg hover:shadow-[0_10px_30px_rgba(236,72,153,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 text-amber-200" />
                <span>OPEN MY LETTER 💌</span>
              </button>
            </motion.div>
          ) : (
            /* Opened Letter on Luxurious Parchment Paper */
            <motion.div
              key="opened-letter"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto rounded-3xl p-6 sm:p-12 md:p-14 bg-gradient-to-b from-[#fdfbf7] via-[#faf6ee] to-[#f5eedb] text-amber-950 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-4 border-amber-300/30 overflow-hidden"
            >
              {/* Paper Texture and Decorative Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-800/20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-800/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-800/20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-800/20 pointer-events-none" />

              {/* Faint Wax Seal Watermark in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
                <Heart className="w-96 h-96 text-rose-900 fill-rose-900" />
              </div>

              {/* Letter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-amber-900/15 mb-6 gap-3">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-amber-950 tracking-tight">
                  {letter.salutation}
                </h3>

                {/* Skip / Fast Forward Button */}
                {!isTypingDone && (
                  <button
                    onClick={handleSkipTyping}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-200/60 hover:bg-amber-300/80 text-amber-900 border border-amber-400/40 transition-colors"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>ĐỌC TOÀN BỘ LÁ THƯ</span>
                  </button>
                )}
                {isTypingDone && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-800/70 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã hiển thị toàn bộ</span>
                  </div>
                )}
              </div>

              {/* Letter Body with Typewriter Effect */}
              <div className="relative z-10 py-2">
                <TypewriterText
                  paragraphs={letter.paragraphs}
                  isCompleted={isTypingDone}
                  onComplete={() => setIsTypingDone(true)}
                />
              </div>

              {/* Letter Closing & Signature */}
              <div className="mt-8 pt-6 border-t border-amber-900/15 flex flex-col items-end text-right">
                <p className="font-serif italic text-lg sm:text-xl text-rose-900 font-semibold">
                  {letter.closing}
                </p>
                <p className="font-script text-2xl sm:text-3xl text-amber-900 mt-2 font-normal">
                  {letter.signature}
                </p>
              </div>

              {/* Re-fold Letter Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-amber-800/60 hover:text-amber-950 font-mono underline underline-offset-4 tracking-wider transition-colors"
                >
                  [ Gấp lại lá thư ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

