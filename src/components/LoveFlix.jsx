import React, { useState } from 'react';
import LoveFlixBillboard from './LoveFlixBillboard';
import LoveFlixRow from './LoveFlixRow';
import LoveFlixPlayer from './LoveFlixPlayer';
import { Search, Heart, ExternalLink, Plus, Film, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import firstMeetVideo from '../assets/first_meet.mp4';
import kindestHeartVideo from '../assets/kindest_heart.mp4';
import masterpieceVideo from '../assets/masterpiece_her.mp4';
import fanFavoriteVideo from '../assets/fan_favorite.mp4';
import newMemoryVid from '../assets/new_memory_vid.mp4';
import newMemoryVid2 from '../assets/new_memory_vid2.mp4';
import amazingReason3Video from '../assets/amazing_reason_3.mp4';
import amazingReason4Video from '../assets/amazing_reason_4.mp4';
import newMemoryImg1 from '../assets/new_memory_img1.jpeg';
import newMemoryImg3 from '../assets/new_memory_img3.jpeg';
import newMemoryImg4 from '../assets/new_memory_img4.jpeg';
import loverMusic from '../assets/lover_music.mp3';
import somethingAboutYouMusic from '../assets/something_about_you.mp3';
import beMyBabyMusic from '../assets/be_my_baby.mp3';
import stealMyGirlMusic from '../assets/steal_my_girl.mp3';
import cruelSummerMusic from '../assets/cruel_summer.mp3';
import loginLogo from '../assets/login_logo.png';
import unexplainedImg1 from '../assets/unexplained_1.jpeg';
import unexplainedImg2 from '../assets/unexplained_2.jpeg';
import unexplainedImg3 from '../assets/unexplained_3.jpeg';
import unexplainedVid1 from '../assets/unexplained_vid1.mp4';
import unexplainedVid2 from '../assets/unexplained_vid2.mp4';
import unexplainedVid3 from '../assets/unexplained_vid3.mp4';
import trendingVid1 from '../assets/trending_vid1.mp4';
import trendingVid2 from '../assets/trending_vid2.mp4';

const TRENDING_EPISODES = [
  {
    id: 't6',
    title: 'Top Highlight 🎥',
    desc: 'This special capture is currently trending at #1. Pure happiness captured in a frame.',
    url: unexplainedImg1,
    videoUrl: trendingVid1,
    bgMusic: cruelSummerMusic,
    rotate: 270,
    duration: '1:45',
    progress: 0,
    match: '100% Match',
  },
  {
    id: 't7',
    title: 'Trending Romance 💕',
    desc: 'The internet is talking about this clip. Every glance is filled with pure devotion and love.',
    url: unexplainedImg2,
    videoUrl: trendingVid2,
    bgMusic: cruelSummerMusic,
    rotate: 270,
    duration: '2:15',
    progress: 0,
    match: '99% Match',
  },
  {
    id: 't5',
    title: 'Fan Favorite 🌟',
    desc: 'This clip captured hearts all over. It is easily the most popular highlight of your story so far.',
    url: newMemoryImg4,
    videoUrl: fanFavoriteVideo,
    bgMusic: cruelSummerMusic,
    duration: '2:30',
    progress: 0,
    match: '100% Match',
  },
  {
    id: 't4',
    title: 'A Masterpiece Called Her 🎨',
    desc: 'Some videos entertain people for a few minutes. This one manages to make my entire day better every time I watch it.',
    url: newMemoryImg1,
    videoUrl: masterpieceVideo,
    bgMusic: stealMyGirlMusic,
    duration: '1:30',
    progress: 0,
    match: '100% Match',
  },

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

const WHY_SHE_IS_AMAZING_EPISODES = [
  {
    id: 'w1',
    title: 'The Smile That Fixes Everything 😊',
    desc: 'Every time you smile, even the toughest days feel a little lighter. Your smile is my favorite notification.',
    url: newMemoryImg3,
    videoUrl: firstMeetVideo,
    bgMusic: loverMusic,
    rotate: 270,
    duration: '2:15',
    progress: 95,
    match: '99% Match',
    gallery: [
      { type: 'video', url: firstMeetVideo, rotate: 270 },
      { type: 'video', url: kindestHeartVideo, rotate: 270 },
      { type: 'video', url: amazingReason3Video, rotate: 270 },
      { type: 'video', url: amazingReason4Video, rotate: 270 }
    ]
  },
  {
    id: 'w2',
    title: 'The Kindest Heart 💖',
    desc: "You care about people in ways that most don't notice. That's one of the many reasons I admire you.",
    url: newMemoryImg4,
    videoUrl: kindestHeartVideo,
    bgMusic: loverMusic,
    rotate: 270,
    duration: '3:05',
    progress: 88,
    match: '98% Match',
    gallery: [
      { type: 'video', url: firstMeetVideo, rotate: 270 },
      { type: 'video', url: kindestHeartVideo, rotate: 270 },
      { type: 'video', url: amazingReason3Video, rotate: 270 },
      { type: 'video', url: amazingReason4Video, rotate: 270 }
    ]
  },
  {
    id: 'w3',
    title: 'My Favorite Person to Talk To 💬',
    desc: "No matter the topic, the conversation becomes interesting when it's with you.",
    url: newMemoryImg1,
    videoUrl: amazingReason3Video,
    bgMusic: loverMusic,
    rotate: 270,
    duration: '1:45',
    progress: 75,
    match: '100% Match',
    gallery: [
      { type: 'video', url: firstMeetVideo, rotate: 270 },
      { type: 'video', url: kindestHeartVideo, rotate: 270 },
      { type: 'video', url: amazingReason3Video, rotate: 270 },
      { type: 'video', url: amazingReason4Video, rotate: 270 }
    ]
  },
  {
    id: 'w4',
    title: 'Our Beautiful Spark ✨',
    desc: "A raw, genuine highlight of us. Every single second spent with you is a constant reminder of how incredibly lucky I am.",
    url: newMemoryImg3,
    videoUrl: amazingReason4Video,
    bgMusic: loverMusic,
    rotate: 270,
    duration: '2:00',
    progress: 0,
    match: '100% Match',
    gallery: [
      { type: 'video', url: firstMeetVideo, rotate: 270 },
      { type: 'video', url: kindestHeartVideo, rotate: 270 },
      { type: 'video', url: amazingReason3Video, rotate: 270 },
      { type: 'video', url: amazingReason4Video, rotate: 270 }
    ]
  },
];



const DEFAULT_SEASON_OF_US = [
  {
    id: 'sou1',
    title: 'S1:E1 - The Spark & The Smile 😊',
    desc: 'The beautiful day our worlds connected. Your smile instantly became my favorite view, and a simple conversation blossomed into a promise of forever.',
    url: newMemoryImg3,
    bgMusic: beMyBabyMusic,
    duration: '2:15',
    progress: 95,
    match: '99% Match',
    gallery: [
      { type: 'image', url: newMemoryImg3 },
      { type: 'image', url: newMemoryImg4 },
      { type: 'image', url: newMemoryImg1 }
    ]
  },
  {
    id: 'sou2',
    title: 'S1:E2 - Late Night Melodies 🎵',
    desc: 'Sharing our favorite tracks and chatting late into the night. It felt as if Taylor Swift wrote every single love song just to describe us.',
    url: newMemoryImg4,
    bgMusic: beMyBabyMusic,
    duration: '3:05',
    progress: 88,
    match: '98% Match',
    gallery: [
      { type: 'image', url: newMemoryImg4 },
      { type: 'image', url: newMemoryImg1 },
      { type: 'image', url: newMemoryImg3 }
    ]
  },
  {
    id: 'sou3',
    title: 'S1:E3 - A Sweet Highlight 💖',
    desc: 'Another beautiful chapter recorded in our journey. Every clip and image tells a story of happiness.',
    url: newMemoryImg1,
    videoUrl: newMemoryVid,
    bgMusic: beMyBabyMusic,
    duration: '1:15',
    progress: 0,
    match: '100% Match',
    gallery: [
      { type: 'video', url: newMemoryVid },
      { type: 'image', url: newMemoryImg1 },
      { type: 'image', url: newMemoryImg3 }
    ]
  },
  {
    id: 'sou4',
    title: 'S1:E4 - Infinite Happiness ✨',
    desc: 'Capturing our favorite smiles, cozy warmth, and laughter in a memory that will remain forever fresh.',
    url: newMemoryImg3,
    videoUrl: newMemoryVid2,
    bgMusic: beMyBabyMusic,
    duration: '2:10',
    progress: 0,
    match: '100% Match',
    gallery: [
      { type: 'video', url: newMemoryVid2 },
      { type: 'image', url: newMemoryImg4 },
      { type: 'image', url: newMemoryImg3 }
    ]
  }
];

const THE_UNEXPLAINED_PHENOMENA_EPISODES = [
  {
    id: 'up1',
    title: 'Gravity-Defying Smiles 🌌',
    desc: 'Whenever you are close, gravity seems to lose its grip. The laws of physics just do not apply when we are laughing together.',
    url: unexplainedImg1,
    duration: '2:00',
    progress: 0,
    match: '99% Match',
    gallery: [
      { type: 'image', url: unexplainedImg1 },
      { type: 'image', url: unexplainedImg2 },
      { type: 'image', url: unexplainedImg3 },
      { type: 'video', url: unexplainedVid1, rotate: 270 },
      { type: 'video', url: unexplainedVid2, rotate: 270 },
      { type: 'video', url: unexplainedVid3, rotate: 270 }
    ]
  },
  {
    id: 'up2',
    title: 'The Telepathy Effect 🧠✨',
    desc: 'The unexplained mystery of how we often say the exact same things at the exact same moment. It is too perfect to be just a coincidence.',
    url: unexplainedImg2,
    duration: '2:00',
    progress: 0,
    match: '98% Match',
    gallery: [
      { type: 'image', url: unexplainedImg1 },
      { type: 'image', url: unexplainedImg2 },
      { type: 'image', url: unexplainedImg3 },
      { type: 'video', url: unexplainedVid1, rotate: 270 },
      { type: 'video', url: unexplainedVid2, rotate: 270 },
      { type: 'video', url: unexplainedVid3, rotate: 270 }
    ]
  },
  {
    id: 'up3',
    title: 'How You Stole My Heart 💘',
    desc: 'Scientists still cannot explain how a single glance from you managed to bypass all defenses and capture my heart forever.',
    url: unexplainedImg3,
    duration: '2:00',
    progress: 0,
    match: '100% Match',
    gallery: [
      { type: 'image', url: unexplainedImg1 },
      { type: 'image', url: unexplainedImg2 },
      { type: 'image', url: unexplainedImg3 },
      { type: 'video', url: unexplainedVid1, rotate: 270 },
      { type: 'video', url: unexplainedVid2, rotate: 270 },
      { type: 'video', url: unexplainedVid3, rotate: 270 }
    ]
  },
  {
    id: 'up4',
    title: 'Unexplained Chemistry 🧪',
    desc: 'No explanation needed. This video shows the chemistry and joy we share whenever we are close.',
    url: unexplainedImg1,
    videoUrl: unexplainedVid1,
    rotate: 270,
    duration: '1:50',
    progress: 0,
    match: '99% Match',
    gallery: [
      { type: 'image', url: unexplainedImg1 },
      { type: 'image', url: unexplainedImg2 },
      { type: 'image', url: unexplainedImg3 },
      { type: 'video', url: unexplainedVid1, rotate: 270 },
      { type: 'video', url: unexplainedVid2, rotate: 270 },
      { type: 'video', url: unexplainedVid3, rotate: 270 }
    ]
  },
  {
    id: 'up5',
    title: 'A Magic Moment ✨',
    desc: 'A capturing highlight that defies standard definition. Simply pure magic in motion.',
    url: unexplainedImg2,
    videoUrl: unexplainedVid2,
    rotate: 270,
    duration: '2:15',
    progress: 0,
    match: '100% Match',
    gallery: [
      { type: 'image', url: unexplainedImg1 },
      { type: 'image', url: unexplainedImg2 },
      { type: 'image', url: unexplainedImg3 },
      { type: 'video', url: unexplainedVid1, rotate: 270 },
      { type: 'video', url: unexplainedVid2, rotate: 270 },
      { type: 'video', url: unexplainedVid3, rotate: 270 }
    ]
  },
  {
    id: 'up6',
    title: 'Sweet Mysteries 🍭',
    desc: 'Another beautiful glimpse of our journey that is too perfect for words.',
    url: unexplainedImg3,
    videoUrl: unexplainedVid3,
    rotate: 270,
    duration: '1:40',
    progress: 0,
    match: '98% Match',
    gallery: [
      { type: 'image', url: unexplainedImg1 },
      { type: 'image', url: unexplainedImg2 },
      { type: 'image', url: unexplainedImg3 },
      { type: 'video', url: unexplainedVid1, rotate: 270 },
      { type: 'video', url: unexplainedVid2, rotate: 270 },
      { type: 'video', url: unexplainedVid3, rotate: 270 }
    ]
  }
];

export default function LoveFlix({ partnerName, profileImage, onNavigateToProposal }) {
  const [activeEpisode, setActiveEpisode] = useState(null);
  
  // Custom Season of Us States
  const [seasonOfUsEpisodes, setSeasonOfUsEpisodes] = useState(() => {
    const saved = localStorage.getItem('seasons_of_us_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length < DEFAULT_SEASON_OF_US.length) {
          return DEFAULT_SEASON_OF_US;
        }
        // Ensure background music and galleries are set on existing saved episodes
        return parsed.map((ep, idx) => {
          if (ep.id.startsWith('sou')) {
            const defaultEp = DEFAULT_SEASON_OF_US.find(d => d.id === ep.id);
            return {
              ...ep,
              bgMusic: beMyBabyMusic,
              gallery: ep.gallery || (defaultEp ? defaultEp.gallery : [
                { type: ep.videoUrl ? 'video' : 'image', url: ep.videoUrl || ep.url }
              ])
            };
          }
          return ep;
        });
      } catch (e) {
        return DEFAULT_SEASON_OF_US;
      }
    }
    return DEFAULT_SEASON_OF_US;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const handlePlayEpisode = (episode) => {
    if (episode && episode.id && episode.id.toString().startsWith('sou')) {
      const souGallery = seasonOfUsEpisodes.map(ep => ({
        type: ep.videoUrl ? 'video' : 'image',
        url: ep.videoUrl || ep.url,
        title: ep.title,
        desc: ep.desc,
        rotate: ep.rotate || 0
      }));
      setActiveEpisode({
        ...episode,
        gallery: souGallery,
        bgMusic: beMyBabyMusic
      });
    } else {
      setActiveEpisode(episode);
    }
  };

  const handleAddEpisodeSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const episodeNumber = seasonOfUsEpisodes.length + 1;
    const coverUrl = newImageUrl || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600';
    const customGallery = [];
    if (newVideoUrl) {
      customGallery.push({ type: 'video', url: newVideoUrl });
    }
    customGallery.push({ type: 'image', url: coverUrl });
    // Add default fallbacks to gallery to make it sliding
    customGallery.push({ type: 'image', url: newMemoryImg3 });

    const newEpisode = {
      id: 'sou_' + Date.now(),
      title: `S1:E${episodeNumber} - ${newTitle}`,
      desc: newDesc,
      url: coverUrl,
      videoUrl: newVideoUrl || undefined,
      bgMusic: beMyBabyMusic,
      duration: '3:00',
      progress: 0,
      match: '100% Match',
      gallery: customGallery,
    };

    const updated = [...seasonOfUsEpisodes, newEpisode];
    setSeasonOfUsEpisodes(updated);
    localStorage.setItem('seasons_of_us_memories', JSON.stringify(updated));

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewImageUrl('');
    setNewVideoUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#141414] text-white min-h-screen relative overflow-x-hidden font-sans">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 h-16 md:h-20 bg-gradient-to-b from-black/80 via-black/45 to-transparent flex items-center justify-between px-6 md:px-16 transition-colors select-none">
        
        {/* Left Side Navigation Items */}
        <div className="flex items-center gap-6 md:gap-12">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={loginLogo} 
              alt="Netflix Logo" 
              className="h-10 md:h-12 object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
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
              className="hover:text-zinc-400 cursor-pointer transition-colors"
            >
              Proposal Hub
            </span>
            <span 
              onClick={() => setIsModalOpen(true)}
              className="hover:text-red-500 cursor-pointer font-bold text-red-500 transition-colors flex items-center gap-1"
            >
              <span>+ Script Episode</span>
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
            title: 'The Girl From My Upside Down - Main Feature',
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
            title="Why She Is Amazing 💖" 
            items={WHY_SHE_IS_AMAZING_EPISODES} 
            onPlay={handlePlayEpisode} 
          />
          <LoveFlixRow 
            title="The Unexplained Phenomena 🌌" 
            items={THE_UNEXPLAINED_PHENOMENA_EPISODES} 
            onPlay={handlePlayEpisode} 
          />
          <LoveFlixRow 
            title="Season of Us 💖" 
            items={seasonOfUsEpisodes} 
            onPlay={handlePlayEpisode} 
          />

        </div>
      </main>

      {/* Episode Creator Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div>
                <span className="text-red-500 font-bold uppercase text-xs tracking-widest block mb-1">Netflix Originals</span>
                <h3 className="text-2xl md:text-3xl font-black text-white font-bebas tracking-wide flex items-center gap-2">
                  <Film className="w-6 h-6 text-red-600 animate-pulse" />
                  <span>Script a New Episode</span>
                </h3>
              </div>

              <form onSubmit={handleAddEpisodeSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400">Episode Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., First Romantic Date"
                    className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm border border-transparent focus:border-red-600 outline-none placeholder-zinc-500 transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400">Episode Description (Memory Log)</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Explain what happened in this beautiful episode..."
                    rows={3}
                    className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm border border-transparent focus:border-red-600 outline-none placeholder-zinc-500 resize-none transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400 font-sans">Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... (or blank for default)"
                    className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm border border-transparent focus:border-red-600 outline-none placeholder-zinc-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400 font-sans">Video URL (Optional)</label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="Direct MP4 link (or blank for image slideshow)"
                    className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm border border-transparent focus:border-red-600 outline-none placeholder-zinc-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-extrabold text-sm transition-colors mt-2 flex items-center justify-center gap-1.5 shadow-lg border border-red-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Episode</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
