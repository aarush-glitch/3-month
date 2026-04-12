'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useMusicContext } from '@/context/MusicContext';

export default function MusicPlayer() {
  const { audioRef } = useMusicContext();
  const [isPlaying, setIsPlaying]   = useState(false);
  const [isMuted, setIsMuted]       = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Start at 50% volume
    audio.volume = 0.5;

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch {
        // Autoplay blocked — will play on first interaction
      }
    };

    attemptAutoplay();

    const handleInteraction = () => {
      if (!hasStarted && audio) {
        audio.play()
          .then(() => { setIsPlaying(true); setHasStarted(true); })
          .catch(() => {});
      }
    };

    document.addEventListener('click',      handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('keydown',    handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click',      handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown',    handleInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
    setHasStarted(true);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* The actual audio element — owned here so the ref attaches */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={()  => { setIsPlaying(true);  setHasStarted(true); }}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/ordinary.mp3" type="audio/mpeg" />
      </audio>

      {/* Compact pill — sits at nav level, far right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-3 z-40"
      >
        <div className="flex items-center gap-0.5 glass rounded-full px-1 py-1 shadow-md">
          {/* Play / Pause */}
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors duration-300
              ${isPlaying
                ? 'bg-[var(--amber)] text-white'
                : 'bg-[var(--ivory-warm)] text-[var(--text-secondary)]'
              }`}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying
              ? <Pause  className="w-3.5 h-3.5" />
              : <Play   className="w-3.5 h-3.5 ml-0.5" />
            }
          </motion.button>

          {/* Mute */}
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-transparent text-[var(--text-muted)]
              hover:bg-[var(--ivory-warm)] transition-colors duration-300"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted
              ? <VolumeX className="w-3.5 h-3.5" />
              : <Volume2 className="w-3.5 h-3.5" />
            }
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
