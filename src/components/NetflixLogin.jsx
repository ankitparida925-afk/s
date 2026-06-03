import React, { useState } from 'react';
import { motion } from 'framer-motion';
import loginLogo from '../assets/login_logo.png';
import loginBg from '../assets/login_background.png';

export default function NetflixLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('simsim@love.com');
  const [password, setPassword] = useState('foreverandever');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter a valid email and password.');
      return;
    }
    // Simulate login success
    onLoginSuccess();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black/60 select-none font-sans">
      {/* Background with blurred custom couple memory grid overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-[1px] opacity-80"
        style={{ 
          backgroundImage: `url(${loginBg})` 
        }}
      />
      {/* Deep overlay mask */}
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/40 to-black" />

      {/* Main Netflix Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[450px] p-8 md:p-16 bg-black/75 rounded-md border border-white/5 shadow-2xl flex flex-col justify-center"
      >
        <div className="flex justify-center mb-8">
          <img 
            src={loginLogo} 
            alt="Netflix Logo" 
            className="h-12 md:h-14 object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        <h2 className="text-3xl font-bold text-white mb-7">Sign In</h2>

        {error && (
          <div className="bg-[#e87c03] text-white text-xs py-2.5 px-4 rounded mb-4 font-semibold">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone number"
              className="w-full px-5 py-4 bg-[#333] text-white rounded-md text-sm border-b-2 border-transparent focus:border-red-600 outline-none transition-all placeholder-zinc-500"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-4 bg-[#333] text-white rounded-md text-sm border-b-2 border-transparent focus:border-red-600 outline-none transition-all placeholder-zinc-500"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#E50914] text-white font-extrabold py-4 rounded-md text-sm shadow-lg hover:bg-[#c10710] transition-colors mt-4"
          >
            Sign In
          </motion.button>
        </form>

        {/* Extras check box */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mt-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input 
              type="checkbox" 
              defaultChecked 
              className="accent-[#E50914] w-4 h-4 rounded cursor-pointer" 
            />
            <span>Remember me</span>
          </label>
          <span className="hover:underline cursor-pointer">Need help?</span>
        </div>

        {/* Recommending signup overlay */}
        <div className="mt-12 text-sm text-zinc-500">
          <span>New to Netflix? </span>
          <span className="text-white hover:underline cursor-pointer font-bold">
            Sign up forever ❤️
          </span>
        </div>

        <p className="text-[11px] text-zinc-500 mt-4 leading-normal">
          This page is protected by Google reCAPTCHA to ensure you are completely human, destinated to love, and authenticated forever.
        </p>

      </motion.div>
    </div>
  );
}
