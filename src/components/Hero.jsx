import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TYPED_TEXTS = [
  "You are the best thing that ever happened to me… 🌸",
  "Every moment with you feels magical ✨",
  "My heart beats only for you ❤️",
  "Forever isn't long enough with you... 💍",
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer;
    const fullText = TYPED_TEXTS[currentTextIndex];

    if (isDeleting) {
      // Deleting phase
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingSpeed(40); // Delete faster
      }, typingSpeed);
    } else {
      // Typing phase
      timer = setTimeout(() => {
        setDisplayedText((prev) => fullText.slice(0, prev.length + 1));
        setTypingSpeed(80); // Restored typing pace
      }, typingSpeed);
    }

    // Toggle between states
    if (!isDeleting && displayedText === fullText) {
      // Hold on typed text before deletion
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % TYPED_TEXTS.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed]);

  return (
    <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-4 pt-16 md:pt-24 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-3xl w-full text-center glass-card-pink rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        {/* Cinematic light flare effect inside the card */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        {/* Floating animated icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="inline-block text-5xl md:text-6xl mb-6 select-none"
        >
          💝
        </motion.div>

        {/* Hero Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(244,63,94,0.3)]">
          Hey Sim Sim ❤️
        </h1>

        {/* Animated Typewriter Box */}
        <div className="h-12 md:h-16 flex items-center justify-center mb-6">
          <p className="text-lg md:text-2xl font-medium text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]">
            {displayedText}
            <span className="inline-block w-[3px] h-[20px] md:h-[26px] bg-pink-400 ml-1 animate-pulse" />
          </p>
        </div>

        {/* Heartfelt Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-base md:text-lg text-rose-100/80 leading-relaxed mb-8 max-w-xl mx-auto"
        >
          From the moment our eyes met, my world completely changed. You filled my days with warmth, laughter, and an infinite amount of magic. Every second spent with you is a memory I will treasure for the rest of my life.
        </motion.p>

        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-4 text-rose-400/60 text-xl">
          <span>✨</span>
          <span className="font-romantic text-3xl font-bold tracking-widest text-pink-300">Forever & Always</span>
          <span>✨</span>
        </div>
      </motion.div>
    </section>
  );
}
