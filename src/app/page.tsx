'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Timer from '@/components/Timer';
import Carousel from '@/components/Carousel';
import Letter from '@/components/Letter';
import Proposal from '@/components/Proposal';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating hearts background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
              size={20 + Math.random() * 30}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-4"
          >
            <Heart
              className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--rose)] mx-auto heartbeat"
              fill="currentColor"
            />
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] mb-2">
            Hey, <span className="text-[var(--rose)]">Meethi</span> ✨
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            I made something special for you...
          </p>
        </motion.section>

        {/* Timer Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <Timer />
        </motion.section>

        {/* Carousel Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-2xl mb-16 sm:mb-20"
        >
          <Carousel />
        </motion.section>

        {/* Letter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16 sm:mb-20"
        >
          <Letter />
        </motion.section>

        {/* Proposal Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="w-full max-w-lg mb-12"
        >
          <Proposal />
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-sm text-[var(--text-muted)] mt-8 pb-24"
        >
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-[var(--rose)] fill-current heartbeat" /> just for you
          </p>
        </motion.footer>
      </main>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}
