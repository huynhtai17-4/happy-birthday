import React from 'react';
import { motion } from 'framer-motion';
import { Cake, Clock, Sparkles, Heart } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useCountdown } from '../../hooks/useCountdown';
import { RecipientConfig } from '../../types';

interface CountdownSectionProps {
  recipient: RecipientConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ recipient }) => {
  const countdown = useCountdown(recipient.birthDate, recipient.timezone);

  return (
    <section id="countdown-section" className="py-20 px-4 relative z-10 max-w-5xl mx-auto select-none">
      <SectionHeader
        badge="HER DAY, HER MAGIC"
        title="Khoảnh Khắc Của Em"
        subtitle={`Kỷ niệm ngày sinh nhật: ${countdown.formattedDate}`}
      />

      {/* Main Countdown Display */}
      <div className="relative mt-8">
        {/* Glow backdrop */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 rounded-3xl blur-2xl pointer-events-none" />

        {countdown.status === 'today' ? (
          /* It's Birthday Today! */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-12 rounded-3xl glass-panel border border-pink-400/40 text-center shadow-[0_0_50px_rgba(236,72,153,0.35)] relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl" />

            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-lg mb-6"
            >
              <Cake className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>

            <h3 className="font-display text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 glow-text-pink uppercase tracking-wider mb-4">
              IT'S YOUR SPECIAL DAY! 🎂
            </h3>
            <p className="font-serif italic text-lg sm:text-2xl text-pink-100/90 max-w-xl mx-auto leading-relaxed">
              Hôm nay 30/10 – Chúc mừng sinh nhật tuổi 21 của {recipient.name}! Cả vũ trụ cùng hòa ca chúc mừng thiên thần đáng yêu của anh.
            </p>
          </motion.div>
        ) : countdown.status === 'past' ? (
          /* Birthday has passed this year: celebratory elapsed counter */
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-pink-400/30 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Đã trôi qua sinh nhật năm nay nhưng tình yêu vẫn luôn đong đầy mỗi ngày!</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-pink-100 mb-2">
              Thời Gian Đồng Hành Cùng Tuổi Mới
            </h3>
            <p className="text-sm text-pink-200/70 mb-8 font-light">
              Đã bước qua {countdown.daysPassed} ngày tuổi mới đầy rạng rỡ và hạnh phúc
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'NGÀY TUỔI MỚI', value: countdown.daysPassed || 0 },
                { label: 'GIỜ', value: countdown.hours },
                { label: 'PHÚT', value: countdown.minutes },
                { label: 'GIÂY', value: countdown.seconds },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl glass-card border border-pink-300/20 flex flex-col items-center justify-center shadow-md"
                >
                  <span className="font-display text-3xl sm:text-5xl font-bold text-amber-200 glow-text-gold font-mono">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm tracking-widest text-pink-200/70 uppercase mt-2 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Upcoming Countdown */
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-pink-400/30 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm mb-6">
              <Clock className="w-4 h-4 text-pink-300" />
              <span>Đang đếm từng khoảnh khắc đến ngày đặc biệt của {recipient.name}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {[
                { label: 'NGÀY', value: countdown.days },
                { label: 'GIỜ', value: countdown.hours },
                { label: 'PHÚT', value: countdown.minutes },
                { label: 'GIÂY', value: countdown.seconds },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="p-5 sm:p-6 rounded-2xl glass-card border border-pink-300/20 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-display text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-amber-200 glow-text-pink font-mono tracking-tight">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm tracking-widest text-pink-200/80 uppercase mt-2 font-medium">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-xs sm:text-sm text-pink-200/60 font-light flex items-center justify-center gap-2">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Dù thời gian trôi bao lâu, tình yêu anh dành cho em vẫn luôn nguyên vẹn.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

