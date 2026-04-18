'use client';

import { motion } from 'framer-motion';
import BabysBreath from '@/components/BabysBreath';

const letterContent = `My most ragebaiting Meethi,

Three months, three months.

Honestly, I didn't expect it to feel like this, the first two months were crazy fast and I haven't gotten closer to anyone than I did in those two months but this last month, the slowness, the real life stuff, this all taught me that even during stillness and duress you're the only person I want near me and the only person that can lift my mood in a second.

It's just been 3 months but I can't seem to remember the days when we weren't this close. It's just a great feeling to have. I don't know exactly what you feel about me but if you were in my shoes you'd be dancing non stop. You got the girl of your dreams. She's better than what you've ever dreamt of.

You're weirdly patient with me. You push back when I need it. You're honest in this way that doesn't feel cruel which is rare, and I appreciate it more than I've probably told you.

You make ordinary things feel worth paying attention to. A voice note. A weird little scribble on paper. A walk. God I miss those walks in college. Things that should be nothing end up mattering because you're in them.

I'm not saying we won't have our ups and lows, but what I'm saying is that after each fight after each misunderstanding you're the only person I want to talk to. I WILL fuck up, you MIGHT too but I'll always want to resolve things with you because you're all that matters to me.

I don't think I'll ever be able to express how much I love you but I can definitely say that instead of a dead resting face you've turned mine into a smiling one and that's all you.

Here's to whatever comes next.

— Forever and Always ♡`;

export default function Letter() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 24, stiffness: 180 }}
      className="relative w-full max-w-md sm:max-w-lg mx-auto vintage-paper rounded-lg p-7 sm:p-9
                 overflow-auto max-h-[74vh]"
    >
      {/* Baby's breath corner decorations */}
      <div className="absolute -top-4 -left-4 w-24 h-24 opacity-45 pointer-events-none">
        <BabysBreath />
      </div>
      <div
        className="absolute -bottom-4 -right-4 w-24 h-24 opacity-35 pointer-events-none"
        style={{ transform: 'rotate(180deg)' }}
      >
        <BabysBreath />
      </div>

      {/* Letter content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        {/* Top rule */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--amber-pale)]" />
          <span className="text-[var(--amber)] text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--amber-pale)]" />
        </div>

        {/* Letter text */}
        <p className="font-handwritten text-[1.18rem] sm:text-xl leading-[1.9] text-[var(--text-primary)]
                      whitespace-pre-line text-left">
          {letterContent}
        </p>

        {/* Bottom rule */}
        <div className="flex items-center gap-3 mt-7 justify-end">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-[var(--amber-pale)]" />
          <span className="text-[var(--stem)] text-sm">🌿</span>
        </div>
      </motion.div>

      {/* Inner border */}
      <div
        className="absolute inset-3 rounded pointer-events-none"
        style={{ border: '1px solid rgba(192,122,80,0.15)' }}
      />
    </motion.div>
  );
}
