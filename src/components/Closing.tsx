'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Closing() {
  const [answered, setAnswered] = useState(false);
  const [tapped, setTapped] = useState<string | null>(null);

  const handleAnswer = (label: string) => {
    setTapped(label);
    setTimeout(() => setAnswered(true), 300);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto w-full">

      {/* ── Question state ── */}
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8 w-full"
          >
            {/* Decorative line */}
            <motion.div
              className="h-px w-12"
              style={{ background: 'var(--amber-pale)' }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            {/* Question */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4">
                one last thing
              </p>
              <h2
                className="font-handwritten leading-snug"
                style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}
              >
                Still glad you gave{' '}
                <span style={{ color: 'var(--amber)' }}>this</span> a shot?
              </h2>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex gap-4 flex-wrap justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: 'Yes 🧡', id: 'yes' },
                { label: 'Obv yes 😭', id: 'obv' },
              ].map(({ label, id }) => (
                <motion.button
                  key={id}
                  id={`closing-${id}`}
                  onClick={() => handleAnswer(label)}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  animate={tapped === label ? { scale: 0.9, opacity: 0.6 } : {}}
                  className="px-7 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-shadow duration-200"
                  style={
                    id === 'obv'
                      ? {
                          background: 'linear-gradient(135deg, var(--amber-light), var(--amber))',
                          color: '#FBF6EF',
                          boxShadow: '0 4px 18px rgba(192,122,80,0.28)',
                        }
                      : {
                          background: 'rgba(251,246,239,0.72)',
                          border: '1.5px solid rgba(192,122,80,0.28)',
                          color: 'var(--text-secondary)',
                          backdropFilter: 'blur(8px)',
                        }
                  }
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              className="h-px w-12"
              style={{ background: 'var(--amber-pale)' }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </motion.div>
        ) : (

          /* ── Response state ── */
          <motion.div
            key="response"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 18, delay: 0.05 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Beating heart */}
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart
                className="w-12 h-12"
                style={{ color: 'var(--amber)', fill: 'var(--amber)' }}
              />
            </motion.div>

            {/* Response text */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p
                className="font-handwritten leading-relaxed"
                style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.6rem, 5.5vw, 2.25rem)' }}
              >
                Good.
              </p>
              <p
                className="font-handwritten leading-relaxed"
                style={{ color: 'var(--amber)', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}
              >
                Because I&apos;m not going anywhere either.
              </p>
            </motion.div>

            {/* Subtext */}
            <motion.p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Happy 3 months, Meethi. 🧡<br />
              <span className="text-xs italic">Here&apos;s to a lot more of this.</span>
            </motion.p>

            {/* Bottom rule */}
            <motion.div
              className="h-px"
              style={{ background: 'var(--amber-pale)' }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
