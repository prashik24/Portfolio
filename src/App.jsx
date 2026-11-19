import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import ProjectModal from './components/ProjectModal';
import './styles/style.css';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeProject, setActiveProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-app">
      <div className="ambient-glow" aria-hidden="true"></div>

      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      <main>
        <Hero 
          personal={portfolioData.personal} 
          onOpenResume={() => setIsResumeOpen(true)} 
        />
        <Metrics stats={portfolioData.stats} />
        <Projects 
          projects={portfolioData.projects} 
          onSelectProject={setActiveProject} 
        />
        <Achievements achievements={portfolioData.achievements} />
        <Skills skills={portfolioData.skills} />
        <Timeline 
          education={portfolioData.education} 
          responsibilities={portfolioData.responsibilities} 
        />
        <Contact personal={portfolioData.personal} />
      </main>

      {/* Modals */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
      
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        resumePath={portfolioData.personal.resumePdfPath} 
      />
    </div>
  );
}
