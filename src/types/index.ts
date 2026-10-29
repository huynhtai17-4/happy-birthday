export interface RecipientConfig {
  name: string;
  nickname: string;
  birthDate: string; // Format: YYYY-MM-DD
  birthYear?: number;
  timezone?: string;
}

export interface SenderConfig {
  name: string;
  nickname: string;
}

export interface HeroConfig {
  titleEn: string;
  subtitleEn: string;
  taglineEn: string;
  messageVi: string;
  subMessageVi: string;
  ctaText: string;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  tag?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface LetterConfig {
  salutation: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}

export interface GiftConfig {
  ribbonColor: string;
  boxColor: string;
  surpriseTitle: string;
  surpriseMessage: string;
  subQuote: string;
}

export interface CelebrationConfig {
  cakeTitle: string;
  cakeSubtitle: string;
  wishPrompt: string;
  wishesPlaceholder: string;
  initialWishes: {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    starColor?: string;
  }[];
}

export interface AudioConfig {
  title: string;
  artist: string;
  src: string;
  autoPlayAfterGate: boolean;
  enableFallbackSynthesizer: boolean;
}

export interface BirthdayConfig {
  recipient: RecipientConfig;
  sender: SenderConfig;
  hero: HeroConfig;
  letter: LetterConfig;
  gift: GiftConfig;
  memories: MemoryPhoto[];
  celebration: CelebrationConfig;
  audio: AudioConfig;
}

