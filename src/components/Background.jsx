import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Background() {
  const canvasRef = useRef(null);
  const [hearts, setHearts] = useState([]);

  // Generate interactive float hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substring(2, 9);
      const size = Math.random() * 20 + 10; // 10px to 30px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 8 + 6; // 6s to 14s
      const delay = Math.random() * 2;

      setHearts((prev) => [
        ...prev,
        { id, size, left, duration, delay }
      ]);

      // Prune old hearts
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, (duration + delay) * 1000 + 100);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Twinkling stars drawing on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const starsCount = 100;
    const stars = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: 0.005 + Math.random() * 0.015,
        twinkleFactor: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.twinkleFactor;
        if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.twinkleFactor = 1;
        } else if (star.alpha >= 0.95) {
          star.alpha = 0.95;
          star.twinkleFactor = -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0c0c0c]">
      {/* Canvas for Starry Night */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-65" />

      {/* Radiant Glowing Romantic Ambient Lights - Ambient Netflix Red Glow */}
      <div className="absolute top-[-30%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-red-600/[0.04] glowing-bg-circle mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-600/[0.04] glowing-bg-circle mix-blend-screen animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: '105vh', x: `${heart.left}vw`, scale: 0, opacity: 0 }}
              animate={{
                y: '-10vh',
                scale: [0.3, 1, 1.2, 0.8],
                opacity: [0, 0.8, 0.8, 0],
                rotate: [0, 45, -45, 90],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                ease: 'easeInOut',
              }}
              className="absolute text-rose-500/40 select-none pointer-events-none"
              style={{ fontSize: `${heart.size}px` }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
