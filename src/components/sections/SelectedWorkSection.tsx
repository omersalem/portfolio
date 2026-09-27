import React, { useState, useEffect } from 'react';
import { getPortfolioData } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectCard3D } from '../cards/ProjectCard3D';
import { Sparkles } from 'lucide-react';

const CATEGORIES_EN = ['All', 'E-Commerce', 'Civic & Gov', 'Fast Ordering'] as const;
const CATEGORIES_AR = ['الكل', 'متاجر إلكترونية', 'خدمات بلدية وحكومية', 'طلب سريع'] as const;

export const SelectedWorkSection: React.FC = () => {
  const { language } = useLanguage();
  const { projects, ui } = getPortfolioData(language);
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  // When language switches, ensure index is safe
  useEffect(() => {
    setSelectedCategoryIndex(0);
  }, [language]);

  const categories = language === 'ar' ? CATEGORIES_AR : CATEGORIES_EN;
  const currentCategory = categories[selectedCategoryIndex];

  const filteredProjects = selectedCategoryIndex === 0
    ? projects
    : projects.filter((p) => p.category === currentCategory);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-24 lg:py-36 bg-[#070814] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Dynamic Ambient Aurora Backlight */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-cyber-purple/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-cyber-cyan/15 blur-[140px] pointer-events-none" />

      {/* 3D Perspective Floor Grid */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[160%] h-[450px] pointer-events-none opacity-25"
        style={{
          perspective: 600,
          transform: 'rotateX(68deg)',
          backgroundImage:
            'linear-gradient(to right, rgba(0,240,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 20%, transparent 80%)',
        }}
      />

      {/* Prismatic Horizon Streak */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/40 via-cyber-purple/40 to-transparent pointer-events-none" />

      <div className="layout-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-cyber-cyan uppercase mb-3 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
              <span>{ui.work.eyebrow}</span>
            </div>

            <h2
              id="work-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4"
            >
              {ui.work.titlePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-purple-300 to-chrome-orange">
                {ui.work.titleHighlight}
              </span>
            </h2>

            <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
              {ui.work.subtitle}
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {categories.map((cat, idx) => {
              const isActive = selectedCategoryIndex === idx;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryIndex(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  aria-pressed={isActive}
                >
                  {idx === 0 ? (language === 'ar' ? 'الكل (5)' : 'ALL (5)') : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => {
            const isFifth = index === 4 && filteredProjects.length === 5;
            return (
              <ProjectCard3D
                key={project.id}
                project={project}
                index={index}
                isFifth={isFifth}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
