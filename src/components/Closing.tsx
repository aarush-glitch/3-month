'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Closing() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 w-full"
      >
        {/* Top rule */}
        <motion.div
          className="h-px"
          style={{ background: 'var(--amber-pale)' }}
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Beating heart */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart
            className="w-10 h-10"
            style={{ color: 'var(--amber)', fill: 'var(--amber)' }}
          />
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] -mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          one last thing
        </motion.p>

        {/* The question — as a closing statement */}
        <motion.h2
          className="font-handwritten leading-snug"
          style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Okay but be honest,{' '}
          <span style={{ color: 'var(--amber)' }}>how would you describe these three months?</span>
        </motion.h2>

        {/* Bottom rule */}
        <motion.div
          className="h-px"
          style={{ background: 'var(--amber-pale)' }}
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Sign-off */}
        {/* <motion.p
          className="font-handwritten text-xl"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          — Forever and Always ♡
        </motion.p> */}
      </motion.div>
    </div>
  );
}
