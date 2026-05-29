import React, { useState } from 'react';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import ReasonsList from './components/ReasonsList';
import Gallery from './components/Gallery';
import MusicPlayer from './components/MusicPlayer';
import ProposalBox from './components/ProposalBox';
import LoveFlix from './components/LoveFlix';
import NetflixLogin from './components/NetflixLogin';
import simsimProfile from './assets/simsim_profile.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

// Web Audio API Realistic Netflix "TUDUM" Sound Synthesizer
const playTudum = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // --- BEAT 1: "TU" (Thump at T=0) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(80, now); // 80 Hz Low thud
    
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(140, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.7, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.18);

    // --- BEAT 2: "DUM" (Heavy Drop at T=0.12) ---
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(70, now + 0.12); // Deep chest thud
    
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(110, now + 0.12);

    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.95, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start(now + 0.12);
    osc2.stop(now + 0.9);

    // --- THE METALLIC / CHORD SLIDE TAIL (T=0.15 to 1.8) ---
    const osc3 = ctx.createOscillator();
    const osc4 = ctx.createOscillator();
    const gainShimmer = ctx.createGain();
    const filterShimmer = ctx.createBiquadFilter();

    osc3.type = 'sawtooth';
    osc3.frequency.setValueAtTime(220, now + 0.15); // A3 base
    osc3.frequency.exponentialRampToValueAtTime(440, now + 0.8); // Glides to A4

    osc4.type = 'triangle';
    osc4.frequency.setValueAtTime(329.63, now + 0.15); // E4 perfect fifth
    osc4.frequency.exponentialRampToValueAtTime(659.25, now + 0.8); // Glides to E5

    filterShimmer.type = 'highpass';
    filterShimmer.frequency.setValueAtTime(280, now + 0.15);

    gainShimmer.gain.setValueAtTime(0, now + 0.15);
    gainShimmer.gain.linearRampToValueAtTime(0.22, now + 0.28);
    gainShimmer.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc3.connect(filterShimmer);
    osc4.connect(filterShimmer);
    filterShimmer.connect(gainShimmer);
    gainShimmer.connect(ctx.destination);

    osc3.start(now + 0.15);
    osc3.stop(now + 1.8);
    osc4.start(now + 0.15);
    osc4.stop(now + 1.8);

  } catch (error) {
    console.error("Failed to play synthesized Tudum: ", error);
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autoplayMusic, setAutoplayMusic] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); // 'love' or 'guest' or null
  const [activeTab, setActiveTab] = useState('loveflix'); // 'proposal' or 'loveflix'

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    playTudum(); // Synthesize the iconic TUDUM sound immediately
    
    // Smooth delay before starting soft background music track to let Tudum finish playing
    setTimeout(() => {
      setAutoplayMusic(true);
    }, 1500);
  };

  const triggerMusicAutoplay = () => {
    setAutoplayMusic(true);
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white bg-slate-950">
      
      {/* Background Starry & Floating Particles */}
      <Background />

      {/* Modern Glowing Custom Cursor */}
      <CustomCursor />

      {/* Floating & Cinematic Music Player */}
      <MusicPlayer 
        autoplayRequested={autoplayMusic} 
        onMusicStart={() => setAutoplayMusic(true)} 
      />

      {/* LOGIN PAGE: Authentication Gateway */}
      <AnimatePresence>
        {!isLoggedIn && (
          <NetflixLogin onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </AnimatePresence>

      {/* STARTUP: Netflix "Who's Watching?" Profile Selector */}
      <AnimatePresence>
        {isLoggedIn && !selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Cinematic Netflix Title */}
              <h1 className="text-5xl md:text-7xl font-normal font-bebas tracking-wider text-white mb-12 flex items-center justify-center">
                <span className="text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]">Netflix</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl font-bold text-zinc-300 mb-8">
                Who's watching?
              </h2>

              {/* Profiles Row */}
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16">
                
                {/* Profile 1: My Love */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleProfileSelect('love')}
                  className="flex flex-col items-center gap-4 cursor-pointer group"
                >
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-[#2f2f2f] flex items-center justify-center font-black text-4xl text-white group-hover:ring-4 group-hover:ring-white transition-all shadow-xl relative overflow-hidden">
                    <img src={simsimProfile} alt="Sim Sim" className="w-full h-full object-cover" />
                    {/* Glowing highlight border */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-zinc-400 group-hover:text-white transition-colors">
                    Sim Sim 👑
                  </span>
                </motion.div>

                {/* Profile 2: Guest */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleProfileSelect('guest')}
                  className="flex flex-col items-center gap-4 cursor-pointer group"
                >
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-4xl text-white group-hover:ring-4 group-hover:ring-white transition-all shadow-xl relative overflow-hidden">
                    <span>🌸</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-zinc-400 group-hover:text-white transition-colors">
                    Guest View
                  </span>
                </motion.div>

              </div>

              {/* Profile manage button */}
              <div className="inline-block px-6 py-2 border border-zinc-600 text-zinc-500 hover:border-zinc-300 hover:text-zinc-300 rounded font-bold text-sm uppercase tracking-widest transition-colors cursor-pointer">
                Manage Profiles
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DASHBOARD: Tab Switching System */}
      {selectedProfile && (
        <>
          {activeTab === 'loveflix' ? (
            /* Tab 1: LoveFlix Hub */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <LoveFlix 
                partnerName={selectedProfile === 'love' ? 'Sim Sim' : 'Guest'} 
                profileImage={selectedProfile === 'love' ? simsimProfile : null}
                onNavigateToProposal={() => setActiveTab('proposal')}
              />
            </motion.div>
          ) : (
            /* Tab 2: Proposal Letter & Love Journey Hub */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col min-h-screen"
            >
              {/* Back to LoveFlix Nav Bar */}
              <div className="relative z-20 w-full h-16 bg-slate-950/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-16">
                <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('loveflix')}>
                  <span className="text-red-600 font-normal text-2xl tracking-wider font-bebas">
                    Netflix
                  </span>
                </div>

                <motion.button
                  onClick={() => setActiveTab('loveflix')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg border border-red-500/20 shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Back to Video Hub</span>
                </motion.button>
              </div>

              {/* Proposal Letter main blocks */}
              <main className="relative z-10 w-full flex-grow flex flex-col gap-12 pb-16 pt-6">
                
                {/* Typewriter Hero Card */}
                <Hero />

                {/* Live Love Countdown Timer */}
                <Countdown />

                {/* Reasons why I love you */}
                <ReasonsList />

                {/* Memory Grid Carousel */}
                <Gallery />

                {/* Will You Be Mine Interactive Box */}
                <div onClick={triggerMusicAutoplay}>
                  <ProposalBox />
                </div>
              </main>

              {/* Footer bar */}
              <footer className="relative z-10 w-full py-8 text-center text-rose-300/40 text-sm md:text-base tracking-widest font-semibold border-t border-white/5 bg-slate-950/40 backdrop-blur-md">
                <p className="flex items-center justify-center gap-2">
                  <span>Made with endless love</span>
                  <span className="text-rose-500 animate-pulse text-lg">❤️</span>
                </p>
              </footer>
            </motion.div>
          )}
        </>
      )}

    </div>
  );
}
