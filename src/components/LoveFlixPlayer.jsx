import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize2, SkipForward, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveFlixPlayer({ episode, onClose }) {
  const playlist = episode.gallery || [
    { type: episode.videoUrl ? 'video' : 'image', url: episode.videoUrl || episode.url }
  ];

  const initialIndex = episode.gallery 
    ? episode.gallery.findIndex(item => item.url === (episode.videoUrl || episode.url)) 
    : 0;

  const [activeIdx, setActiveIdx] = useState(initialIndex >= 0 ? initialIndex : 0);
  const activeMedia = playlist[activeIdx];

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [rotation, setRotation] = useState(episode.rotate || 0);

  const bgAudioRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (bgAudioRef.current) bgAudioRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video playback error:", err));
        if (bgAudioRef.current) bgAudioRef.current.play().catch(err => console.log("Bg audio play error:", err));
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
      if (bgAudioRef.current) {
        if (isPlaying) {
          bgAudioRef.current.pause();
        } else {
          bgAudioRef.current.play().catch(err => console.log("Bg audio play error:", err));
        }
      }
    }
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) {
      videoRef.current.muted = episode.bgMusic ? true : nextMuted;
    }
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = nextMuted;
    }
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercentage = clickX / width;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newPercentage * videoRef.current.duration;
    }
    setProgress(newPercentage * 100);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Keyboard controls for sliding
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (playlist.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playlist]);

  const handleNextSlide = () => {
    setActiveIdx((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrevSlide = () => {
    setActiveIdx((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Setup loop track once when the component mounts
  useEffect(() => {
    if (episode.bgMusic) {
      const homeAudios = document.querySelectorAll('audio');
      homeAudios.forEach(audio => {
        try {
          audio.pause();
        } catch (e) {}
      });

      const audio = new Audio(episode.bgMusic);
      audio.loop = true;
      audio.volume = 0.85;
      audio.muted = isMuted;
      bgAudioRef.current = audio;

      if (isPlaying) {
        audio.play().catch(err => console.log("Bg audio autoplay blocked:", err));
      }
    }

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    };
  }, [episode.bgMusic]);

  // Adjust volume dynamically on slide switch
  useEffect(() => {
    setRotation(activeMedia.rotate || episode.rotate || 0);

    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.85;
    }

    if (activeMedia.type === 'video' && videoRef.current) {
      if (episode.bgMusic) {
        videoRef.current.volume = 0;
        videoRef.current.muted = true;
      } else {
        videoRef.current.volume = 1.0;
        videoRef.current.muted = isMuted;
      }
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log("Video autoplay blocked:", e));
      }
    }
  }, [activeIdx, activeMedia, isMuted, episode]);

  // Fallback visualizer progress timer for images
  useEffect(() => {
    if (activeMedia.type !== 'video') {
      setDuration(120); // Dummy 2 minutes
      const timer = setInterval(() => {
        if (isPlaying) {
          setCurrentTime((prev) => {
            if (prev >= 120) {
              handleNextSlide();
              return 0;
            }
            const next = prev + 1;
            setProgress((next / 120) * 100);
            return next;
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, activeIdx, activeMedia]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none"
    >
      {/* Top Controller Bar */}
      <div className="p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white relative z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-3 text-lg font-bold hover:text-red-500 transition-colors group"
        >
          <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Browse</span>
        </button>
        <div className="text-center hidden md:block">
          <span className="text-xs text-rose-500 font-bold uppercase tracking-widest">
            Streaming Gallery ({activeIdx + 1} / {playlist.length})
          </span>
          <h4 className="text-xl font-black">{activeMedia.title || episode.title}</h4>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-zinc-300">
          <span>Swipe or Arrow keys to shift</span>
        </div>
      </div>

      {/* Main Video/Photo Screen Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
        
        {/* Left/Right Arrow Overlays */}
        {playlist.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
              className="absolute left-6 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-2xl"
              title="Previous Slide"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
              className="absolute right-6 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-2xl"
              title="Next Slide"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {activeMedia.type === 'video' ? (
            <div
              className="flex items-center justify-center z-10"
              style={{
                transform: `rotate(${rotation}deg)`,
                width: '100%',
                height: '100%',
                maxWidth: (rotation % 180 !== 0) ? '100vh' : '100%',
                maxHeight: (rotation % 180 !== 0) ? '100vw' : '100%',
              }}
            >
              <motion.video
                key={`vid-${activeMedia.url}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                ref={videoRef}
                src={activeMedia.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={handlePlayPause}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 ease-out"
                loop
                autoPlay={isPlaying}
              />
            </div>
          ) : (
            <motion.div
              key={`img-${activeMedia.url}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={activeMedia.url}
                alt={episode.title}
                className="w-full h-full object-cover blur-md opacity-30 absolute inset-0 scale-105"
              />
              <motion.img
                initial={{ scale: 0.98 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                src={activeMedia.url}
                alt={episode.title}
                onClick={handlePlayPause}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 cursor-pointer border border-white/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controller Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white relative z-20 flex flex-col gap-4">
        {/* Timeline Bar */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold min-w-[40px] text-zinc-400">
            {formatTime(currentTime)}
          </span>
          <div
            onClick={handleSeek}
            className="flex-grow h-1.5 bg-zinc-700/80 rounded-full overflow-hidden cursor-pointer relative group"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-red-600 rounded-full group-hover:bg-red-500 transition-colors"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute w-3.5 h-3.5 bg-red-500 rounded-full top-1/2 -translate-y-1/2 shadow-lg scale-0 group-hover:scale-100 transition-transform"
              style={{ left: `calc(${progress}% - 7px)` }}
            />
          </div>
          <span className="text-sm font-semibold min-w-[40px] text-zinc-400">
            {formatTime(duration)}
          </span>
        </div>

        {/* Media Buttons Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/10 rounded-full transition-colors hover:text-red-500"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current" />
              )}
            </button>
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = 0;
                setCurrentTime(0);
                setProgress(0);
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block text-zinc-300 hover:text-white"
              title="Reset Slide"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button
              onClick={handleMuteToggle}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-300 hover:text-white"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="text-center sm:hidden">
            <h4 className="text-sm font-bold truncate max-w-[150px]">{activeMedia.title || episode.title}</h4>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleNextSlide}
              className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold transition-colors border border-white/5 flex items-center gap-1.5"
            >
              <span>Next Slide</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-300 hover:text-white"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
