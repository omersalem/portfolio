import React from 'react';
import { CAPABILITY_GROUPS } from '../../data/portfolioData';
import { Layers, CheckCircle2 } from 'lucide-react';
import { CVBridgeCanvas } from '../3d/CVBridgeCanvas';

export const VisualCVSection: React.FC = () => {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="relative py-20 lg:py-32 bg-cv-offwhite text-cv-dark transition-colors duration-500 overflow-hidden"
    >
      {/* Editorial Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="layout-container relative z-10">
        {/* Section Top Eyebrow */}
        <div className="flex items-center space-x-3 mb-10 pb-4 border-b border-cv-border">
          <Layers className="w-4 h-4 text-chrome-orange" />
          <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase font-bold">
            CAPABILITY CV — CHAPTER BREAK
          </span>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (4 columns on desktop): Intro + Positioning + Decorative Chrome Sculpture */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h2
                id="profile-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-cv-dark leading-[1.1] mb-6"
              >
                ONE MIND. <br />
                TWO WORLDS.
              </h2>

              <div className="w-12 h-1 bg-chrome-orange mb-6" />

              <p className="text-base sm:text-lg font-sans text-neutral-700 leading-relaxed mb-6 font-normal">
                Most web developers only understand code inside the browser. Most systems engineers rarely craft polished consumer storefronts.
              </p>

              <p className="text-sm font-sans text-neutral-600 leading-relaxed mb-8">
                As a <strong>Computer Engineer</strong>, Omer bridges both worlds: delivering elegant, conversion-focused user experiences built upon uncompromising hardware, network routing, and server reliability.
              </p>
            </div>

            {/* Decorative Chrome Bridge Sculpture */}
            <div className="mt-4 pt-6 border-t border-cv-border/80" aria-hidden="true">
              <CVBridgeCanvas />
              <p className="text-[11px] font-mono text-neutral-500 mt-2 text-center uppercase tracking-wider">
                Digital Products ── Enterprise Infrastructure
              </p>
            </div>
          </div>

          {/* Right Column (8 columns on desktop): 4 Capability Groups in 2x2 Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CAPABILITY_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-lg border border-cv-border hover:border-neutral-800 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-cv-border/60">
                      <span className="text-xs font-mono font-bold text-chrome-orange">
                        {group.number}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                        CORE CAPABILITY
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-mono font-bold text-cv-dark mb-3 leading-snug">
                      {group.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed mb-5">
                      {group.description}
                    </p>
                  </div>

                  <div>
                    <ul className="space-y-2 pt-3 border-t border-cv-border/40">
                      {group.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs font-sans text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-chrome-orange shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Factual Integrity Badge */}
            <div className="mt-8 p-4 bg-stone-200/60 rounded border border-stone-300 flex items-center justify-between text-xs font-mono text-neutral-600">
              <span>Capability-based engineering profile</span>
              <span className="text-neutral-500">Documented by production code</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
