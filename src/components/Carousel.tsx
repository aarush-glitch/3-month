'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star, Coffee, Music } from 'lucide-react';

interface ReasonCard {
    id: number;
    reason: string;
    icon: React.ReactNode;
    gradient: string;
}

const reasons: ReasonCard[] = [
    {
        id: 1,
        reason: "You have the most infectious laugh that lights up every room",
        icon: <Sparkles className="w-8 h-8" />,
        gradient: "from-[var(--blush)] to-[var(--rose)]"
    },
    {
        id: 2,
        reason: "You tolerate my coding addiction (and sometimes even pretend to be interested)",
        icon: <Coffee className="w-8 h-8" />,
        gradient: "from-[var(--sage)] to-[var(--sage-dark)]"
    },
    {
        id: 3,
        reason: "Every moment with you feels like a beautiful adventure",
        icon: <Star className="w-8 h-8" />,
        gradient: "from-[var(--lavender)] to-[var(--blush-light)]"
    },
    {
        id: 4,
        reason: "You make even the ordinary days feel extraordinary",
        icon: <Music className="w-8 h-8" />,
        gradient: "from-[var(--rose)] to-[var(--blush-dark)]"
    },
    {
        id: 5,
        reason: "Being with you just feels like home",
        icon: <Heart className="w-8 h-8" />,
        gradient: "from-[var(--blush-dark)] to-[var(--rose-dark)]"
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
        rotateY: direction > 0 ? 15 : -15
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
        rotateY: direction < 0 ? 15 : -15
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

    return (
        <div className="w-full max-w-lg mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-lg sm:text-xl text-[var(--text-secondary)] mb-6 font-medium"
            >
                A few reasons why I adore you...
            </motion.h2>

            <div className="relative h-[220px] sm:h-[200px] flex items-center justify-center perspective-1000">
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
                            rotateY: { duration: 0.3 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className={`absolute w-full max-w-sm cursor-grab active:cursor-grabbing`}
                    >
                        <div
                            className={`glass rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${reasons[currentIndex].gradient} 
                         shadow-lg hover:shadow-xl transition-shadow duration-300`}
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="text-white/90"
                                >
                                    {reasons[currentIndex].icon}
                                </motion.div>
                                <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                                    {reasons[currentIndex].reason}
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
            <div className="flex justify-center gap-2 mt-6">
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
