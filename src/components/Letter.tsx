'use client';

import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

// Placeholder letter content - user can customize this
const letterContent = `My Dearest Meethi,

From the moment you came into my life, everything changed. The world seems brighter, the days feel warmer, and my heart beats with a rhythm I never knew before.

Every laugh we share, every quiet moment together, every silly conversation late into the night – these are the treasures I hold closest to my heart. You make me want to be better, dream bigger, and love deeper.

I find myself thinking about you at random moments throughout the day, and each thought brings a smile to my face. Your kindness, your warmth, your beautiful soul – they inspire me every single day.

Thank you for being you. Thank you for choosing to share your time with me. Thank you for making my life infinitely more beautiful just by being in it.

Forever and always,
Your someone special ♡`;

// SVG Flower decoration component
function FlowerDecoration({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
                {/* Main flower */}
                <circle cx="50" cy="50" r="8" fill="#d4a5a5" />
                <ellipse cx="50" cy="30" rx="10" ry="15" fill="#f5d0c5" transform="rotate(0, 50, 50)" />
                <ellipse cx="50" cy="30" rx="10" ry="15" fill="#fbe8e3" transform="rotate(72, 50, 50)" />
                <ellipse cx="50" cy="30" rx="10" ry="15" fill="#f5d0c5" transform="rotate(144, 50, 50)" />
                <ellipse cx="50" cy="30" rx="10" ry="15" fill="#fbe8e3" transform="rotate(216, 50, 50)" />
                <ellipse cx="50" cy="30" rx="10" ry="15" fill="#f5d0c5" transform="rotate(288, 50, 50)" />
                {/* Small accent flowers */}
                <circle cx="25" cy="75" r="4" fill="#b8c9b8" />
                <circle cx="75" cy="25" r="5" fill="#e6dff0" />
                {/* Leaves */}
                <ellipse cx="75" cy="80" rx="8" ry="4" fill="#b8c9b8" transform="rotate(-30, 75, 80)" />
                <ellipse cx="20" cy="30" rx="6" ry="3" fill="#d4e2d4" transform="rotate(45, 20, 30)" />
            </g>
        </svg>
    );
}

export default function Letter() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md sm:max-w-lg mx-auto vintage-paper rounded-lg p-6 sm:p-8 overflow-auto max-h-[70vh]"
        >
            {/* Flower decorations */}
            <FlowerDecoration className="flower-corner flower-corner-tl" />
            <FlowerDecoration className="flower-corner flower-corner-br" />

            {/* Letter content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
            >
                {/* Top decoration */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--blush)]" />
                    <Flower2 className="w-5 h-5 text-[var(--rose)]" />
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--blush)]" />
                </div>

                {/* Letter text */}
                <p className="font-handwritten text-lg sm:text-xl leading-relaxed text-[var(--text-primary)] whitespace-pre-line text-center sm:text-left">
                    {letterContent}
                </p>

                {/* Bottom decoration */}
                <div className="flex items-center gap-2 mt-6 justify-end">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--blush)]" />
                    <Flower2 className="w-4 h-4 text-[var(--sage)]" />
                </div>
            </motion.div>

            {/* Decorative border pattern */}
            <div className="absolute inset-3 border border-[var(--blush-light)]/50 rounded pointer-events-none" />
        </motion.div>
    );
}
