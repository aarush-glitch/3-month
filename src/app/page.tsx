'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Timer from '@/components/Timer';
import Carousel from '@/components/Carousel';
import Letter from '@/components/Letter';
import VoiceNotes from '@/components/Proposal';
import MusicPlayer from '@/components/MusicPlayer';
import BabysBreath from '@/components/BabysBreath';
import PasswordGate from '@/components/PasswordGate';

// Phase definitions
const phases = [
  { id: 'hero',        title: 'Welcome'   },
  { id: 'timer',       title: 'Our Time'  },
  { id: 'reasons',     title: 'Still You' },
  { id: 'letter',      title: 'My Letter' },
  { id: 'voicenotes',  title: 'For You'   },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const paginate = (newDirection: number) => {
    const newPhase = currentPhase + newDirection;
    if (newPhase >= 0 && newPhase < phases.length) {
      setPage([page + newDirection, newDirection]);
      setCurrentPhase(newPhase);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">

      {/* ── Baby's Breath corners (fixed, decorative) ── */}
      <BabysBreath className="babys-breath-fixed-bl" />
      <BabysBreath className="babys-breath-fixed-tr" />

      {/* ── Ambient orbs background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { w: 340, x: '8%',  y: '12%', colorA: 'rgba(192,122,80,0.10)',  colorB: 'transparent', dur: 12 },
          { w: 260, x: '72%', y: '58%', colorA: 'rgba(123,79,110,0.07)', colorB: 'transparent', dur: 16 },
          { w: 200, x: '35%', y: '75%', colorA: 'rgba(140,175,126,0.08)', colorB: 'transparent', dur: 10 },
          { w: 280, x: '80%', y: '8%',  colorA: 'rgba(192,122,80,0.07)',  colorB: 'transparent', dur: 14 },
          { w: 160, x: '20%', y: '45%', colorA: 'rgba(140,175,126,0.06)', colorB: 'transparent', dur: 18 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  `${orb.w}px`,
              height: `${orb.w}px`,
              left:   orb.x,
              top:    orb.y,
              background: `radial-gradient(circle, ${orb.colorA} 0%, ${orb.colorB} 70%)`,
            }}
            animate={{
              y:       [0, -18, 0],
              x:       [0, 12, 0],
              opacity: [0.4, 0.75, 0.4],
              scale:   [1, 1.08, 1],
            }}
            transition={{
              duration: orb.dur,
              repeat:   Infinity,
              delay:    i * 2.5,
              ease:     'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Main slides ── */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPhase}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x:       { type: 'spring', stiffness: 280, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* ── Phase 0: Hero ── */}
            {currentPhase === 0 && (
              <div className="text-center px-6 max-w-lg">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="mb-6"
                >
                  <Heart
                    className="w-14 h-14 sm:w-18 sm:h-18 mx-auto heartbeat"
                    style={{ color: 'var(--amber)' }}
                    fill="currentColor"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-6xl font-bold text-[var(--text-primary)] mb-3"
                >
                  Hey,{' '}
                  <span style={{ color: 'var(--amber)' }}>Meethi</span>{' '}
                  <span className="font-handwritten text-3xl sm:text-5xl" style={{ color: 'var(--stem)' }}>🌿</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[var(--text-secondary)] text-lg sm:text-xl mb-3 leading-relaxed"
                >
                  Three months of the best kind of chaos.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-[var(--text-muted)] text-sm mb-8"
                >
                  I made this for you. Fair warning — it&apos;s a lot.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
                  transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
                  className="text-[var(--text-muted)] text-sm"
                >
                  Click the arrow to continue →
                </motion.p>
              </div>
            )}

            {/* ── Phase 1: Timer ── */}
            {currentPhase === 1 && (
              <div className="text-center px-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-2"
                >
                  We&apos;ve been <span style={{ color: 'var(--amber)' }}>us</span> for...
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-[var(--text-muted)] mb-8 tracking-widest uppercase"
                >
                  Jan 12, 2026 → Today
                </motion.p>
                <Timer />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-sm text-[var(--text-muted)] mt-6 italic"
                >
                  Every single second has counted ✨
                </motion.p>
              </div>
            )}

            {/* ── Phase 2: Carousel ── */}
            {currentPhase === 2 && (
              <div className="w-full max-w-2xl px-4">
                <Carousel />
              </div>
            )}

            {/* ── Phase 3: Letter ── */}
            {currentPhase === 3 && (
              <div className="w-full h-full flex items-center justify-center px-4 py-16">
                <Letter />
              </div>
            )}

            {/* ── Phase 4: Voice Notes ── */}
            {currentPhase === 4 && (
              <div className="w-full h-full overflow-y-auto flex items-start justify-center px-4 pt-6 pb-24">
                <VoiceNotes />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-4">
        <motion.button
          onClick={() => paginate(-1)}
          disabled={currentPhase === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full glass shadow-lg transition-all duration-300
            ${currentPhase === 0 ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--text-secondary)]" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {phases.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const dir = index > currentPhase ? 1 : -1;
                setPage([page + dir, dir]);
                setCurrentPhase(index);
              }}
              className={`h-2 rounded-full transition-all duration-300
                ${index === currentPhase
                  ? 'w-6 bg-[var(--amber)]'
                  : 'w-2 bg-[var(--blush)] hover:bg-[var(--blush-dark)]'
                }`}
              aria-label={`Go to ${phases[index].title}`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => paginate(1)}
          disabled={currentPhase === phases.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full glass shadow-lg transition-all duration-300
            ${currentPhase === phases.length - 1 ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-[var(--text-secondary)]" />
        </motion.button>
      </div>

      {/* ── Footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-2 left-0 right-0 z-20 text-center pointer-events-none"
      >
        <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
          3 months of <Heart className="w-3 h-3 fill-current" style={{ color: 'var(--amber)' }} /> for you
        </p>
      </motion.div>

      {/* ── Music Player ── */}
      <MusicPlayer />
    </div>
  );
}
