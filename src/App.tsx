import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Volume2, VolumeX } from 'lucide-react';
import { BIRTHDAY_CONFIG } from './config/birthday';
import { TheMagicGate } from './components/gate/TheMagicGate';
import { HeroSection } from './components/hero/HeroSection';
import { CountdownSection } from './components/countdown/CountdownSection';
import { MemoriesGallery } from './components/gallery/MemoriesGallery';
import { LoveLetterSection } from './components/letter/LoveLetterSection';
import { CelebrationSection } from './components/celebration/CelebrationSection';
import { FinalSection } from './components/final/FinalSection';
import { StardustCanvas } from './components/common/StardustCanvas';
import { FloatingHeartsCanvas } from './components/common/FloatingHeartsCanvas';
import { AudioPlayerWidget } from './components/music/AudioPlayerWidget';
import { soundEngine } from './utils/soundEffects';

export const App: React.FC = () => {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleOpenGate = () => {
    setIsGateOpen(true);
  };

  const handleRestart = () => {
    setIsGateOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  return (
    <div className="relative min-h-screen bg-[#080314] text-[#fbf7f4] selection:bg-pink-500/30 selection:text-pink-200">
      {/* Background Canvas Particle Effects */}
      <StardustCanvas />
      <FloatingHeartsCanvas />

      {/* The Magic Gate - Fullscreen Entrance */}
      <AnimatePresence>
        {!isGateOpen && (
          <TheMagicGate
            onOpen={handleOpenGate}
            recipientName={BIRTHDAY_CONFIG.recipient.name}
          />
        )}
      </AnimatePresence>

      {/* Main Experience Once Gate is Opened */}
      {isGateOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 flex flex-col min-h-screen"
        >
          {/* Top Glassmorphic Navigation Bar */}
          <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-xl bg-[#090317]/70 border-b border-pink-400/15 flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-md">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display font-bold text-sm sm:text-base tracking-wider text-pink-100 group-hover:text-pink-300 transition-colors">
                OUR LITTLE UNIVERSE
              </span>
            </div>

            {/* Navigation links & Mute toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono text-pink-200/80">
                <button
                  onClick={() => scrollToSection('countdown-section')}
                  className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                >
                  Khoảnh Khắc
                </button>
                <button
                  onClick={() => scrollToSection('memories-section')}
                  className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                >
                  Kỷ Niệm
                </button>
                <button
                  onClick={() => scrollToSection('letter-section')}
                  className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                >
                  Lá Thư
                </button>
                <button
                  onClick={() => scrollToSection('celebration-section')}
                  className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                >
                  Bữa Tiệc
                </button>
              </nav>

              <button
                onClick={toggleSound}
                title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                className="p-2 rounded-full glass-panel border border-pink-400/30 text-pink-200 hover:text-white transition-all hover:scale-105"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </header>

          {/* Section 1: Hero Section */}
          <HeroSection
            hero={BIRTHDAY_CONFIG.hero}
            recipient={BIRTHDAY_CONFIG.recipient}
            onExploreClick={() => scrollToSection('countdown-section')}
          />

          {/* Section 2: Birthday Countdown */}
          <CountdownSection recipient={BIRTHDAY_CONFIG.recipient} />

          {/* Section 3: Our Memories Gallery */}
          <MemoriesGallery memories={BIRTHDAY_CONFIG.memories} />

          {/* Section 4: Love Letter */}
          <LoveLetterSection letter={BIRTHDAY_CONFIG.letter} />

          {/* Section 5: Interactive Celebration (Cake, Fireworks, Wishes) */}
          <CelebrationSection
            celebration={BIRTHDAY_CONFIG.celebration}
            senderName={BIRTHDAY_CONFIG.sender.name}
          />

          {/* Section 7: Final Section */}
          <FinalSection
            onRestart={handleRestart}
            senderName={BIRTHDAY_CONFIG.sender.name}
            recipientName={BIRTHDAY_CONFIG.recipient.name}
          />

          {/* Floating Audio Player Widget */}
          <AudioPlayerWidget
            audioConfig={BIRTHDAY_CONFIG.audio}
            autoPlayTriggered={isGateOpen}
          />
        </motion.div>
      )}
    </div>
  );
};

export default App;

