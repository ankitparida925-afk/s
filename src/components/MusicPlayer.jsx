import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import romanticTrack from '../assets/tere_naina.mp3';

export default function MusicPlayer({ autoplayRequested, onMusicStart }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Sync with App level trigger
    if (autoplayRequested && audioRef.current && !isPlaying) {
      handlePlay();
    }
  }, [autoplayRequested]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        if (onMusicStart) onMusicStart();
        // Hide notification after it starts playing
        setTimeout(() => setShowNotification(false), 3000);
      })
      .catch((err) => {
        console.log("Audio play blocked or failed: ", err);
      });
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={romanticTrack}
        loop
        preload="auto"
      />

      {/* Floating Music Button Controller */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Bubble Hint */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-rose-500/90 backdrop-blur-md text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg flex items-center gap-2 border border-rose-400/20"
            >
              <Heart className="w-3.5 h-3.5 fill-current animate-beat text-white" />
              <span>Tap to play background music 🎵</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer Pulsing Glow */}
        <motion.button
          onClick={togglePlayback}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center border text-white transition-all duration-300 relative ${
            isPlaying
              ? 'bg-rose-500 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.6)] animate-pulse-slow'
              : 'bg-slate-900/80 backdrop-blur-md border-white/10 shadow-lg'
          }`}
        >
          {/* Animated music note particles rising when playing */}
          {isPlaying && (
            <>
              <span className="absolute -top-3 left-2 text-xs animate-bounce" style={{ animationDelay: '0.2s' }}>🎵</span>
              <span className="absolute -top-2 right-1 text-[10px] animate-bounce" style={{ animationDelay: '0.6s' }}>✨</span>
            </>
          )}

          {isPlaying ? (
            <Volume2 className="w-6 h-6 animate-pulse" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </motion.button>
      </div>


    </>
  );
}
