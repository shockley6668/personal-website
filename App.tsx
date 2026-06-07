import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import About from './components/About';
import Education from './components/Education';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Research from './components/Research';
import Awards from './components/Awards';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageContext } from './contexts/LanguageContext';
import ThreeBackground from './components/effects/ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global ScrollTrigger for all section titles to change color on scroll
    const sectionTitles = gsap.utils.toArray('.apple-gradient-section-title');
    sectionTitles.forEach((title: any) => {
      gsap.to(title, {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%', // Starts changing when it enters viewport from bottom
          end: 'top 50%',   // Finishes when it reaches the middle of the screen
          scrub: true,
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-apple-fg selection:bg-apple-fg selection:text-apple-bg">
      <ThreeBackground />
      
      <div className="z-10 relative flex flex-col flex-grow w-full">
        <Header />
        
        <main className="flex-grow w-full flex flex-col">
          <Hero />
          <WhatIDo />
          <Projects />
          <About />
          <Internships />
          <Education />
          <Research />
          <Awards />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;
