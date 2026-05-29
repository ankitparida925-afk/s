import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoveFlixPlayer({ episode, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // If using an actual video file, standard listeners track state
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video playback error:", err));
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
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

  // Autoplay video on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Auto-play blocked or failed, waiting for user click", err);
        setIsPlaying(false);
      });
    }
  }, [episode]);

  // Fallback visualizer progress timer for images if no actual video file is set
  useEffect(() => {
    if (!episode.videoUrl) {
      setDuration(120); // Dummy 2 minutes
      const timer = setInterval(() => {
        if (isPlaying) {
          setCurrentTime((prev) => {
            if (prev >= 120) {
              setIsPlaying(false);
              return 120;
            }
            const next = prev + 1;
            setProgress((next / 120) * 100);
            return next;
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, episode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between"
    >
      {/* Top Controller Bar */}
      <div className="p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white relative z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-3 text-lg font-bold hover:text-red-500 transition-colors group"
        >
          <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Browse</span>
        </button>
        <div className="text-center hidden md:block">
          <span className="text-xs text-rose-500 font-bold uppercase tracking-widest">Streaming Episode</span>
          <h4 className="text-xl font-black">{episode.title}</h4>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </div>

      {/* Main Video Screen Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950">
        {episode.videoUrl ? (
          <video
            ref={videoRef}
            src={episode.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={handlePlayPause}
            className="w-full h-full object-contain cursor-pointer"
            loop
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={episode.url}
              alt={episode.title}
              className="w-full h-full object-cover blur-sm opacity-35 absolute inset-0"
            />
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              src={episode.url}
              alt={episode.title}
              onClick={handlePlayPause}
              className="max-h-[85vh] max-w-[95vw] object-contain rounded-xl shadow-2xl relative z-10 cursor-pointer border border-white/10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      {/* Bottom Controller Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white relative z-10 flex flex-col gap-4">
        {/* Timeline Bar */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold min-w-[40px] text-zinc-400">
            {formatTime(currentTime)}
          </span>
          <div
            onClick={handleSeek}
            className="flex-grow h-1.5 bg-zinc-700 rounded-full overflow-hidden cursor-pointer relative group"
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
            <h4 className="text-sm font-bold truncate max-w-[150px]">{episode.title}</h4>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold transition-colors border border-white/5 flex items-center gap-1.5"
            >
              <span>Next Episode</span>
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
