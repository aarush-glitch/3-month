'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Timer from '@/components/Timer';
import Carousel from '@/components/Carousel';
import Letter from '@/components/Letter';
import Proposal from '@/components/Proposal';
import MusicPlayer from '@/components/MusicPlayer';

// Phase definitions
const phases = [
  { id: 'hero', title: 'Welcome' },
  { id: 'timer', title: 'Our Time' },
  { id: 'reasons', title: 'Why You' },
  { id: 'letter', title: 'My Letter' },
  { id: 'proposal', title: 'The Question' },
];

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(0);

  const goToNext = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPhase = currentPhase + newDirection;
    if (newPhase >= 0 && newPhase < phases.length) {
      setPage([page + newDirection, newDirection]);
      setCurrentPhase(newPhase);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Floating hearts background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${Math.random() * 100}%`,
              y: '110%',
              opacity: 0.3
            }}
            animate={{
              y: '-10%',
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          >
            <Heart
              className="text-[var(--blush)]"
              size={40 + Math.random() * 40}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Main content area */}
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
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Phase 0: Hero */}
            {currentPhase === 0 && (
              <div className="text-center px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mb-6"
                >
                  <Heart
                    className="w-16 h-16 sm:w-20 sm:h-20 text-[var(--rose)] mx-auto heartbeat"
                    fill="currentColor"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-6xl font-bold text-[var(--text-primary)] mb-4"
                >
                  Hey, <span className="text-[var(--rose)]">Meethi</span> ✨
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[var(--text-secondary)] text-lg sm:text-xl mb-8"
                >
                  I made something for you. Try not to cringe.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-[var(--text-muted)] text-sm"
                >
                  Click the arrow to continue →
                </motion.p>
              </div>
            )}

            {/* Phase 1: Timer */}
            {currentPhase === 1 && (
              <div className="text-center px-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-8"
                >
                  You've successfully tolerated me for...
                </motion.h2>
                <Timer />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-[var(--text-muted)] mt-6 italic text-center"
                >
                  Yes I've been counting and yes hopefully this doesn't stop
                </motion.p>
              </div>
            )}

            {/* Phase 2: Reasons Carousel */}
            {currentPhase === 2 && (
              <div className="w-full max-w-2xl px-4">
                <Carousel />
              </div>
            )}

            {/* Phase 3: Letter */}
            {currentPhase === 3 && (
              <div className="w-full h-full flex items-center justify-center px-4 py-16">
                <Letter />
              </div>
            )}

            {/* Phase 4: Proposal */}
            {currentPhase === 4 && (
              <div className="w-full max-w-lg px-4">
                <Proposal />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-4">
        {/* Previous button */}
        <motion.button
          onClick={() => paginate(-1)}
          disabled={currentPhase === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full glass shadow-lg transition-all duration-300
                     ${currentPhase === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/80 cursor-pointer'}`}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--text-secondary)]" />
        </motion.button>

        {/* Phase indicators */}
        <div className="flex gap-2">
          {phases.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const dir = index > currentPhase ? 1 : -1;
                setPage([page + dir, dir]);
                setCurrentPhase(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentPhase
                ? 'bg-[var(--rose)] w-6'
                : 'bg-[var(--blush)] hover:bg-[var(--blush-dark)]'
                }`}
              aria-label={`Go to ${phases[index].title}`}
            />
          ))}
        </div>

        {/* Next button */}
        <motion.button
          onClick={() => paginate(1)}
          disabled={currentPhase === phases.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full glass shadow-lg transition-all duration-300
                     ${currentPhase === phases.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/80 cursor-pointer'}`}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-[var(--text-secondary)]" />
        </motion.button>
      </div>

      {/* Footer - small credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-2 left-0 right-0 z-20 text-center"
      >
        <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-[var(--rose)] fill-current" /> for you
        </p>
      </motion.div>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}
