'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock } from 'lucide-react';
import BabysBreath from './BabysBreath';

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = 'Ihateyousomuchxyz';

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [hint, setHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === CORRECT_PASSWORD) {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 1200);
    } else {
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <AnimatePresence>
      {!unlocking ? (
        <motion.div
          key="gate"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* ── Ambient orbs (same as main page) ── */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[
              { w: 340, x: '8%', y: '12%', colorA: 'rgba(192,122,80,0.10)', dur: 12 },
              { w: 260, x: '72%', y: '58%', colorA: 'rgba(123,79,110,0.07)', dur: 16 },
              { w: 200, x: '35%', y: '75%', colorA: 'rgba(140,175,126,0.08)', dur: 10 },
              { w: 280, x: '80%', y: '8%', colorA: 'rgba(192,122,80,0.07)', dur: 14 },
              { w: 160, x: '20%', y: '45%', colorA: 'rgba(140,175,126,0.06)', dur: 18 },
            ].map((orb, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${orb.w}px`,
                  height: `${orb.w}px`,
                  left: orb.x,
                  top: orb.y,
                  background: `radial-gradient(circle, ${orb.colorA} 0%, transparent 70%)`,
                }}
                animate={{ y: [0, -18, 0], x: [0, 12, 0], opacity: [0.4, 0.75, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: orb.dur, repeat: Infinity, delay: i * 2.5, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* ── Baby's Breath corners ── */}
          <BabysBreath className="babys-breath-fixed-bl" />
          <BabysBreath className="babys-breath-fixed-tr" />

          {/* ── Card ── */}
          <motion.div
            className="relative z-10 glass rounded-3xl px-10 py-12 max-w-sm w-full mx-4 text-center"
            style={{ boxShadow: '0 8px 48px rgba(192,122,80,0.13), 0 2px 12px rgba(0,0,0,0.06)' }}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Lock icon */}
            <motion.div
              className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(192,122,80,0.12)', border: '1.5px solid rgba(192,122,80,0.25)' }}
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Lock className="w-6 h-6" style={{ color: 'var(--amber)' }} />
            </motion.div>

            <motion.h1
              className="text-2xl font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hey,{' '}
              <span style={{ color: 'var(--amber)' }}>Meethi</span>{' '}
              <span className="font-handwritten text-xl" style={{ color: 'var(--stem)' }}>🌿</span>
            </motion.h1>

            <motion.p
              className="text-sm mb-8 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Something special is waiting for you.<br />
              You know the key 🔑
            </motion.p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <motion.div
                animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <input
                  ref={inputRef}
                  type="password"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="Type the password..."
                  autoComplete="off"
                  id="password-input"
                  className="w-full rounded-2xl px-5 py-3.5 text-sm outline-none text-center tracking-widest"
                  style={{
                    background: 'rgba(251,246,239,0.7)',
                    border: shake
                      ? '1.5px solid rgba(192,80,80,0.55)'
                      : '1.5px solid rgba(192,122,80,0.30)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-outfit), Outfit, sans-serif',
                    boxShadow: 'inset 0 2px 8px rgba(192,122,80,0.06)',
                    transition: 'border-color 0.2s',
                  }}
                />
              </motion.div>

              {shake && (
                <motion.p
                  className="text-xs -mt-2"
                  style={{ color: 'rgba(192,80,80,0.8)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Hmm, that&apos;s not it 🙈
                </motion.p>
              )}

              <motion.button
                type="submit"
                id="unlock-button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-2xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--amber-light), var(--amber))',
                  color: '#FBF6EF',
                  boxShadow: '0 4px 16px rgba(192,122,80,0.25)',
                  fontFamily: 'var(--font-outfit), Outfit, sans-serif',
                }}
              >
                Unlock ✨
              </motion.button>
            </form>

            {/* Hint toggle */}
            <button
              onClick={() => setHint(h => !h)}
              className="mt-5 text-xs underline-offset-2 hover:underline transition-opacity"
              style={{ color: 'var(--text-muted)', opacity: 0.7 }}
            >
              {hint ? 'Hide hint' : 'Need a hint?'}
            </button>

            <AnimatePresence>
              {hint && (
                <motion.p
                  className="text-xs mt-2 italic font-handwritten text-lg"
                  style={{ color: 'var(--plum-light)' }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  It&apos;s something you say when you&apos;re actually obsessed 🙃
                </motion.p>
              )}
            </AnimatePresence>

            {/* Decorative hearts */}
            <div className="absolute -top-3 -right-3 pointer-events-none">
              <Heart className="w-6 h-6 heartbeat" style={{ color: 'var(--amber-light)', fill: 'var(--amber-light)', opacity: 0.5 }} />
            </div>
            <div className="absolute -bottom-3 -left-3 pointer-events-none">
              <Heart className="w-4 h-4 heartbeat" style={{ color: 'var(--plum-light)', fill: 'var(--plum-light)', opacity: 0.4 }} />
            </div>
          </motion.div>
        </motion.div>
      ) : (
        /* ── Unlock celebration overlay ── */
        <motion.div
          key="unlocking"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-full p-6 mb-4"
            style={{ background: 'rgba(192,122,80,0.15)' }}
          >
            <Unlock className="w-10 h-10" style={{ color: 'var(--amber)' }} />
          </motion.div>
          <motion.p
            className="text-xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            There she is 🧡
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
