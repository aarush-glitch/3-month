'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeElapsed {
  months: number;
  days:   number;
  hours:  number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

// Start date: January 12, 2026 at 9:00 PM IST
const START_DATE = new Date('2026-01-12T21:00:00+05:30');

function calculateTimeElapsed(): TimeElapsed {
  const now  = new Date();
  const diff = now.getTime() - START_DATE.getTime();

  if (diff < 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };

  const totalSeconds  = Math.floor(diff / 1000);
  const totalMinutes  = Math.floor(totalSeconds / 60);
  const totalHours    = Math.floor(totalMinutes / 60);
  const totalDays     = Math.floor(totalHours   / 24);

  // Calendar-accurate months + remaining days
  const nowYear       = now.getFullYear();
  const nowMonth      = now.getMonth();
  const nowDay        = now.getDate();
  const startYear     = START_DATE.getFullYear();
  const startMonth    = START_DATE.getMonth();
  const startDay      = START_DATE.getDate();

  let months       = (nowYear - startYear) * 12 + (nowMonth - startMonth);
  let daysRemainder = nowDay - startDay;

  if (daysRemainder < 0) {
    months--;
    const prevMonthEnd = new Date(nowYear, nowMonth, 0);
    daysRemainder += prevMonthEnd.getDate();
  }

  return {
    months,
    days:    daysRemainder,
    hours:   totalHours   % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    totalDays,
  };
}

export default function Timer() {
  const [time, setTime]     = useState<TimeElapsed>(calculateTimeElapsed());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(calculateTimeElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const units = [
    { value: time.months,  label: 'months'  },
    { value: time.days,    label: 'days'    },
    { value: time.hours,   label: 'hours'   },
    { value: time.minutes, label: 'mins'    },
    { value: time.seconds, label: 'secs'    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col items-center gap-5"
    >
      {/* Total-days headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45 }}
        className="glass-amber rounded-2xl px-8 py-4 text-center"
      >
        <motion.span
          key={time.totalDays}
          initial={{ opacity: 0.6, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-5xl sm:text-6xl font-bold"
          style={{ color: 'var(--amber)' }}
        >
          {time.totalDays}
        </motion.span>
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mt-1">total days</p>
      </motion.div>

      {/* Breakdown row */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.55 + index * 0.08 }}
            className="glass rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[62px] sm:min-w-[72px] text-center"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.15, color: 'var(--amber)' }}
              animate={{ scale: 1, color: 'var(--text-primary)' }}
              transition={{ duration: 0.25 }}
              className="text-xl sm:text-2xl font-semibold"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
