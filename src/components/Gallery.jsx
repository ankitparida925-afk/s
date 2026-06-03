import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import newMemoryImg1 from '../assets/new_memory_img1.jpeg';
import newMemoryImg3 from '../assets/new_memory_img3.jpeg';
import newMemoryImg4 from '../assets/new_memory_img4.jpeg';
import beMyBabyMusic from '../assets/be_my_baby.mp3';
import galleryBg from '../assets/gallery_background.jpg';

const MEMORIES = [
  {
    id: 1,
    url: newMemoryImg1,
    title: 'Our First Meet ❤️',
    desc: 'The day my life was forever changed. That nervous smile, the sparks, and the magical beginning of us.',
  },
  {
    id: 2,
    url: newMemoryImg3,
    title: 'Best Day Together 🌸',
    desc: 'Walking hand in hand through the warm sunset, wishing that moment could be frozen in time forever.',
  },
  {
    id: 3,
    url: newMemoryImg4,
    title: 'Forever Memories 💖',
    desc: 'Laughter filling the air, capturing our endless joy in a single frame. Safe in each other’s arms.',
  },
  {
    id: 4,
    url: newMemoryImg1,
    title: 'Sweet Adventures ☕',
    desc: 'Sharing warm cups of coffee on rainy afternoons, whispering dreams of a beautiful future together.',
  },
  {
    id: 5,
    url: newMemoryImg3,
    title: 'Magical Nights ✨',
    desc: 'Dancing beneath a canopy of twinkling fairylights, feeling like the only two people in the universe.',
  },
  {
    id: 6,
    url: newMemoryImg4,
    title: 'Dreaming of Us 💍',
    desc: 'Looking out over the endless ocean, knowing that wherever we go, we go together.',
  },
];


export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const galleryAudioRef = useRef(null);

  useEffect(() => {
    if (selectedPhoto) {
      // Pause all other active audios on the page
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => {
        try {
          audio.pause();
        } catch (e) {
          console.log("Error pausing audio:", e);
        }
      });

      // Play Be My Baby
      if (!galleryAudioRef.current) {
        galleryAudioRef.current = new Audio(beMyBabyMusic);
        galleryAudioRef.current.loop = true;
        galleryAudioRef.current.volume = 0.8;
      }
      galleryAudioRef.current.play().catch(err => console.log("Gallery audio play blocked:", err));
    } else {
      if (galleryAudioRef.current) {
        galleryAudioRef.current.pause();
      }
    }

    return () => {
      if (galleryAudioRef.current) {
        galleryAudioRef.current.pause();
      }
    };
  }, [selectedPhoto]);

  return (
    <section className="relative z-10 rounded-3xl overflow-hidden border border-white/5 my-8 bg-slate-950/20 backdrop-blur-sm">
      {/* Background image container for the gallery section */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src={galleryBg}
          alt="Gallery Background"
          className="w-full h-full object-cover object-center opacity-25 blur-[4px] scale-105"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-100 mb-3">
            Our Cherished Memories 📸
          </h2>
          <p className="text-rose-200/60 text-sm md:text-base max-w-md mx-auto">
            Every photo is a story, and every story is my favorite because it was written with you.
          </p>
        </div>

        {/* Memory Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEMORIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-card-pink border border-white/10 relative p-3"
              onClick={() => setSelectedPhoto(item)}
            >
              {/* Image Container with overlays */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Pink Overlay with heart icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-rose-500/80 backdrop-blur-sm flex items-center justify-center text-white text-xl shadow-lg"
                  >
                    ❤️
                  </motion.div>
                </div>
              </div>

              {/* Photo details */}
              <div className="pt-4 pb-2 px-1 text-center">
                <h3 className="text-lg font-bold text-rose-100 group-hover:text-pink-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-rose-200/50 mt-1 line-clamp-1">
                  Click to open memory
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Light Modal Popup */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-3xl w-full bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden glass-card-pink shadow-2xl relative cursor-default"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
                >
                  ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Photo */}
                  <div className="w-full aspect-[4/3] md:aspect-square bg-slate-950">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Caption Detail Panel */}
                  <div className="p-6 md:p-8 flex flex-col justify-center bg-slate-900/60 backdrop-blur-md">
                    <span className="text-3xl mb-4 inline-block select-none">📸</span>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-100 mb-4">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-rose-100/80 text-sm md:text-base leading-relaxed mb-6">
                      {selectedPhoto.desc}
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-xs text-rose-300/40 uppercase tracking-widest font-semibold">
                      <span>Forever Together 💍</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
