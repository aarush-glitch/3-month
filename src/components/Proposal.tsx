'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { sendYesNotification } from '@/lib/notification';

export default function Proposal() {
    const [saidYes, setSaidYes] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [noAttempts, setNoAttempts] = useState(0);

    const noButtonPhrases = [
        "No",
        "Are you sure?",
        "Really?",
        "Think again!",
        "Pretty please?",
        "I'll be sad :(",
        "One more chance?",
        "Final answer?",
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

        // Send notification
        try {
            await sendYesNotification();
            console.log('Notification sent successfully!');
        } catch (error) {
            console.log('Notification not configured or failed:', error);
        }
    };

    const moveNoButton = useCallback(() => {
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;

        const newX = Math.random() * maxX - maxX / 2;
        const newY = Math.random() * maxY - maxY / 2;

        setNoButtonPosition({ x: newX, y: newY });
        setNoAttempts(prev => Math.min(prev + 1, noButtonPhrases.length - 1));
    }, [noButtonPhrases.length]);

    // For mobile - also move on click
    const handleNoClick = () => {
        moveNoButton();
    };

    // Reset position on window resize
    useEffect(() => {
        const handleResize = () => {
            setNoButtonPosition({ x: 0, y: 0 });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (saidYes) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex flex-col items-center gap-6 text-center py-12"
            >
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
                    <Heart className="w-24 h-24 text-[var(--rose)] fill-current" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]"
                >
                    Yay! 🎉
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-[var(--text-secondary)] max-w-md"
                >
                    I knew you&apos;d say yes! Can&apos;t wait to celebrate with you, my Valentine! 💕
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
            className="flex flex-col items-center gap-8 py-8"
        >
            <div className="text-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-4"
                >
                    <Heart className="w-12 h-12 text-[var(--rose)] fill-current mx-auto" />
                </motion.div>

                <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
                    So, Meethi...
                </h2>
                <p className="text-xl sm:text-2xl text-[var(--text-secondary)] font-medium">
                    Will you be my Valentine? 💝
                </p>
            </div>

            <div className="flex gap-4 items-center relative min-h-[80px]">
                {/* Yes Button */}
                <motion.button
                    onClick={handleYes}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 sm:px-12 py-3 sm:py-4 
                     bg-gradient-to-r from-[var(--rose)] to-[var(--blush-dark)]
                     text-white font-semibold text-lg sm:text-xl rounded-full
                     shadow-lg hover:shadow-xl transition-shadow duration-300
                     hover:from-[var(--rose-dark)] hover:to-[var(--rose)]"
                >
                    Yes! 💕
                </motion.button>

                {/* No Button - Evades cursor */}
                <motion.button
                    onClick={handleNoClick}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    animate={{
                        x: noButtonPosition.x,
                        y: noButtonPosition.y
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                    className="px-6 sm:px-8 py-3 sm:py-4 
                     bg-[var(--sage-light)] text-[var(--text-secondary)]
                     font-medium text-base sm:text-lg rounded-full
                     shadow-md hover:shadow-lg transition-all duration-300
                     border border-[var(--sage)]"
                >
                    {noButtonPhrases[noAttempts]}
                </motion.button>
            </div>

            {noAttempts > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[var(--text-muted)] italic"
                >
                    {noAttempts >= 3
                        ? "The button is clearly trying to tell you something... 😊"
                        : "Having trouble clicking that button? 😏"}
                </motion.p>
            )}
        </motion.div>
    );
}
