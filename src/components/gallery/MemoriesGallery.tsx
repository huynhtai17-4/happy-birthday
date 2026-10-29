import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Heart } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { LightboxModal } from './LightboxModal';
import { MemoryPhoto } from '../../types';

interface MemoriesGalleryProps {
  memories: MemoryPhoto[];
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ memories }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Gentle rotations for natural photobook vibe
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-2', 'rotate-1'];

  return (
    <section id="memories-section" className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto select-none">
      <SectionHeader
        badge="OUR MEMORIES"
        title="Thước Phim Tình Yêu"
        subtitle="Những khoảnh khắc ngọt ngào và đáng nhớ nhất của chúng mình"
      />

      {/* Pure Photo Gallery Grid (Clean, Luxurious, Focus 100% on Photos) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10">
        {memories.map((photo, index) => {
          const rotationClass = rotations[index % rotations.length];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-white/10 via-pink-500/5 to-purple-900/30 backdrop-blur-md border border-pink-400/30 shadow-xl hover:shadow-[0_20px_50px_rgba(236,72,153,0.4)] hover:border-pink-300/70 transition-all duration-300 ${rotationClass} hover:rotate-0`}
            >
              {/* Photo Container: PURE PHOTO */}
              <div className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
                <img
                  src={photo.url}
                  alt={`Kỷ niệm ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle romantic ambient vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Delicate expand pill icon on hover */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 group-hover:text-pink-200 group-hover:bg-pink-600/80 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Gentle heart badge in center on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-pink-500/30 backdrop-blur-md border border-pink-300/50 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Heart className="w-6 h-6 text-white fill-white/80 drop-shadow" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={memories}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(idx) => setSelectedPhotoIndex(idx)}
      />
    </section>
  );
};
