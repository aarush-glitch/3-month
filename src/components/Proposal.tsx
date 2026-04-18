'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, Pause, X } from 'lucide-react';
import Image from 'next/image';
import { useMusicContext } from '@/context/MusicContext';

/* ─── Note + photo pairs ─── */
const notes = [
  {
    id: 'V1', src: '/vn/V1.m4a',
    label: 'When I was having a bad day', sublabel: 'You checked on me.',
    bgFrom: '#F2DBC8', bgTo: '#FAF0E8', accent: '#C07A50',
    photo: { src: '/images/P1.jpeg', caption: 'When you reminded me it was okay.' },
  },
  {
    id: 'V2', src: '/vn/V2.m4a',
    label: 'A random one', sublabel: 'Just you being you.',
    bgFrom: '#E4EDDF', bgTo: '#F0F7EC', accent: '#7AAF6A',
    photo: { src: '/images/P2.jpeg', caption: 'Your version of art 😄' },
  },
  {
    id: 'V3', src: '/vn/V3.m4a',
    label: 'You in your element', sublabel: 'I love this one.',
    bgFrom: '#F2DBC8', bgTo: '#FAF0E8', accent: '#C07A50',
    photo: { src: '/images/P3.JPG', caption: 'The day I understood I could handle this torture forever.' },
  },
  {
    id: 'V4', src: '/vn/V4.m4a',
    label: 'Before we were us', sublabel: '"I\'ll break your heart" 😂',
    bgFrom: '#EDE0F2', bgTo: '#F6F0FA', accent: '#9B6DB0',
    photo: { src: '/images/P4.JPG', caption: 'I want this girl to be happy always and on top of the world.' },
  },
  {
    id: 'V5', src: '/vn/V6.m4a',
    label: 'Something silly', sublabel: 'Couldn\'t not save this.',
    bgFrom: '#E4EDDF', bgTo: '#F0F7EC', accent: '#7AAF6A',
    photo: { src: '/images/P5.jpg', caption: 'The day I should\'ve fallen in love with you.' },
  },
  {
    id: 'V6', src: '/vn/V5.m4a',
    label: 'One more thing...', sublabel: 'I\'m in love with everything about you.',
    bgFrom: '#F0DBC8', bgTo: '#FAF0E8', accent: '#9A5E35',
    photo: { src: '/images/P6.jpg', caption: 'The day I fell in love with that smile.' },
  },
] as const;

type NoteId = (typeof notes)[number]['id'];

/* ─── Compact waveform ─── */
function Waveform({ playing, accent }: { playing: boolean; accent: string }) {
  return (
    <div className="flex items-end gap-[2px] h-4 mt-2">
      {[0.5, 0.9, 0.6, 1.0, 0.7].map((base, i) => (
        <motion.div
          key={i}
          style={{ background: accent, borderRadius: 2, width: 2.5 }}
          animate={playing ? { height: [`3px`, `${base * 14}px`, `3px`] } : { height: '3px' }}
          transition={{ duration: 0.5 + i * 0.06, repeat: playing ? Infinity : 0, delay: i * 0.09, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Full-screen photo reveal (auto-dismisses after 4s) ─── */
function PhotoReveal({
  photo, accent, onClose,
}: {
  photo: { src: string; caption: string };
  accent: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [onClose]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ background: 'rgba(44,27,14,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{ background: accent, color: '#fff' }}
      >
        ✦ Photo Unlocked
      </motion.div>

      <motion.div
        initial={{ scale: 0.74, opacity: 0, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, rotate: 1.5 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.15 }}
        className="polaroid"
        style={{ maxWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-[288px] h-[288px] rounded-sm overflow-hidden bg-white">
          <Image src={photo.src} alt={photo.caption} fill className="object-contain" />
        </div>
        <p className="font-handwritten text-lg text-[var(--text-secondary)] text-center mt-3 leading-snug px-2">
          {photo.caption}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-6 text-xs text-white/50 tracking-wide"
      >
        Tap anywhere to continue
      </motion.p>

      {/* Auto-dismiss progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{ background: accent }}
        initial={{ width: '100%' }} animate={{ width: '0%' }}
        transition={{ duration: 6, ease: 'linear' }}
      />
    </motion.div>
  );
}

/* ─── Lightbox (tap photo in bottom grid) ─── */
function Lightbox({ photo, onClose }: { photo: { src: string; caption: string }; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(44,27,14,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.82, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="relative max-w-xs w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'var(--ivory)', color: 'var(--text-secondary)' }}
        >
          <X className="w-4 h-4" />
        </button>
        <div className="polaroid">
          <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-white">
            <Image src={photo.src} alt={photo.caption} fill className="object-contain" />
          </div>
          <p className="font-handwritten text-base text-[var(--text-secondary)] text-center mt-3 leading-snug px-1">
            {photo.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function VoiceNotes() {
  const { fadeToBackground, restoreVolume } = useMusicContext();

  const [playingId, setPlayingId] = useState<NoteId | null>(null);
  const [playedIds, setPlayedIds] = useState<Set<NoteId>>(new Set());
  const [revealModal, setRevealModal] = useState<{ src: string; caption: string; accent: string } | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  const audioMap = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    notes.forEach(note => {
      const audio = new Audio(note.src);
      audio.preload = 'metadata';
      audio.addEventListener('ended', () => {
        setPlayingId(prev => (prev === note.id ? null : prev));
        // Music stays faded — user must manually dismiss or play again
      });
      audioMap.current.set(note.id, audio);
    });
    return () => {
      audioMap.current.forEach(a => { a.pause(); a.src = ''; });
      restoreVolume();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = useCallback(
    (id: NoteId) => {
      const audio = audioMap.current.get(id);
      if (!audio) return;

      if (playingId && playingId !== id) {
        audioMap.current.get(playingId)?.pause();
      }

      if (playingId === id) {
        audio.pause();
        setPlayingId(null);
        restoreVolume();
      } else {
        const isFirstTime = !playedIds.has(id);
        audio.currentTime = 0;
        audio.play().catch(err => console.warn('VN play error:', err));
        setPlayingId(id);
        setPlayedIds(prev => new Set([...prev, id]));
        fadeToBackground();

        if (isFirstTime) {
          const note = notes.find(n => n.id === id)!;
          setTimeout(() => {
            setRevealModal({ src: note.photo.src, caption: note.photo.caption, accent: note.accent });
          }, 350);
        }
      }
    },
    [playingId, playedIds, fadeToBackground, restoreVolume],
  );

  const unlockedCount = playedIds.size;
  const allPlayed = unlockedCount >= notes.length;

  /* Ordered unlocked photos for the bottom gallery */
  const unlockedPhotos = notes
    .filter(n => playedIds.has(n.id))
    .map(n => ({ id: n.id, accent: n.accent, ...n.photo }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center gap-5 pb-4"
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center pt-2 w-full"
      >
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-1.5">
          One last thing, before you go
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          I saved these.{' '}
          <span style={{ color: 'var(--amber)' }}>For you.</span>
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Each note unlocks a photo. 🌿
        </p>
      </motion.div>

      {/* ── Note cards in 2×3 grid ── */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {notes.map((note, i) => {
          const isPlaying = playingId === note.id;
          const hasPlayed = playedIds.has(note.id);

          return (
            <motion.button
              key={note.id}
              onClick={() => handleToggle(note.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="text-left rounded-2xl p-3.5 border border-white/70 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${note.bgFrom}, ${note.bgTo})`,
                boxShadow: isPlaying
                  ? `0 0 0 2px ${note.accent}, 0 6px 20px ${note.accent}30`
                  : '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              {/* Top row: mic + play button */}
              <div className="flex items-center justify-between mb-2">
                <Mic
                  className="w-3.5 h-3.5"
                  style={{ color: isPlaying ? note.accent : 'var(--text-muted)' }}
                />
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.14, 1] } : { scale: 1 }}
                  transition={{ duration: 0.9, repeat: isPlaying ? Infinity : 0 }}
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
                  style={{
                    background: isPlaying ? note.accent : 'rgba(255,255,255,0.80)',
                    color: isPlaying ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {isPlaying
                    ? <Pause className="w-3 h-3" />
                    : <Play className="w-3 h-3 ml-px" />
                  }
                </motion.div>
              </div>

              {/* Label */}
              <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                {note.label}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-snug">
                {note.sublabel}
              </p>

              {/* Waveform */}
              <Waveform playing={isPlaying} accent={note.accent} />

              {/* Unlocked badge */}
              {hasPlayed && !isPlaying && (
                <p className="mt-1.5 text-[9px] opacity-55" style={{ color: note.accent }}>
                  ✓ unlocked
                </p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Photo row at the bottom — side by side, adds one per note ── */}
      <AnimatePresence>
        {unlockedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
              {unlockedCount} of {notes.length} unlocked
            </p>

            {/* Horizontal scroll row */}
            <div className="flex gap-3 overflow-x-auto pb-3 w-full" style={{ scrollbarWidth: 'none' }}>
              <AnimatePresence>
                {unlockedPhotos.map((photo, i) => (
                  <motion.button
                    key={photo.id}
                    onClick={() => setLightbox({ src: photo.src, caption: photo.caption })}
                    initial={{ opacity: 0, scale: 0.78, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.78 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    whileHover={{ scale: 1.04, rotate: 0 }}
                    whileTap={{ scale: 0.95 }}
                    className="polaroid flex-shrink-0 group"
                    style={{ rotate: `${i % 2 === 0 ? -2 : 2}deg` } as React.CSSProperties}
                    aria-label={`Open photo: ${photo.caption}`}
                  >
                    <div className="relative w-[100px] h-[100px] rounded-sm overflow-hidden bg-white">
                      <Image src={photo.src} alt={photo.caption} fill className="object-contain" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                    </div>
                    {/* Accent dot */}
                    <div
                      className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                      style={{ background: photo.accent }}
                    />
                    <p className="font-handwritten text-[0.7rem] text-[var(--text-secondary)] text-center mt-2 leading-tight px-0.5 max-w-[100px]">
                      {photo.caption}
                    </p>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── All played nudge ── */}
      <AnimatePresence>
        {allPlayed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-center italic"
            style={{ color: 'var(--text-muted)' }}
          >
            That&apos;s all of them. Keep going → 🧡
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Photo reveal modal ── */}
      <AnimatePresence>
        {revealModal && (
          <PhotoReveal
            photo={{ src: revealModal.src, caption: revealModal.caption }}
            accent={revealModal.accent}
            onClose={() => setRevealModal(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
