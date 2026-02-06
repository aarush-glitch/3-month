'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Skull, Coffee, Gamepad2, Brain, Sparkles } from 'lucide-react';

interface ReasonCard {
    id: number;
    reason: string;
    icon: React.ReactNode;
    gradient: string;
}

const reasons: ReasonCard[] = [
    {
        id: 1,
        reason: "You laugh at my jokes even when they're terrible (which is often)",
        icon: <Skull className="w-8 h-8" />,
        gradient: "from-[var(--blush)] to-[var(--rose)]"
    },
    {
        id: 2,
        reason: "You pretend to understand my coding rants. Very convincing, 10/10",
        icon: <Coffee className="w-8 h-8" />,
        gradient: "from-[var(--sage)] to-[var(--sage-dark)]"
    },
    {
        id: 3,
        reason: "Your sarcasm actually keeps up with mine. Impressive",
        icon: <Brain className="w-8 h-8" />,
        gradient: "from-[var(--lavender)] to-[var(--blush-light)]"
    },
    {
        id: 4,
        reason: "You're somehow not annoyed by me yet. Suspicious but I'll take it",
        icon: <Gamepad2 className="w-8 h-8" />,
        gradient: "from-[var(--rose)] to-[var(--blush-dark)]"
    },
    {
        id: 5,
        reason: "Hanging out with you is... fine I guess. (It's actually great, don't tell anyone)",
        icon: <Sparkles className="w-8 h-8" />,
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
                Things I lowkey appreciate about you...
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
                            className="rounded-2xl p-6 sm:p-8 bg-white/90 backdrop-blur-sm border border-[var(--blush)] 
                         shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="text-[var(--rose)] p-3 bg-[var(--blush-light)] rounded-full"
                                >
                                    {reasons[currentIndex].icon}
                                </motion.div>
                                <p className="text-[var(--text-primary)] text-base sm:text-lg font-medium leading-relaxed">
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
