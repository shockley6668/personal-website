
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
import { LanguageContext } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { language } = useContext(LanguageContext);


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
    </div>
  );
};

export default App;
