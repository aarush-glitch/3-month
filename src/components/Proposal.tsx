'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { sendYesNotification } from '@/lib/notification';

export default function Proposal() {
    const [saidYes, setSaidYes] = useState(false);
    const [yesScale, setYesScale] = useState(1);
    const [noAttempts, setNoAttempts] = useState(0);
    const [noPosition, setNoPosition] = useState({ x: 120, y: 0 });

    const maxScale = 8;
    const scaleIncrement = 0.8;

    const noButtonPhrases = [
        "No",
        "You sure?",
        "Really though?",
        "Think harder",
        "Wrong answer",
        "Try again",
        "Nope, try again",
        "...",
    ];

    const triggerConfetti = useCallback(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#f5d0c5', '#d4a5a5', '#b8c9b8', '#e6dff0', '#fbe8e3']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#f5d0c5', '#d4a5a5', '#b8c9b8', '#e6dff0', '#fbe8e3']
            });
        }, 250);
    }, []);

    const handleYes = async () => {
        setSaidYes(true);
        triggerConfetti();

        try {
            await sendYesNotification();
            console.log('Notification sent successfully!');
        } catch (error) {
            console.log('Notification not configured or failed:', error);
        }
    };

    const handleNoInteraction = () => {
        setYesScale(prev => Math.min(prev + scaleIncrement, maxScale));
        setNoAttempts(prev => Math.min(prev + 1, noButtonPhrases.length - 1));

        const maxX = 200;
        const maxY = 150;
        const newX = (Math.random() - 0.5) * maxX * 2;
        const newY = (Math.random() - 0.5) * maxY * 2;
        setNoPosition({ x: newX, y: newY });
    };

    const shouldHideNo = yesScale >= maxScale;

    if (saidYes) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex flex-col items-center gap-6 text-center py-8"
            >
                {/* Image 20 - Future together */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-64 h-48 sm:w-80 sm:h-56 rounded-xl overflow-hidden shadow-lg"
                >
                    <Image
                        src="/images/20.jpg"
                        alt="Our future together"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}
                >
                    <Heart className="w-16 h-16 text-[var(--rose)] fill-current" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]"
                >
                    Finally! 🎉
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-[var(--text-secondary)] max-w-md"
                >
                    Took you long enough. See you soon, Valentine 😏
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex gap-2 mt-4"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 1,
                                delay: i * 0.1,
                                repeat: Infinity
                            }}
                        >
                            <Sparkles className="w-6 h-6 text-[var(--blush-dark)]" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-6 py-4 relative"
        >
            {/* Images row - Image 4 and 6 */}
            <div className="flex gap-3 sm:gap-4 mb-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shadow-md"
                >
                    <Image
                        src="/images/4.jpg"
                        alt="With you"
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shadow-md"
                >
                    <Image
                        src="/images/6.jpg"
                        alt="I love you everyday"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>

            <div className="text-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-3"
                >
                    <Heart className="w-10 h-10 text-[var(--rose)] fill-current mx-auto" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Alright Meethi...
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium">
                    Be my Valentine? (You don&apos;t really have a choice)
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-3 max-w-sm mx-auto">
                    We don&apos;t really have to go on 14th because Ik you find the idea of Valentine&apos;s Day not so &quot;cool&quot; but let&apos;s go have a proper date (Our first date)
                </p>
            </div>

            <div className="flex gap-4 items-center justify-center relative min-h-[100px] w-full">
                {/* Yes Button */}
                <motion.button
                    onClick={handleYes}
                    animate={{
                        scale: yesScale,
                    }}
                    whileHover={{ scale: yesScale * 1.05 }}
                    whileTap={{ scale: yesScale * 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="px-8 sm:px-12 py-3 sm:py-4 
                     bg-gradient-to-r from-[var(--rose)] to-[var(--blush-dark)]
                     text-white font-semibold text-lg sm:text-xl rounded-full
                     shadow-lg hover:shadow-xl transition-shadow duration-300
                     hover:from-[var(--rose-dark)] hover:to-[var(--rose)]
                     z-10"
                    style={{
                        ...(yesScale >= maxScale - 1 && {
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${yesScale})`,
                        })
                    }}
                >
                    Yes
                </motion.button>

                {/* No Button */}
                <AnimatePresence>
                    {!shouldHideNo && (
                        <motion.button
                            onClick={handleNoInteraction}
                            onMouseEnter={handleNoInteraction}
                            onTouchStart={handleNoInteraction}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{
                                x: noPosition.x,
                                y: noPosition.y,
                                opacity: Math.max(0.3, 1 - (yesScale - 1) / (maxScale - 1)),
                                scale: Math.max(0.5, 1 - (yesScale - 1) / (maxScale - 1) * 0.5),
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="px-6 sm:px-8 py-3 sm:py-4 
                       bg-[var(--sage-light)] text-[var(--text-secondary)]
                       font-medium text-base sm:text-lg rounded-full
                       shadow-md hover:shadow-lg transition-all duration-300
                       border border-[var(--sage)] absolute z-20"
                        >
                            {noButtonPhrases[noAttempts]}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Hint text */}
            {noAttempts > 0 && !shouldHideNo && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[var(--text-muted)] italic text-center"
                >
                    {noAttempts >= 5
                        ? "That button is looking pretty big now..."
                        : noAttempts >= 3
                            ? "The button is growing. Coincidence?"
                            : "Interesting choice..."}
                </motion.p>
            )}

            {/* Final message when No disappears */}
            {shouldHideNo && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-[var(--rose)] font-medium text-center fixed bottom-32 left-0 right-0 z-20"
                >
                    You know what to do.
                </motion.p>
            )}
        </motion.div>
    );
}
