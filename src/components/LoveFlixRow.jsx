import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Check, Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoveFlixRow({ title, items, onPlay }) {
  const rowRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div 
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      className="relative z-10 py-6 px-6 md:px-16 group select-none"
    >
      <h2 className="text-xl md:text-2xl font-black text-zinc-100 mb-4 hover:text-red-500 transition-colors inline-block select-none cursor-pointer">
        {title}
      </h2>

      <div className="relative w-full overflow-visible">
        {/* Scroll Left Arrow */}
        {showArrows && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-14 bg-black/60 hover:bg-black/90 text-white rounded-r-lg flex items-center justify-center border-y border-r border-white/10 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}

        {/* Scroll Right Arrow */}
        {showArrows && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-14 bg-black/60 hover:bg-black/90 text-white rounded-l-lg flex items-center justify-center border-y border-l border-white/10 transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}

        {/* Horizontal Items Carousel */}
        <div
          ref={rowRef}
          className="w-full flex gap-4 overflow-x-auto scrollbar-hide py-2 overflow-y-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
              className="flex-shrink-0 w-[240px] md:w-[280px] bg-[#181818] border border-white/5 rounded-md overflow-hidden shadow-xl cursor-pointer group"
              onClick={() => onPlay(item)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Red Play progress bar at bottom of thumbnail */}
                {item.progress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                    <div 
                      className="h-full bg-red-600 rounded-r" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}

                {/* Instant play icon overlap */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg text-white">
                    <Play className="w-5 h-5 fill-current text-white translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/70 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-zinc-300 uppercase tracking-widest">
                  {item.duration || '2:30'}
                </span>
              </div>

              {/* Title & Info Panel */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                    {item.match || '98% Match'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-1 py-0.2 border border-zinc-600 text-zinc-400 text-[9px] rounded font-extrabold uppercase">
                      HD
                    </span>
                    <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
                  </div>
                </div>

                <h3 className="text-sm md:text-base font-extrabold text-zinc-100 truncate group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
