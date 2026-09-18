import React from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectCard3D } from '../cards/ProjectCard3D';

export const SelectedWorkSection: React.FC = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-20 lg:py-32 bg-chrome-black border-b border-chrome-border/40 overflow-hidden"
    >
      {/* 3D Architectural Perspective Stage Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0f13] to-transparent pointer-events-none" />

      {/* 3D Perspective Floor Grid */}
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[160%] h-[400px] pointer-events-none opacity-20"
        style={{
          perspective: 600,
          transform: 'rotateX(65deg)',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 20%, transparent 80%)',
        }}
      />

      {/* Orange Horizon Streak */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-chrome-orange/40 to-transparent pointer-events-none" />

      <div className="layout-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-chrome-orange uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-chrome-orange rounded-full" />
            <span>SELECTED CLIENT WORK</span>
          </div>

          <h2
            id="work-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4"
          >
            SOLD. LAUNCHED. WORKING.
          </h2>

          <p className="text-neutral-400 font-mono text-sm sm:text-base leading-relaxed">
            Real production client platforms delivered for commerce, municipalities, and businesses. High-performance frontends backed by robust engineering.
          </p>
        </div>

        {/* 
          Project Cards Grid/Stack with 3D Physics:
          - Mobile (< 768px): 1-column vertical stack (no carousel)
          - Tablet (768px - 1023px): 2-column grid, 16:10 media aspect ratio, 5th card centered at 1-column width
          - Desktop (>= 1024px): 3D layered browser slab presentation with perspective spring tilt, Z-depth layers, and dynamic spotlight
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => {
            const isFifth = index === 4;
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
