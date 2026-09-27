import React, { useState } from 'react';
import { INFRASTRUCTURE_NODES } from '../../data/portfolioData';
import { EngineeringCoreCanvas } from '../3d/EngineeringCoreCanvas';
import { InfrastructureCard3D } from '../cards/InfrastructureCard3D';
import { Cpu, ShieldCheck, Terminal, Radio } from 'lucide-react';

export const EngineeringSection: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  const stackPills = [
    { name: 'FortiGate NGFW', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { name: 'F5 BIG-IP (WAF/LTM)', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { name: 'Cisco FMC & FTD', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { name: 'Cisco Core Switches', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { name: 'Active Directory (AD DS/GPO)', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { name: 'Exchange Server & SCCM', color: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
    { name: 'Sophos Endpoint Security', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
    { name: 'MNE Autonomous AI Loops', color: 'text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10 font-bold' },
  ];

  const telemetryChannels = [
    {
      label: 'NGFW & PERIMETER',
      protocol: 'FORTIGATE 100F + CISCO FTD',
      status: 'SHIELD ACTIVE',
      metric: '0.4ms inspection',
      dotColor: 'bg-emerald-400',
      pingColor: 'bg-emerald-400/40',
      accentBorder: 'hover:border-emerald-500/50',
      textColor: 'text-emerald-400',
      bgGlow: 'from-emerald-950/20 to-transparent',
    },
    {
      label: 'ENTERPRISE CORE FABRIC',
      protocol: 'CISCO CATALYST HA L3',
      status: 'LINE SPEED 10G',
      metric: '99.999% uptime',
      dotColor: 'bg-cyan-400',
      pingColor: 'bg-cyan-400/40',
      accentBorder: 'hover:border-cyan-500/50',
      textColor: 'text-cyan-400',
      bgGlow: 'from-cyan-950/20 to-transparent',
    },
    {
      label: 'AI-NATIVE NEURAL CORE',
      protocol: 'MNE BRAIN V2 / AGENT LOOPS',
      status: 'AUTONOMOUS ACTIVE',
      metric: '9 micro-agents live',
      dotColor: 'bg-purple-400',
      pingColor: 'bg-purple-400/40',
      accentBorder: 'hover:border-purple-500/50',
      textColor: 'text-purple-400',
      bgGlow: 'from-purple-950/20 to-transparent',
    },
    {
      label: 'IDENTITY & ZERO-TRUST',
      protocol: 'AD DS • KERBEROS • RADIUS',
      status: 'REPLICATED 24/7',
      metric: '2,400+ directory objs',
      dotColor: 'bg-amber-400',
      pingColor: 'bg-amber-400/40',
      accentBorder: 'hover:border-amber-500/50',
      textColor: 'text-amber-400',
      bgGlow: 'from-amber-950/20 to-transparent',
    },
  ];

  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="relative py-24 lg:py-36 bg-[#070814] border-b border-cyber-cyan/15 overflow-hidden"
    >
      {/* Background Chromatic Aurora Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyber-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      <div className="layout-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-chrome-orange/10 border border-chrome-orange/30 text-xs font-mono tracking-widest text-chrome-orange uppercase mb-4 shadow-[0_0_15px_rgba(255,85,0,0.2)]">
            <Radio className="w-3.5 h-3.5 text-chrome-orange animate-pulse" />
            <span>INFRASTRUCTURE &amp; COMPUTING DEPTH</span>
          </div>

          <h2
            id="engineering-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-5"
          >
            BEYOND THE <span className="text-gradient-aurora">BROWSER.</span>
          </h2>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-cyber-purple/10 border border-cyber-purple/40 rounded-md text-xs sm:text-sm font-mono tracking-wider text-purple-200 uppercase mb-5 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Cpu className="w-4 h-4 text-cyber-purple shrink-0" />
            <span>MNE BRAIN V2 — AI-NATIVE INFRASTRUCTURE BRAIN</span>
          </div>

          <p className="text-neutral-300 font-sans text-base sm:text-lg leading-relaxed mb-6">
            At the <strong className="text-white font-semibold">Ministry of National Economy (MNE) in Ramallah</strong>, Omer has served for 7 years as Computer Engineer with direct operational responsibility for perimeter firewalls, enterprise core networks, and Active Directory. Digital platforms built by Omer inherit the uncompromising reliability, high-availability clustering, and zero-trust security of national-scale systems.
          </p>

          {/* Core Hardware & Security Stack Pills */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {stackPills.map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all duration-200 ${tech.color}`}
              >
                {tech.name}
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
            <div className="mt-6 flex items-center space-x-3 px-4 py-3 bg-[#0d1024]/80 rounded-xl border border-cyber-cyan/20 text-xs font-mono text-neutral-300 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">Enterprise security guarantee:</strong> High-level architectural capability demonstrated without exposing private topology or sensitive national assets.
              </span>
            </div>
          </div>
        </div>

        {/* Live infrastructure style telemetry panel */}
        <div className="mt-16">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span>REAL-TIME SYSTEM DIAGNOSTIC RUNTIME STATUS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {telemetryChannels.map((channel) => (
              <div
                key={channel.label}
                className={`relative group rounded-xl border border-white/10 bg-gradient-to-b ${channel.bgGlow} bg-[#0b0e22]/80 backdrop-blur-md p-5 font-mono transition-all duration-300 ${channel.accentBorder} hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                    {channel.label}
                  </span>
                  <div className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${channel.pingColor}`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${channel.dotColor}`} />
                  </div>
                </div>

                <div className="text-xs text-neutral-400 truncate mb-3">
                  {channel.protocol}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className={`text-sm font-bold tracking-tight ${channel.textColor}`}>
                    {channel.status}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-sans">
                    {channel.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

