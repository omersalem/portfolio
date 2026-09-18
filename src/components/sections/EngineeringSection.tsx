import React, { useState } from 'react';
import { INFRASTRUCTURE_NODES } from '../../data/portfolioData';
import { EngineeringCoreCanvas } from '../3d/EngineeringCoreCanvas';
import { InfrastructureCard3D } from '../cards/InfrastructureCard3D';
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

          <p className="text-neutral-400 font-mono text-sm sm:text-base leading-relaxed mb-4">
            At the <strong>Ministry of National Economy (MNE) in Ramallah</strong>, Omer has served for 7 years as Computer Engineer with direct operational responsibility for perimeter firewalls, enterprise core networks, and Active Directory. Digital platforms built by Omer inherit the uncompromising reliability, high-availability clustering, and zero-trust security of national-scale systems.
          </p>

          {/* Core Hardware & Security Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['FortiGate NGFW', 'F5 BIG-IP (WAF/LTM)', 'Cisco FMC & FTD', 'Cisco Core Switches', 'Active Directory (AD DS/GPO)', 'Exchange Server', 'SCCM', 'Sophos Security', 'AI Autonomous Loops'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono text-neutral-300 bg-chrome-charcoal/90 border border-chrome-border/80 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
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
                  <InfrastructureCard3D
                    key={node.id}
                    node={node}
                    index={index}
                    isActive={isActive}
                    onActivate={() => setActiveNodeIndex(index)}
                    onDeactivate={() => setActiveNodeIndex(null)}
                  />
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
