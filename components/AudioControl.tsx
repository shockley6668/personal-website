
import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';

interface AudioControlProps {
  isMusicSounding: boolean; // True if music is playing and unmuted
  toggleMusic: () => void;
  language: Language;
}

const AudioControl: React.FC<AudioControlProps> = ({ isMusicSounding, toggleMusic, language }) => {
  const label = isMusicSounding 
    ? (language === 'zh' ? '静音' : 'Mute Music')
    : (language === 'zh' ? '播放音乐' : 'Play Music');

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-5 right-5 z-[100] w-12 h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      whileHover={{ scale: 1.1, rotate: isMusicSounding ? [0, 10, -10, 0] : 0 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      title={label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }} // Delay appearance slightly
    >
      <i className={`fas ${isMusicSounding ? 'fa-volume-up' : 'fa-volume-mute'} text-xl`}></i>
    </motion.button>
  );
};

export default AudioControl;
