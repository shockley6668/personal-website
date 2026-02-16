
import React, { useRef, useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero'; // Import the new Hero component
import About from './components/About';
import Education from './components/Education';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Research from './components/Research';
import Awards from './components/Awards';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AudioControl from './components/AudioControl';
import { LanguageContext } from './contexts/LanguageContext';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicSounding, setIsMusicSounding] = useState(false); // Tracks if music sound is ON
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const audioElement = document.getElementById('background-audio') as HTMLAudioElement;
    
    const handleAudioError = (event?: Event) => {
      const target = event?.target as HTMLAudioElement || audioElement;
      console.error(
        "Audio Playback Error: Failed to load or play 'background_music.mp3'. " +
        "Please ensure the file exists in the root directory of the application " +
        "and is a supported audio format (e.g., MP3, WAV, OGG).",
        target?.error
      );
      setIsMusicSounding(false);
    };

    if (audioElement) {
      audioRef.current = audioElement;
      
      if (audioElement.error) { // Check for error on load (e.g., due to autoplay failing)
        handleAudioError(); 
      } else if (!audioElement.muted && !audioElement.paused) {
        // Audio is already playing (e.g. browser remembered preference or successful autoplay)
        setIsMusicSounding(true);
      }
      // else, it's muted or paused, initial isMusicSounding state (false) is correct.

      audioElement.addEventListener('error', handleAudioError);
    } else {
      console.warn("Background audio element not found in the DOM.");
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleAudioError);
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      console.warn("Audio element reference not available. Cannot toggle music.");
      return;
    }

    const currentAudio = audioRef.current;

    if (currentAudio.error) {
      console.error(
        "Audio element has an error for 'background_music.mp3'. Cannot play.",
        currentAudio.error
      );
      setIsMusicSounding(false);
      return;
    }
    if (currentAudio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || 
        currentAudio.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      console.error(
        "Audio source not available or empty for 'background_music.mp3'. " +
        "Cannot play. Please check if the file exists and is accessible."
      );
      setIsMusicSounding(false);
      return;
    }

    if (currentAudio.muted || currentAudio.paused) {
      currentAudio.muted = false; 
      const playPromise = currentAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMusicSounding(true);
          })
          .catch(error => {
            console.error("Error attempting to play audio ('background_music.mp3'):", error);
            setIsMusicSounding(false);
          });
      } else {
        if (!currentAudio.paused && !currentAudio.muted) {
          setIsMusicSounding(true);
        } else {
          setIsMusicSounding(false);
           if (!currentAudio.error) {
             console.warn("Audio play() did not return a promise and might not have started. Check for 'error' events on the audio element.");
          }
        }
      }
    } else {
      currentAudio.muted = true; 
      setIsMusicSounding(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero /> {/* Add Hero component here */}
        <About />
        <Education />
        <Internships />
        <Projects />
        <Research />
        <Awards />
        <Skills />
        <Contact />
      </motion.main>
      <Footer />
      <AudioControl 
        isMusicSounding={isMusicSounding} 
        toggleMusic={toggleMusic} 
        language={language} 
      />
    </div>
  );
};

export default App;
