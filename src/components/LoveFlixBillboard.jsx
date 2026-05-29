import React, { useState } from 'react';
import { Play, Info, Heart, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveFlixBillboard({ onPlay }) {
  const [showDetails, setShowDetails] = useState(false);

  const featuredShow = {
    title: "Our Love Story",
    tagline: "The Best Adventure of My Life",
    synopsis: "An award-winning real-life romantic saga detailing the beautiful journey of two souls bound by destiny, laughter, and an infinite amount of late-night conversations.",
    match: "100% Match",
    year: "2026",
    duration: "1 Season",
    genres: ["Heartfelt", "Cinematic Romance", "Best comedy duo"],
    cast: ["You ❤️", "Me 💍"],
    bannerUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200",
  };

  return (
    <div className="relative w-full h-[55vh] md:h-[80vh] flex flex-col justify-end overflow-hidden bg-slate-950">
      {/* Background Cinematic Banner image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={featuredShow.bannerUrl}
          alt={featuredShow.title}
          className="w-full h-full object-cover object-center scale-105 opacity-60 md:opacity-50"
        />
        {/* Netflix Gradients Overlay (left, bottom, top shadows) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/70 to-transparent" />
      </div>

      {/* Content overlays */}
      <div className="relative z-10 w-full max-w-4xl px-6 md:px-16 pb-12 md:pb-24 select-none">
        {/* N series indicator */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-extrabold text-2xl tracking-tighter select-none font-sans">L</span>
          <span className="text-zinc-300 font-extrabold text-xs uppercase tracking-widest">Original Series</span>
        </div>

        {/* Big Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] mb-3"
        >
          {featuredShow.title}
        </motion.h1>

        {/* Tagline */}
        <h3 className="text-rose-400 font-semibold text-sm md:text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{featuredShow.tagline}</span>
        </h3>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm mb-4">
          <span className="text-emerald-500 font-bold drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]">
            {featuredShow.match}
          </span>
          <span className="text-zinc-300">{featuredShow.year}</span>
          <span className="px-1.5 py-0.5 border border-zinc-500 text-zinc-300 text-[10px] rounded font-bold uppercase tracking-wider">
            Love
          </span>
          <span className="text-zinc-300">{featuredShow.duration}</span>
          <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-black rounded uppercase tracking-wider">
            Ultra HD 4K
          </span>
        </div>

        {/* Synopsis Paragraph */}
        <p className="text-zinc-200/90 text-sm md:text-base leading-relaxed mb-8 max-w-xl hidden sm:block drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]">
          {featuredShow.synopsis}
        </p>

        {/* Action CTA Buttons */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 bg-white text-black font-extrabold rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play</span>
          </motion.button>
          <motion.button
            onClick={() => setShowDetails(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 bg-zinc-700/60 backdrop-blur-md text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-600/80 transition-colors border border-white/5 shadow-lg"
          >
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </motion.button>
        </div>
      </div>

      {/* Detailed Modal Backdrop for More Info */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 cursor-default shadow-2xl relative"
            >
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 w-9 h-9 bg-zinc-950/60 hover:bg-red-600 rounded-full border border-white/10 flex items-center justify-center text-white text-sm"
              >
                ✕
              </button>
              
              <div className="flex items-center gap-2 text-rose-500 mb-2 font-bold uppercase tracking-wider text-xs">
                <Heart className="w-4 h-4 fill-current animate-ping" />
                <span>Show Synopsis</span>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-4">{featuredShow.title}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {featuredShow.synopsis}
              </p>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-white/5 text-sm text-zinc-400">
                <div>
                  <span className="font-bold text-zinc-300">Cast: </span>
                  {featuredShow.cast.join(', ')}
                </div>
                <div>
                  <span className="font-bold text-zinc-300">Genres: </span>
                  {featuredShow.genres.join(' • ')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-300">Romantic Index: </span>
                  <span className="flex text-pink-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current animate-pulse" />
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
