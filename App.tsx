import React, { useContext } from 'react';
import { LanguageContext } from './contexts/LanguageContext';

import Sidebar from './components/Sidebar';
import About from './components/About';
import Education from './components/Education';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Research from './components/Research';
import Awards from './components/Awards';
import Skills from './components/Skills';
import Highlights from './components/Highlights';
import Footer from './components/Footer';

const App: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="academic-layout">
      <Sidebar />

      <main className="academic-main">
        <About />
        <Highlights />
        <Education />
        <Internships />
        <Projects />
        <Awards />
        <Skills />
        <Research />
        <Footer />
      </main>
    </div>
  );
};

export default App;
