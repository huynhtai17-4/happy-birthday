import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { BirthdayCake } from './BirthdayCake';
import { FireworksCanvas } from './FireworksCanvas';
import { WishesConstellation } from './WishesConstellation';
import { CelebrationConfig } from '../../types';

interface CelebrationSectionProps {
  celebration: CelebrationConfig;
  senderName: string;
}

export const CelebrationSection: React.FC<CelebrationSectionProps> = ({ celebration, senderName }) => {
  return (
    <section id="celebration-section" className="py-24 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto space-y-16 select-none">
      <SectionHeader
        badge="LET'S CELEBRATE"
        title="Bữa Tiệc Sinh Nhật Tinh Tú"
        subtitle="Cùng nhau thổi nến, thắp sáng bầu trời đêm bằng pháo hoa và gửi những điều ước ngọt ngào nhất"
      />

      {/* Birthday Cake Interactive */}
      <BirthdayCake
        cakeTitle={celebration.cakeTitle}
        cakeSubtitle={celebration.cakeSubtitle}
      />

      {/* Fireworks Canvas Interactive */}
      <FireworksCanvas />

      {/* Wishes Constellation Interactive */}
      <WishesConstellation
        celebration={celebration}
        senderName={senderName}
      />
    </section>
  );
};

