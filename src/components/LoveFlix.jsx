import React, { useState } from 'react';
import LoveFlixBillboard from './LoveFlixBillboard';
import LoveFlixRow from './LoveFlixRow';
import LoveFlixPlayer from './LoveFlixPlayer';
import { Search, Bell, Heart, ExternalLink } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const TRENDING_EPISODES = [
  {
    id: 't1',
    title: 'The Sparkling First Meet ❤️',
    desc: 'Two nervous smiles, a simple greeting, and a spark that illuminated the universe.',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600',
    duration: '2:15',
    progress: 95,
    match: '99% Match',
  },
  {
    id: 't2',
    title: 'Dancing In The Moonlight ✨',
    desc: 'Whispered jokes, shared warmth, and a romantic starlit night where time completely stood still.',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600',
    duration: '3:05',
    progress: 88,
    match: '98% Match',
  },
  {
    id: 't3',
    title: 'The Great Coffee Escape ☕',
    desc: 'Cozy corners, holding hands in rainy afternoons, and dreaming of our futures over warm mugs.',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600',
    duration: '1:45',
    progress: 75,
    match: '100% Match',
  },
];

const SEASON_1_EPISODES = [
  {
    id: 's1e1',
    title: 'S1:E1 - Introduction to Us',
    desc: 'Our very first chat that started a beautiful chapter. Getting to know each other’s favorite songs.',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600',
    duration: '4:20',
    progress: 100,
    match: '99% Match',
  },
  {
    id: 's1e2',
    title: 'S1:E2 - Sunset Wanderlust',
    desc: 'Walking hand in hand through the local botanical park as the golden skies painted our cheeks pink.',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600',
    duration: '3:10',
    progress: 92,
    match: '97% Match',
  },
  {
    id: 's1e3',
    title: 'S1:E3 - Silliest Inside Jokes',
    desc: 'Laughing so hard we couldn’t speak over the most ridiculous memes. Bonding over mutual humor.',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600',
    duration: '2:50',
    progress: 60,
    match: '96% Match',
  },
];

const SEASON_2_EPISODES = [
  {
    id: 's2e1',
    title: 'S2:E1 - Sweet Adventures',
    desc: 'Our first mini road-trip together. Singalongs in the car and finding that hidden bakery.',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
    duration: '5:45',
    progress: 40,
    match: '99% Match',
  },
  {
    id: 's2e2',
    title: 'S2:E2 - Cozy Rain & Movie Marathons',
    desc: 'Sharing thick blankets, warm popcorn, and watching classic films while thunderstorms drum outside.',
    url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600',
    duration: '3:40',
    progress: 85,
    match: '98% Match',
  },
  {
    id: 's2e3',
    title: 'S2:E3 - Destiny & Promises 💍',
    desc: 'Talking late into the night about growing old together. Knowing deeply that we belong in each other’s embrace.',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600',
    duration: '4:55',
    progress: 10,
    match: '100% Match',
  },
];

export default function LoveFlix({ partnerName, profileImage, onNavigateToProposal }) {
  const [activeEpisode, setActiveEpisode] = useState(null);

  const handlePlayEpisode = (episode) => {
    setActiveEpisode(episode);
  };

  return (
    <div className="bg-[#141414] text-white min-h-screen relative overflow-x-hidden font-sans">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 h-16 md:h-20 bg-gradient-to-b from-black/80 via-black/45 to-transparent flex items-center justify-between px-6 md:px-16 transition-colors select-none">
        
        {/* Left Side Navigation Items */}
        <div className="flex items-center gap-6 md:gap-12">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-red-600 font-normal text-3xl md:text-4xl tracking-wider font-bebas drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">
              Netflix
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-zinc-300">
            <span className="text-white font-extrabold cursor-pointer">Home</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">TV Shows</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Movies</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">New & Popular</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">My List</span>
            <span 
              onClick={onNavigateToProposal}
              className="hover:text-red-500 cursor-pointer font-bold text-red-500 transition-colors flex items-center gap-1.5"
            >
              <span>Proposal Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-4 md:gap-6 text-sm text-zinc-300">
          <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <div className="flex items-center gap-1 bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold text-red-400">
            <Heart className="w-3 h-3 fill-current text-red-500 animate-pulse" />
            <span>VIP Access</span>
          </div>
          
          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded overflow-hidden bg-zinc-800 flex items-center justify-center font-black text-xs text-white select-none">
              {profileImage ? (
                <img src={profileImage} alt={partnerName} className="w-full h-full object-cover" />
              ) : (
                <span>{partnerName ? partnerName[0].toUpperCase() : 'G'}</span>
              )}
            </div>
            <span className="text-xs font-bold hidden sm:inline-block group-hover:text-white">
              {partnerName || 'Love'}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Netflix Content */}
      <main className="pb-24">
        {/* Billboard cinematic header */}
        <LoveFlixBillboard 
          onPlay={() => handlePlayEpisode({
            id: 'billboard_main',
            title: 'Our Love Story - Main Feature',
            desc: 'The complete romantic saga. Exploring our best dates, shared laughter, and forever promises.',
            url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200',
            duration: '5:20',
            progress: 80,
            match: '100% Match',
          })} 
        />

        {/* Dynamic Category Scrolling Rows */}
        <div className="mt-[-20px] md:mt-[-80px] relative z-20 flex flex-col gap-6">
          <LoveFlixRow 
            title="Trending Now 🔥" 
            items={TRENDING_EPISODES} 
            onPlay={handlePlayEpisode} 
          />
          <LoveFlixRow 
            title="Season 1: Early Spark 🌸" 
            items={SEASON_1_EPISODES} 
            onPlay={handlePlayEpisode} 
          />
          <LoveFlixRow 
            title="Season 2: Sweet Adventures ✈️" 
            items={SEASON_2_EPISODES} 
            onPlay={handlePlayEpisode} 
          />
        </div>
      </main>

      {/* Full-screen overlay streaming player */}
      <AnimatePresence>
        {activeEpisode && (
          <LoveFlixPlayer 
            episode={activeEpisode} 
            onClose={() => setActiveEpisode(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
