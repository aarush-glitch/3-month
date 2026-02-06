'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Start date: January 12th, 2026 at 9:00 PM IST
const START_DATE = new Date('2026-01-12T21:00:00+05:30');

function calculateTimeElapsed(): TimeElapsed {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();

  if (diff < 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Calculate years and remaining months/days
  const startYear = START_DATE.getFullYear();
  const startMonth = START_DATE.getMonth();
  const startDay = START_DATE.getDate();

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDay = now.getDate();

  let years = nowYear - startYear;
  let months = nowMonth - startMonth;
  let daysRemaining = nowDay - startDay;

  if (daysRemaining < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    daysRemaining += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days: daysRemaining,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60
  };
}

export default function Timer() {
  const [time, setTime] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTimer = () => {
      setTime(calculateTimeElapsed());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { value: time.years, label: 'years' },
    { value: time.months, label: 'months' },
    { value: time.days, label: 'days' },
    { value: time.hours, label: 'hours' },
    { value: time.minutes, label: 'mins' },
    { value: time.seconds, label: 'secs' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="glass rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[70px] text-center"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
