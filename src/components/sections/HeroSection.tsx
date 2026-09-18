import React from 'react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { ArrowDown } from 'lucide-react';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const HeroSection: React.FC = () => {
  const { reducedMotion } = useEffectSettings();

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      if (reducedMotion) {
        workSection.scrollIntoView({ behavior: 'auto' });
      } else {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center pt-24 pb-16 lg:py-24 overflow-hidden border-b border-chrome-border/40"
    >
      {/* Background Architectural Grid Lines & Stepped Monoliths */}
      <div className="absolute inset-0 monolithic-noise opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-chrome-orange/40 via-chrome-border/30 to-transparent pointer-events-none" />

      {/* Subtle architectural horizontal orange horizon line from reference */}
      <div className="absolute bottom-16 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-chrome-orange to-transparent opacity-80 pointer-events-none blur-[0.5px]" />

      <div className="layout-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Semantic Editorial Typography & Primary CTA (Columns 1-6 on desktop) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left order-1 lg:order-1 z-20">
            {/* 1. Massive Architectural Identity (OMER SALEM) */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-sans font-black tracking-tight text-white uppercase leading-[0.88] select-none">
                <span className="block">OMER</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
                  SALEM
                </span>
              </h1>
            </div>

            {/* 2. Professional Title in Spaced Electric-Orange Caps */}
            <div className="mb-4">
              <span className="text-sm sm:text-base font-mono font-bold tracking-[0.25em] text-chrome-orange uppercase">
                COMPUTER ENGINEER
              </span>
            </div>

            {/* 3. Refined Architectural Divider Rule */}
            <div className="w-16 h-[2px] bg-neutral-700 mb-5" />

            {/* 4. Main Business Headline */}
            <p className="text-sm sm:text-base font-mono font-medium tracking-[0.16em] text-neutral-300 uppercase mb-8 sm:mb-10 max-w-lg leading-relaxed">
              WEBSITES ENGINEERED TO SELL.
            </p>

            {/* 5. Primary Conversion Button: VIEW SELECTED WORK */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#work"
                onClick={handleScrollToWork}
                className="touch-target group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-chrome-orange hover:bg-chrome-orange-light text-black font-mono font-bold text-sm tracking-wider uppercase rounded shadow-orange-glow transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              <span className="text-xs font-mono text-neutral-500 pl-1">
                Design • Development • Infrastructure
              </span>
            </div>
          </div>

          {/* Right Column: Genuine 3D Elements + Real Portrait Layer (Columns 7-12 on desktop) */}
          <div className="lg:col-span-6 flex justify-center items-end order-2 lg:order-2 z-10">
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
