import React, { useState } from 'react';
import { INFRASTRUCTURE_NODES } from '../../data/portfolioData';
import { EngineeringCoreCanvas } from '../3d/EngineeringCoreCanvas';
import { Cpu, ShieldCheck } from 'lucide-react';

export const EngineeringSection: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="relative py-20 lg:py-32 bg-chrome-black border-b border-chrome-border/40 overflow-hidden"
    >
      {/* Background Grid & Architectural Aura */}
      <div className="absolute inset-0 monolithic-noise opacity-20 pointer-events-none" />

      <div className="layout-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-chrome-orange uppercase mb-3">
            <Cpu className="w-4 h-4 text-chrome-orange" />
            <span>INFRASTRUCTURE & COMPUTING DEPTH</span>
          </div>

          <h2
            id="engineering-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4"
          >
            BEYOND THE BROWSER.
          </h2>

          <div className="inline-block px-3 py-1.5 bg-chrome-charcoal border border-chrome-border rounded text-xs sm:text-sm font-mono tracking-widest text-neutral-300 uppercase mb-4">
            MNE BRAIN V2 — AI-NATIVE INFRASTRUCTURE BRAIN
          </div>

          <p className="text-neutral-400 font-mono text-sm sm:text-base leading-relaxed">
            High-converting digital products require more than surface design. Omer engineers platforms grounded in enterprise hardware, mission-critical networks, hardened security, and automated server infrastructure.
          </p>
        </div>

        {/* 
          Layout Composition:
          - Desktop (>= 1024px): Split layout with 3D Core Canvas and 6 Capability Callout Nodes
          - Tablet: Core centered with 2-column capability list below
          - Mobile: 3D Core above single-column numbered list
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 3D Core Visualization (Columns 1-5 on desktop) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <EngineeringCoreCanvas activeNodeIndex={activeNodeIndex} />
          </div>

          {/* Capability Callouts (Columns 6-12 on desktop: 2-column grid of nodes) */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {INFRASTRUCTURE_NODES.map((node, index) => {
                const isActive = activeNodeIndex === index;

                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setActiveNodeIndex(index)}
                    onMouseLeave={() => setActiveNodeIndex(null)}
                    onFocus={() => setActiveNodeIndex(index)}
                    onBlur={() => setActiveNodeIndex(null)}
                    tabIndex={0}
                    className={`chrome-panel p-5 rounded-lg transition-all duration-200 cursor-default focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none ${
                      isActive
                        ? 'border-chrome-orange bg-chrome-charcoal shadow-orange-glow -translate-y-1'
                        : 'hover:border-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-chrome-orange font-bold">
                        {node.number}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-chrome-orange/70" />
                    </div>

                    <h3 className="text-sm sm:text-base font-mono font-bold text-white mb-2 leading-snug">
                      {node.label}
                    </h3>

                    <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Architecture Assurance Note */}
            <div className="mt-6 flex items-center space-x-3 px-4 py-3 bg-chrome-charcoal/60 rounded border border-chrome-border/60 text-xs font-mono text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-chrome-orange shrink-0" />
              <span>
                Enterprise reliability: High-level architectural capability without exposing private topology or sensitive assets.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
