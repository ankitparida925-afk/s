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
import netflixLogo from './assets/netflix_logo.png';
import loginLogo from './assets/login_logo.png';
import profilesBg from './assets/profiles_background.jpg';
import netflixTudum from './assets/netflix_tudum.mp3';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autoplayMusic, setAutoplayMusic] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); // 'love' or 'guest' or null
  const [activeTab, setActiveTab] = useState('loveflix'); // 'proposal' or 'loveflix'

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    
    // Play the official high-fidelity Netflix TUDUM sound effect
    try {
      const tudumAudio = new Audio(netflixTudum);
      tudumAudio.volume = 0.85;
      tudumAudio.play().catch(err => console.log("Official Tudum playback blocked:", err));
    } catch (err) {
      console.log("Audio constructor error:", err);
    }
    
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
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Cinematic Replaced Logo */}
              <div className="flex justify-center mb-12">
                <img 
                  src={loginLogo} 
                  alt="Netflix Logo" 
                  className="h-16 md:h-20 object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              
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

      {/* DASHBOARD: LoveFlix Video Hub */}
      {selectedProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LoveFlix 
            partnerName={selectedProfile === 'love' ? 'Sim Sim' : 'Guest'} 
            profileImage={selectedProfile === 'love' ? simsimProfile : null}
          />
        </motion.div>
      )}

    </div>
  );
}
