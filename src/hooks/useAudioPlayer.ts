import { useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine } from '../utils/soundEffects';

interface UseAudioPlayerProps {
  src: string;
  autoPlayAfterGate: boolean;
  enableFallbackSynthesizer: boolean;
}

export function useAudioPlayer({ src, autoPlayAfterGate, enableFallbackSynthesizer }: UseAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.src = src;
    audio.preload = 'metadata';
    audio.loop = true;
    audio.volume = volume;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsFallbackMode(false);
    };

    // When audio file fails to load or 404s
    const onError = () => {
      // Gracefully switch to synthesized melody without console breaking errors
      setIsFallbackMode(true);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('error', onError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('error', onError);
      audio.pause();
      soundEngine.stopFallbackMelody();
    };
  }, [src]);

  // Volume change sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    soundEngine.setMuted(isMuted);
  }, [volume, isMuted]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (audioRef.current && !isFallbackMode) {
        audioRef.current.pause();
      }
      soundEngine.stopFallbackMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current && !isFallbackMode) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Browser blocked or file not found -> switch to fallback synthesizer
              if (enableFallbackSynthesizer) {
                setIsFallbackMode(true);
                soundEngine.startFallbackMelody(volume);
                setIsPlaying(true);
              }
            });
        }
      } else if (enableFallbackSynthesizer) {
        setIsFallbackMode(true);
        soundEngine.startFallbackMelody(volume);
        setIsPlaying(true);
      }
    }
  }, [isPlaying, isFallbackMode, enableFallbackSynthesizer, volume]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const changeVolume = useCallback((val: number) => {
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    isFallbackMode,
    togglePlay,
    toggleMute,
    changeVolume,
  };
}

