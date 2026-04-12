'use client';

import { motion } from 'framer-motion';
import BabysBreath from '@/components/BabysBreath';

const letterContent = `My dearest Meethi,

Three months.

Honestly, I didn't expect it to feel like this — whatever "this" even is. You just kind of crept into my days without asking, and now I can't picture them the same without you in them.

I think about the time you checked on me when I was having a terrible day. You didn't say much. You didn't need to. That stuck with me more than you know.

You're weirdly patient with me. You push back when I need it. You're honest in this way that doesn't feel cruel — which is rare, and I appreciate it more than I've probably told you.

You make ordinary things feel worth paying attention to. A walk. A voice note. A weird little scribble on paper. Things that should be nothing end up mattering because you're in them.

I know we're still figuring out what this is and where it goes. I'm okay with that. I just know that three months in, I'd choose this again.

Here's to whatever comes next.

— Always yours ♡`;

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
