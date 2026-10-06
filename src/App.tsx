import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal, ProjectData } from './components/ProjectDetailModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] selection:bg-purple-500/30 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HeroSection */}
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 2. MarqueeSection */}
      <MarqueeSection />

      {/* 3. AboutSection */}
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. ProjectsSection */}
      <ProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Footer Details */}
      <footer className="w-full bg-[#0C0C0C] border-t border-white/10 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#D7E2EA]/60 select-none">
        <div className="flex items-center gap-3">
          <span className="font-bold uppercase tracking-widest text-white">Naitik</span>
          <span>&mdash;</span>
          <span>3D Creator & Visual Designer</span>
        </div>

        <div className="flex items-center gap-6 uppercase tracking-wider text-[11px]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Back to top &uarr;
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        <div>
          &copy; {new Date().getFullYear()} Naitik. All rights reserved.
        </div>
      </footer>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />
    </div>
  );
}
