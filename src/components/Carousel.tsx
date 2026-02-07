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
    {
        id: 1,
        reason: "You actually listen to my rants. Questionable decision on your part tbh",
        image: "/images/3.jpg", // "I love talking with you"
        tone: 'funny'
    },
    {
        id: 2,
        reason: "You make me feel like I can do anything. And I genuinely mean that.",
        image: "/images/4.jpg", // "With you / Without you"
        tone: 'intense'
    },
    {
        id: 3,
        reason: "You're my safe place. Even when the world gets loud",
        image: "/images/9.jpg", // "My safe place"
        tone: 'intense'
    },
    {
        id: 4,
        reason: "Your hugs? Soft + warm. Certified life-size teddy material",
        image: "/images/17.jpg", // "Life size teddy"
        tone: 'funny'
    },
    {
        id: 5,
        reason: "Everything genuinely looks better when you're around. Not exaggerating",
        image: "/images/8.jpg", // "Everything's looking better with you"
        tone: 'soft'
    },
    {
        id: 6,
        reason: "We balance each other out. Your chaos + mine = somehow works",
        image: "/images/13.jpg", // Two negatives = positive
        tone: 'funny'
    },
    {
        id: 7,
        reason: "I want to build something real with you. No pressure though 👀",
        image: "/images/11.jpg", // Building a home together
        tone: 'soft'
    },
    {
        id: 8,
        reason: "You make me want to be better. For you, and for myself.",
        image: "/images/14.jpg", // "You can do it → I can do it"
        tone: 'intense'
    },
    {
        id: 9,
        reason: "Being around you feels calm. Like, suspiciously peaceful",
        image: "/images/18.jpg", // "Feel so calm"
        tone: 'soft'
    },
    {
        id: 10,
        reason: "You light me up. Even on the worst days",
        image: "/images/19.jpg", // Brightening moods
        tone: 'intense'
    }
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
    })
};

export default function Carousel() {
    const [[page, direction], setPage] = useState([0, 0]);

    const currentIndex = ((page % reasons.length) + reasons.length) % reasons.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };

    const currentReason = reasons[currentIndex];

    return (
        <div className="w-full max-w-lg mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-lg sm:text-xl text-[var(--text-secondary)] mb-6 font-medium"
            >
                Things I lowkey appreciate about you...
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
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
                    >
                        <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* Image */}
                            <div className="relative h-[280px] sm:h-[320px] w-full bg-[var(--cream)]">
                                <Image
                                    src={currentReason.image}
                                    alt={currentReason.reason}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>

                            {/* Text */}
                            <div className={`p-4 sm:p-5 ${currentReason.tone === 'intense'
                                ? 'bg-gradient-to-r from-[var(--rose-light)] to-[var(--blush-light)]'
                                : currentReason.tone === 'funny'
                                    ? 'bg-[var(--sage-light)]'
                                    : 'bg-[var(--cream)]'
                                }`}>
                                <p className={`text-sm sm:text-base leading-relaxed text-center ${currentReason.tone === 'intense'
                                    ? 'text-[var(--text-primary)] font-medium'
                                    : 'text-[var(--text-secondary)]'
                                    }`}>
                                    {currentReason.reason}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10
                     glass rounded-full p-2 sm:p-3 text-[var(--text-secondary)]
                     hover:bg-white/80 transition-all duration-300 hover:scale-110"
                    aria-label="Previous reason"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10
                     glass rounded-full p-2 sm:p-3 text-[var(--text-secondary)]
                     hover:bg-white/80 transition-all duration-300 hover:scale-110"
                    aria-label="Next reason"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {reasons.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-[var(--rose)] w-6'
                            : 'bg-[var(--blush)] hover:bg-[var(--blush-dark)]'
                            }`}
                        aria-label={`Go to reason ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
