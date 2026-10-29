import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, ChevronDown, ChevronUp } from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { AudioConfig } from '../../types';

interface AudioPlayerWidgetProps {
  audioConfig: AudioConfig;
  autoPlayTriggered: boolean;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  audioConfig,
  autoPlayTriggered,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    isPlaying,
    isMuted,
    volume,
    isFallbackMode,
    togglePlay,
    toggleMute,
    changeVolume,
  } = useAudioPlayer({
    src: audioConfig.src,
    autoPlayAfterGate: audioConfig.autoPlayAfterGate,
    enableFallbackSynthesizer: audioConfig.enableFallbackSynthesizer,
  });

  // Trigger play once after gate is opened if configured
  React.useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      togglePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTriggered]);

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <AnimatePresence>
        {isExpanded ? (
          /* Expanded Card Player */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-72 sm:w-80 p-4 rounded-2xl glass-panel border border-pink-400/40 shadow-2xl flex flex-col gap-3 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-pink-400/20 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-pink-200">
                <Music className="w-4 h-4 text-pink-400" />
                <span>GIAI ĐIỆU CỦA CHÚNG MÌNH</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full text-pink-300 hover:text-white hover:bg-white/10"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Song Info */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-md border border-pink-300/40 shrink-0"
              >
                <Disc3 className="w-6 h-6 text-white" />
              </motion.div>
              <div className="overflow-hidden">
                <h5 className="text-sm font-semibold text-white truncate">
                  {audioConfig.title}
                </h5>
                <p className="text-xs text-pink-200/70 truncate">
                  {audioConfig.artist}
                </p>
                {isFallbackMode && (
                  <span className="text-[10px] text-amber-300/90 font-mono block">
                    (Giai điệu lãng mạn tích hợp)
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 flex items-center justify-center text-white shadow-md transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full text-pink-200 hover:text-white"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                  className="w-20 h-1.5 bg-pink-900/60 rounded-lg appearance-none cursor-pointer accent-pink-400"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Floating Pill */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 p-2 pr-3.5 rounded-full glass-panel border border-pink-400/30 shadow-xl cursor-pointer hover:border-pink-300/60 transition-all group"
            onClick={() => setIsExpanded(true)}
          >
            {/* Spinning Vinyl */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-md text-white"
            >
              <Disc3 className="w-5 h-5" />
            </motion.div>

            {/* Quick Play/Pause button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1 rounded-full text-pink-200 hover:text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Wave animation bars when playing */}
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 px-1">
                <span className="w-0.5 h-4 bg-pink-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-pink-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 h-3 bg-amber-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            ) : (
              <span className="text-xs text-pink-200/80 font-mono">Bật nhạc</span>
            )}

            <ChevronUp className="w-3.5 h-3.5 text-pink-300/60 group-hover:text-pink-200 ml-0.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

