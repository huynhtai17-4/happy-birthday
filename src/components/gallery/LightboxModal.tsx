import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MemoryPhoto } from '../../types';

interface LightboxModalProps {
  photos: MemoryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = currentIndex !== null ? photos[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(nextIndex);
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIndex);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, handleNext, handlePrev]);

  if (currentIndex === null || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl select-none"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng ảnh"
          className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all hover:scale-105"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Minimalist Photo Counter */}
        <div className="absolute top-6 left-6 z-40 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-pink-200 font-mono tracking-widest">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Ảnh trước"
          className="absolute left-3 sm:left-6 z-40 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-pink-600/70 border border-white/20 text-white transition-all transform hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Ảnh kế tiếp"
          className="absolute right-3 sm:right-6 z-40 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-pink-600/70 border border-white/20 text-white transition-all transform hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Pure Photo Container */}
        <motion.div
          key={currentPhoto.id}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative max-w-5xl max-h-[88vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(244,114,182,0.35)] border border-pink-400/40 bg-black/40 p-1 sm:p-2">
            <img
              src={currentPhoto.url}
              alt={`Ảnh kỷ niệm ${currentIndex + 1}`}
              className="max-h-[82vh] w-auto max-w-[90vw] object-contain rounded-xl sm:rounded-2xl"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
