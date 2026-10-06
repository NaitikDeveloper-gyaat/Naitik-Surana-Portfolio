import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
}) => {
  const [imageSrc, setImageSrc] = React.useState<string>(() => {
    return localStorage.getItem('naitik_custom_portrait') || '/naitik.png';
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          try {
            localStorage.setItem('naitik_custom_portrait', result);
          } catch {
            // storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          try {
            localStorage.setItem('naitik_custom_portrait', result);
          } catch {
            // storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Navbar - 3 links adjusted with justify-between */}
      <FadeIn
        delay={0}
        y={-20}
        duration={0.7}
        className="w-full z-20"
      >
        <nav className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading - slightly decreased size for perfect desktop visibility */}
      <div className="w-full overflow-hidden z-0">
        <FadeIn delay={0.15} y={40} duration={0.7}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center mt-6 sm:mt-4 md:-mt-2 lg:mt-0 text-[12vw] sm:text-[13vw] md:text-[13.5vw] lg:text-[14vw] xl:text-[13.8vw] pointer-events-none">
            Hi, i&apos;m Naitik
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet - exact Naitik image retaining all functions, animations & attributes */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
        title="Naitik - Click or drag & drop to update portrait"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <FadeIn delay={0.6} y={30} duration={0.8}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={imageSrc}
              alt="Naitik Creator Portrait"
              className="w-[220px] sm:w-[270px] md:w-[330px] lg:w-[380px] max-h-[55vh] sm:max-h-[62vh] md:max-h-[68vh] object-contain drop-shadow-2xl select-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar - updated text: Still exploring & always learning */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[300px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Still exploring &amp; always learning
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
