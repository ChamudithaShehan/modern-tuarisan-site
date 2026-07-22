'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Royalty-free nature audio soundscape
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/16/audio-[#0EA5A4]97f4a.mp3?filename=nature-birds-and-sea-waves-112702.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <button
        onClick={toggleSound}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#0F766E]/90 border-[#D4AF37] text-[#D4AF37] scale-105'
            : 'bg-[#022C22]/80 border-white/20 text-white/80 hover:text-white hover:border-[#D4AF37]/50'
        }`}
        title={isPlaying ? 'Mute Paradise Soundscape' : 'Play Ceylon Nature Ambient Audio'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase hidden sm:inline">
              Island Nature Audio
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-[#D4AF37]" />
            <span className="text-[11px] font-semibold tracking-wider uppercase hidden sm:inline">
              Ambient Sound
            </span>
          </>
        )}
      </button>
    </div>
  );
}
