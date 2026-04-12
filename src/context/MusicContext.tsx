'use client';

import { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';

interface MusicContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  fadeToBackground: () => void;
  restoreVolume: () => void;
  isVoicePlaying: boolean;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef        = useRef<HTMLAudioElement | null>(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const fadeToBackground = useCallback(() => {
    setIsVoicePlaying(true);
    const audio = audioRef.current;
    if (audio) audio.muted = true;
  }, []);

  const restoreVolume = useCallback(() => {
    setIsVoicePlaying(false);
    const audio = audioRef.current;
    if (audio) audio.muted = false;
  }, []);

  return (
    <MusicContext.Provider value={{ audioRef, fadeToBackground, restoreVolume, isVoicePlaying }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusicContext must be used within MusicProvider');
  return ctx;
}

