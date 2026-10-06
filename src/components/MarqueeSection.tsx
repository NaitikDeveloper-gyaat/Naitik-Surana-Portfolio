import React, { useEffect, useRef, useState } from 'react';

const row1Gifs = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const row2Gifs = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Tripled lists for seamless scrolling
const tripledRow1 = [...row1Gifs, ...row1Gifs, ...row1Gifs];
const tripledRow2 = [...row2Gifs, ...row2Gifs, ...row2Gifs];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const currentScrollY = window.scrollY;
      const calculatedOffset =
        (currentScrollY - sectionTop + window.innerHeight) * 0.3;

      setOffset(calculatedOffset);
    };

    const onScrollPassive = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener('scroll', onScrollPassive, { passive: true });
    window.addEventListener('resize', onScrollPassive, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScrollPassive);
      window.removeEventListener('resize', onScrollPassive);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: moves RIGHT on scroll (translateX(offset - 200)) */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 will-change-transform"
            style={{
              transform: `translateX(${offset - 200}px)`,
              willChange: 'transform',
            }}
          >
            {tripledRow1.map((url, index) => (
              <img
                key={`row1-${index}`}
                src={url}
                alt="3D Motion Preview"
                loading="lazy"
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl object-cover flex-shrink-0 bg-neutral-900 border border-white/5"
              />
            ))}
          </div>
        </div>

        {/* Row 2: moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 will-change-transform"
            style={{
              transform: `translateX(${-(offset - 200)}px)`,
              willChange: 'transform',
            }}
          >
            {tripledRow2.map((url, index) => (
              <img
                key={`row2-${index}`}
                src={url}
                alt="3D Motion Preview"
                loading="lazy"
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl object-cover flex-shrink-0 bg-neutral-900 border border-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
