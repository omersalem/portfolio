import React from 'react';
import { CAPABILITY_GROUPS, CAREER_TIMELINE, CORE_METRICS, TECH_SKILL_CATEGORIES } from '../../data/portfolioData';
import { CheckCircle2, Briefcase, Globe2, Bot, Shield, Terminal, Award, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { CVBridgeCanvas } from '../3d/CVBridgeCanvas';
import { MetricCard3D } from '../cards/MetricCard3D';
import { DisciplineCard3D } from '../cards/DisciplineCard3D';

export const VisualCVSection: React.FC = () => {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="relative py-24 lg:py-36 bg-[#060816] text-white transition-colors duration-500 overflow-hidden border-b border-cyber-purple/20"
    >
      {/* Background Chromatic Aurora Glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyber-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="layout-container relative z-10">
        {/* Section Top Eyebrow */}
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan" />
            </span>
            <span className="text-xs font-mono tracking-widest text-cyber-cyan uppercase font-bold">
              CAPABILITY CV &amp; CAREER TIMELINE — CHAPTER BREAK
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-neutral-400">
            <Globe2 className="w-3.5 h-3.5 text-chrome-orange" />
            <span>RAMALLAH, PALESTINE // KUWAIT // GLOBAL WEB</span>
          </div>
        </div>

        {/* 1. Core Career Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16 sm:mb-20">
          {CORE_METRICS.map((metric, i) => (
            <MetricCard3D key={i} metric={metric} index={i} />
          ))}
        </div>

        {/* 2. Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (4 columns on desktop): Intro + Languages + 3D Sculpture */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 text-[11px] font-mono tracking-widest text-purple-300 uppercase mb-4">
                <Sparkles className="w-3 h-3 text-cyber-purple" />
                <span>CROSS-DOMAIN INTEGRITY</span>
              </div>

              <h2
                id="profile-heading"
                className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-[1.08] mb-6"
              >
                ONE MIND. <br />
                <span className="text-gradient-aurora">TWO WORLDS.</span>
              </h2>

              <div className="w-16 h-1 bg-gradient-to-r from-chrome-orange via-cyber-pink to-cyber-purple mb-6 rounded-full" />

              <a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 mb-6 px-5 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan/15 via-cyber-purple/15 to-cyber-pink/15 border border-cyber-cyan/40 text-white font-mono text-xs uppercase tracking-wider hover:border-cyber-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 group"
              >
                <FileText className="w-4 h-4 text-cyber-cyan group-hover:scale-110 transition-transform" />
                <span>View Full Professional CV</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>

              <p className="text-base font-sans text-neutral-200 leading-relaxed mb-4">
                Most web developers only understand code inside the browser. Most systems engineers rarely craft polished consumer storefronts.
              </p>

              <p className="text-sm font-sans text-neutral-300 leading-relaxed mb-6">
                As a <strong className="text-white font-semibold">Computer Engineer</strong> with 7 years at the <strong className="text-white font-semibold">Ministry of National Economy in Ramallah</strong> and 1 year in Kuwait, Omer bridges both worlds: operating mission-critical firewalls, Cisco core networks, and Active Directory domains while designing high-converting client web platforms and autonomous AI agent systems.
              </p>

              {/* Language Proficiency Badge */}
              <div className="p-5 bg-[#0b0e24]/90 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] mb-6">
                <div className="flex items-center space-x-2 mb-3 pb-2.5 border-b border-white/10">
                  <Globe2 className="w-4 h-4 text-cyber-cyan" />
                  <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                    Bilingual Fluency
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-neutral-200">
                    <span className="font-bold text-emerald-400 block mb-0.5">Arabic:</span> Native Language
                  </div>
                  <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30 text-neutral-200">
                    <span className="font-bold text-cyan-400 block mb-0.5">English:</span> Professional Fluent
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Chrome Bridge Sculpture */}
            <div className="pt-6 border-t border-white/10" aria-hidden="true">
              <CVBridgeCanvas />
              <p className="text-[11px] font-mono text-cyber-cyan/90 mt-3 text-center uppercase tracking-wider font-semibold">
                Digital Products ── Enterprise Infrastructure
              </p>
            </div>
          </div>

          {/* Right Column (8 columns on desktop): Capabilities + Career Timeline + AI Deep Dive */}
          <div className="lg:col-span-8 space-y-14">
            {/* 4 Capability Groups in 2x2 Grid */}
            <div>
              <div className="flex items-center space-x-2 mb-5 pb-2.5 border-b border-white/10">
                <Award className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
                  CORE ENGINEERING DISCIPLINES
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {CAPABILITY_GROUPS.map((group, idx) => (
                  <DisciplineCard3D key={group.id} group={group} index={idx} />
                ))}
              </div>
            </div>

            {/* 3. Professional Career Timeline */}
            <div>
              <div className="flex items-center space-x-2 mb-5 pb-2.5 border-b border-white/10">
                <Briefcase className="w-4 h-4 text-chrome-orange" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
                  CAREER TIMELINE &amp; LEADERSHIP
                </h3>
              </div>

              <div className="space-y-6">
                {CAREER_TIMELINE.map((item, itemIdx) => {
                  const isMNE = itemIdx === 0;
                  const borderGlow = isMNE ? 'border-amber-500/30 hover:border-amber-500/60 shadow-[0_0_25px_rgba(255,85,0,0.1)]' : 'border-cyan-500/30 hover:border-cyan-500/60 shadow-[0_0_25px_rgba(0,240,255,0.1)]';
                  const stripeColor = isMNE ? 'bg-gradient-to-b from-amber-400 to-orange-500' : 'bg-gradient-to-b from-cyan-400 to-blue-500';
                  const badgeColor = isMNE ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold shadow-[0_0_12px_rgba(255,85,0,0.4)]' : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]';
                  const orgColor = isMNE ? 'text-amber-400' : 'text-cyan-400';
                  const checkColor = isMNE ? 'text-amber-400' : 'text-cyan-400';

                  return (
                    <div
                      key={item.id}
                      className={`bg-[#0b0e26]/90 p-6 sm:p-7 rounded-xl border ${borderGlow} transition-all duration-300 relative overflow-hidden`}
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full ${stripeColor}`} />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3.5 border-b border-white/10">
                        <div>
                          <h4 className="text-lg sm:text-xl font-mono font-bold text-white leading-tight">
                            {item.role}
                          </h4>
                          <div className="text-xs font-mono text-neutral-400 mt-1">
                            <strong className={`${orgColor} font-semibold`}>{item.organization}</strong> • {item.location}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 self-start sm:self-auto">
                          <span className={`px-3 py-1 text-xs font-mono rounded-full ${badgeColor}`}>
                            {item.duration}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            {item.period}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-5">
                        {item.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed">
                            <CheckCircle2 className={`w-4 h-4 ${checkColor} shrink-0 mt-0.5`} />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-3.5 border-t border-white/10">
                        {item.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-[11px] font-mono text-neutral-200 bg-white/5 border border-white/10 rounded-md font-medium hover:border-white/30 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Complete Technology Matrix by Domain */}
            <div className="bg-[#090c20]/90 p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center space-x-2 mb-5 pb-3 border-b border-white/10">
                <Shield className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
                  ENTERPRISE &amp; MODERN TECHNOLOGY MATRIX
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TECH_SKILL_CATEGORIES.map((cat, idx) => {
                  const colors = [
                    'text-amber-400 border-amber-500/20 bg-amber-500/5',
                    'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
                    'text-purple-400 border-purple-500/20 bg-purple-500/5',
                    'text-pink-400 border-pink-500/20 bg-pink-500/5',
                    'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
                    'text-blue-400 border-blue-500/20 bg-blue-500/5',
                  ];
                  const domainColor = colors[idx % colors.length];

                  return (
                    <div key={idx} className={`p-4 rounded-xl border ${domainColor} hover:border-white/30 transition-all duration-300`}>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider block mb-2.5">
                        {cat.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-200 rounded font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. AI & Autonomous Agent Systems Engineering Showcase */}
            <div className="bg-gradient-to-br from-[#161233]/90 via-[#0d1028]/90 to-[#070919]/90 text-white p-6 sm:p-8 rounded-2xl border border-cyber-purple/40 shadow-[0_0_35px_rgba(139,92,246,0.18)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-cyber-purple uppercase mb-3">
                <Bot className="w-4 h-4 text-cyber-purple animate-pulse" />
                <span>SPECIALIZED ADVANCED DOMAIN</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white mb-3">
                AI SYSTEMS, AGENT SKILLS &amp; <span className="text-gradient-aurora">AUTONOMOUS LOOPS</span>
              </h4>

              <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed mb-6 max-w-2xl">
                Beyond traditional web development, Omer engineers production AI systems: specializing in agent skills architecture, autonomous multi-step execution loops, context window budget optimization, and enterprise telemetry integration (exemplified by the MNE Brain v2 infrastructure twin).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-cyber-purple/30 hover:border-cyber-purple/60 transition-colors">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyber-purple mb-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Agent Skills &amp; Looping</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Custom specialized skills, declarative tool schemas, deterministic execution loops, and autonomous self-correction chains.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-cyber-cyan/30 hover:border-cyber-cyan/60 transition-colors">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyber-cyan mb-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Context &amp; Multi-Agent Fleets</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Context window management, token budget optimization, memory persistence, reactive wakeups, and collaborative multi-agent swarms.
                  </p>
                </div>
              </div>
            </div>

            {/* Factual Integrity Badge */}
            <div className="p-4 bg-[#0a0d26]/80 rounded-xl border border-cyber-cyan/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-neutral-300 gap-2 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
              <span className="font-semibold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Documented Enterprise &amp; Production Track Record</span>
              </span>
              <span className="text-neutral-400 text-[11px]">
                Ministry of National Economy, Ramallah (7 yrs) • Kuwait (1 yr) • Live Client Deployments
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


