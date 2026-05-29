import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Default anniversary date: exactly 520 days ago for a highly romantic default count
const anniversary = new Date();
anniversary.setDate(anniversary.getDate() - 520);
anniversary.setHours(12, 0, 0, 0);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date() - +anniversary;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, color: 'from-rose-500 to-pink-500' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-pink-500 to-purple-500' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-purple-500 to-indigo-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-indigo-500 to-rose-500' },
  ];

  return (
    <section className="relative z-10 px-4 py-16 text-center max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        {/* Floating Heart background badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] text-rose-500/[0.03] select-none pointer-events-none font-bold">
          ❤️
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-rose-200 mb-2">Our Love Journey</h2>
        <p className="text-sm md:text-base text-rose-200/60 mb-8 max-w-md mx-auto">
          Every single second spent beside you has been pure magic. Here is the time we have traveled together in love:
        </p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card-pink border border-white/10 rounded-2xl p-5 relative group overflow-hidden"
            >
              {/* Card glowing bottom gradient hover */}
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${block.color} opacity-80 group-hover:h-2 transition-all duration-300`} />
              
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]">
                {String(block.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-widest text-rose-300 uppercase">
                {block.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-6 py-2.5 rounded-full text-rose-300 text-sm md:text-base">
          <span className="animate-ping w-2 h-2 rounded-full bg-rose-400" />
          <span>Anniversary Date: <b>October 12, 2024</b> ❤️</span>
        </div>
      </motion.div>
    </section>
  );
}
