'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ReasonCard {
  id: number;
  reason: string;
  image: string;
  tone: 'funny' | 'intense' | 'soft';
}

const reasons: ReasonCard[] = [
  { id: 1, reason: "You're the most annoyingly cute person I've ever met seriouslyy.", image: '/images/x3.jpg', tone: 'funny' },
  { id: 2, reason: "You have the most gorgeous smile I've ever seen even if they're fake lol.", image: '/images/x4.jpg', tone: 'intense' },
  { id: 3, reason: "You're my safe place. Even when the world gets loud.", image: '/images/x9.jpg', tone: 'intense' },
  { id: 4, reason: "Your hugs? Soft + warm. Certified life-size teddy material.", image: '/images/x17.jpg', tone: 'funny' },
  { id: 5, reason: "Random fact. I love kissing you and I cant get enough of it.", image: '/images/x81.jpg', tone: 'soft' },
  { id: 6, reason: "We balance each other out. Your chaos + mine = somehow it works.", image: '/images/x13.jpg', tone: 'funny' },
  { id: 7, reason: "I just included this dirty mirror picture coz I wanted to 👀", image: '/images/x11.jpg', tone: 'soft' },
  { id: 8, reason: "You make me want to be better. For you, and for myself.", image: '/images/x14.jpeg', tone: 'intense' },
  { id: 9, reason: "Being around you feels calm. Like I'm finally home.", image: '/images/x18.JPG', tone: 'soft' },
  { id: 10, reason: "You light me up. Even on the worst days.", image: '/images/x19.jpg', tone: 'intense' },
];

const cardStyle: Record<ReasonCard['tone'], string> = {
  intense: 'bg-gradient-to-br from-[#F2DBC8] to-[#F7EDE4]',
  funny: 'bg-[#EBF3E8]',
  soft: 'bg-[#FBF6EF]',
};

const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
const THRESHOLD = 10000;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0, scale: 0.82 }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 280 : -280, opacity: 0, scale: 0.82 }),
};

export default function Carousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const currentIndex = ((page % reasons.length) + reasons.length) % reasons.length;
  const current = reasons[currentIndex];

  const paginate = (d: number) => setPage([page + d, d]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -THRESHOLD) paginate(1);
    else if (swipe > THRESHOLD) paginate(-1);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-lg sm:text-xl text-[var(--text-secondary)] mb-6 font-medium"
      >
        Things I love about you, three months in...
      </motion.h2>

      <div className="relative h-[420px] sm:h-[450px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ background: 'var(--ivory)' }}>
              {/* Image */}
              <div className="relative h-[280px] sm:h-[320px] w-full bg-[var(--ivory-warm)]">
                <Image
                  src={current.image}
                  alt={current.reason}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Subtle warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Text panel */}
              <div className={`p-4 sm:p-5 ${cardStyle[current.tone]}`}>
                {/* Card counter */}
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-2">
                  {currentIndex + 1} / {reasons.length}
                </p>
                <p className={`text-sm sm:text-base leading-relaxed text-center
                  ${current.tone === 'intense'
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {current.reason}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10
            glass rounded-full p-2 sm:p-3 text-[var(--text-secondary)]
            hover:bg-white/80 transition-all duration-300 hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10
            glass rounded-full p-2 sm:p-3 text-[var(--text-secondary)]
            hover:bg-white/80 transition-all duration-300 hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reasons.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > currentIndex ? 1 : -1])}
            className={`h-2 rounded-full transition-all duration-300
              ${i === currentIndex
                ? 'w-6 bg-[var(--amber)]'
                : 'w-2 bg-[var(--blush)] hover:bg-[var(--blush-dark)]'
              }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
