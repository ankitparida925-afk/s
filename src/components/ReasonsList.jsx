import React from 'react';
import { motion } from 'framer-motion';

const REASONS = [
  {
    icon: '☀️',
    title: 'Your Radiant Smile',
    desc: 'The way your entire face lights up, instantly melting away my worst days and making the world brighter.'
  },
  {
    icon: '🤝',
    title: 'Your Warm Touch',
    desc: 'How you hold my hand, giving me an instant sense of warmth, peace, and the feeling that we can conquer anything.'
  },
  {
    icon: '🌸',
    title: 'Your Compassionate Heart',
    desc: 'Your pure kindness, empathy, and how deeply you care for everyone around you makes me admire you more everyday.'
  },
  {
    icon: '😂',
    title: 'Our Silly Laughter',
    desc: 'The inside jokes we share, laughing until our stomachs hurt at things only the two of us understand.'
  },
  {
    icon: '🚀',
    title: 'Your Infinite Support',
    desc: 'You are my biggest cheerleader. You believe in me even when I struggle to believe in myself.'
  },
  {
    icon: '💖',
    title: 'You Make Me Whole',
    desc: 'You represent my home. Being with you makes me want to be the absolute best version of myself.'
  }
];

export default function ReasonsList() {
  return (
    <section className="relative z-10 px-4 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-100 mb-3">
          Reasons Why I Love You
        </h2>
        <p className="text-rose-200/60 text-sm md:text-base max-w-md mx-auto">
          There are a million things, but here are just a few little pieces of why you are my entire world:
        </p>
      </div>

      {/* Grid Layout with Framer Motion hover scaling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map((reason, idx) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6, type: 'spring', stiffness: 80 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="glass-card-pink border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            {/* Soft inner radial light flare */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 select-none">
              {reason.icon}
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-rose-100 mb-2 group-hover:text-pink-300 transition-colors duration-300">
              {reason.title}
            </h3>
            
            <p className="text-sm text-rose-200/70 leading-relaxed relative z-10">
              {reason.desc}
            </p>

            {/* Corner heart indicator */}
            <div className="absolute bottom-3 right-3 text-rose-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 select-none">
              ❤️
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
