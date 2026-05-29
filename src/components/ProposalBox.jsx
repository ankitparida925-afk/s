import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Web Audio API Celebration Chime Synthesizer
const playCelebrationChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
    });
  } catch (error) {
    console.error("Web Audio API failed to synthesize chime: ", error);
  }
};

const FUNNY_NO_MESSAGES = [
  "No 😅",
  "Wait, click Yes instead! 😉",
  "Is your mouse slipping? 😂",
  "Access Denied! 😜",
  "Nice try, but you can't say No! 💕",
  "We are destined to be together! 👩‍❤️‍👨",
  "Error: Wrong button chosen! ⚠️",
  "I'm too cute to be rejected! 🥺",
];

export default function ProposalBox() {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isNoMoved, setIsNoMoved] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const boxRef = useRef(null);

  // Trigger escape logic for the No button
  const handleNoFlee = () => {
    if (!boxRef.current) return;
    
    // Find boundaries of proposal container
    const rect = boxRef.current.getBoundingClientRect();
    
    // Calculate new random positions within container width/height minus padding
    const padding = 60;
    const maxX = rect.width - 120;
    const maxY = rect.height - 80;

    const newX = Math.max(padding, Math.min(Math.random() * maxX, maxX));
    const newY = Math.max(padding, Math.min(Math.random() * maxY, maxY));

    setNoPosition({ x: newX, y: newY });
    setIsNoMoved(true);
    setNoCount((prev) => (prev + 1) % FUNNY_NO_MESSAGES.length);
  };

  const handleYes = () => {
    setIsYesClicked(true);
    playCelebrationChime();

    // Trigger double confetti explosions
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section className="relative z-10 px-4 py-16 max-w-4xl mx-auto" id="proposal">
      <motion.div
        ref={boxRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-pink border-2 border-rose-500/40 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden min-h-[350px] flex flex-col justify-center items-center"
      >
        {/* Animated glowing border border-effect */}
        <div className="absolute inset-0 border border-pink-500/30 rounded-3xl animate-pulse-slow" />

        <div className="absolute -top-10 -right-10 text-7xl opacity-10 animate-float-slow select-none">💍</div>
        <div className="absolute -bottom-10 -left-10 text-7xl opacity-10 animate-float-medium select-none">💖</div>

        <motion.h2
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-6 drop-shadow-[0_2px_15px_rgba(244,63,94,0.4)] font-sans"
        >
          Will You Be Mine Forever? 💍
        </motion.h2>

        <p className="text-sm md:text-base text-rose-200/70 mb-10 max-w-md mx-auto">
          Every second with you is a lifetime of bliss. Say yes and make me the happiest person in the universe!
        </p>

        {/* Buttons Box Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full relative min-h-[100px]">
          {/* YES Button */}
          <motion.button
            onClick={handleYes}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold rounded-2xl text-lg shadow-[0_0_20px_rgba(244,63,94,0.5)] hover:shadow-[0_0_35px_rgba(244,63,94,0.8)] border border-rose-400/20 transition-all duration-300 z-10"
          >
            Yes 💖
          </motion.button>

          {/* NO Escaping Button */}
          <motion.button
            onMouseEnter={handleNoFlee}
            onTouchStart={handleNoFlee}
            onClick={handleNoFlee}
            animate={
              isNoMoved
                ? {
                    position: 'absolute',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                  }
                : {}
            }
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`px-8 py-3.5 bg-slate-900/90 text-rose-200/80 font-bold border border-white/10 rounded-2xl transition-all select-none ${
              isNoMoved ? 'z-20 pointer-events-auto' : 'z-10'
            }`}
          >
            {FUNNY_NO_MESSAGES[noCount]}
          </motion.button>
        </div>
      </motion.div>

      {/* Success Modal Overlay popup */}
      <AnimatePresence>
        {isYesClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-default"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="max-w-md w-full glass-card-pink border-2 border-rose-500/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Confetti light background */}
              <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-20%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl md:text-7xl mb-6 select-none"
              >
                🥰👩‍❤️‍👨💖
              </motion.div>

              <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-100 mb-4 font-sans">
                YES! Forever & Always!
              </h3>
              
              <p className="text-rose-100/90 text-sm md:text-base leading-relaxed mb-8">
                “You made me the happiest person alive ❤️. I promise to cherish you, laugh with you, and love you infinitely, through all of our beautiful tomorrows.”
              </p>

              <div className="flex justify-center gap-2 mb-8 text-rose-400 select-none">
                <span>❤️</span><span>✨</span><span>💍</span><span>✨</span><span>❤️</span>
              </div>

              <motion.button
                onClick={() => setIsYesClicked(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-900 border border-rose-500/30 text-rose-200 font-bold py-2.5 px-6 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close letter
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
