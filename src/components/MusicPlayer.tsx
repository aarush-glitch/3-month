'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Pause } from 'lucide-react';

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Attempt autoplay on mount and on first user interaction
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const attemptAutoplay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
                setHasStarted(true);
            } catch {
                // Autoplay blocked - will play on first interaction
            }
        };

        // Try autoplay immediately
        attemptAutoplay();

        // Also try on any user interaction if autoplay was blocked
        const handleInteraction = () => {
            if (!hasStarted && audio) {
                audio.play().then(() => {
                    setIsPlaying(true);
                    setHasStarted(true);
                }).catch(() => { });
            }
        };

        document.addEventListener('click', handleInteraction, { once: true });
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('scroll', handleInteraction, { once: true });
        document.addEventListener('keydown', handleInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('scroll', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
    }, [hasStarted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
            setHasStarted(true);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            {/* Audio Element - autoplay enabled */}
            <audio
                ref={audioRef}
                loop
                preload="auto"
                autoPlay
                onPlay={() => { setIsPlaying(true); setHasStarted(true); }}
                onPause={() => setIsPlaying(false)}
            >
                <source src="/ordinary.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Music Player UI - minimal, only shows controls */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed top-6 right-6 z-40"
            >
                <div className="flex items-center gap-2">
                    {/* Controls */}
                    <div className="flex items-center gap-1 glass rounded-full p-1">
                        {/* Pause button (only show when playing) */}
                        <motion.button
                            onClick={togglePlay}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-3 rounded-full transition-colors duration-300
                         ${isPlaying
                                    ? 'bg-[var(--rose)] text-white'
                                    : 'bg-[var(--blush-light)] text-[var(--text-secondary)]'
                                }`}
                            aria-label={isPlaying ? 'Pause music' : 'Play music'}
                        >
                            <Pause className="w-5 h-5" />
                        </motion.button>

                        {/* Mute button */}
                        <motion.button
                            onClick={toggleMute}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-full bg-[var(--cream)] text-[var(--text-secondary)]
                        hover:bg-[var(--blush-light)] transition-colors duration-300"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                            ) : (
                                <Volume2 className="w-4 h-4" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Now playing indicator */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-8 right-0 glass rounded-full px-3 py-1
                        text-xs text-[var(--text-muted)] whitespace-nowrap"
                        >
                            <span className="flex items-center gap-1">
                                <span className="flex gap-0.5">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            className="w-0.5 bg-[var(--rose)] rounded-full"
                                            animate={{
                                                height: ['8px', '12px', '8px']
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: i * 0.1,
                                                repeat: Infinity
                                            }}
                                        />
                                    ))}
                                </span>
                                Ordinary - Alex Warren
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
