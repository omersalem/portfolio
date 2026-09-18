import React from 'react';
import { CAPABILITY_GROUPS, CAREER_TIMELINE, CORE_METRICS, TECH_SKILL_CATEGORIES } from '../../data/portfolioData';
import { Layers, CheckCircle2, Briefcase, Globe2, Bot, Shield, Terminal, Award } from 'lucide-react';
import { CVBridgeCanvas } from '../3d/CVBridgeCanvas';
import { MetricCard3D } from '../cards/MetricCard3D';
import { DisciplineCard3D } from '../cards/DisciplineCard3D';

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
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-cv-border">
          <div className="flex items-center space-x-3">
            <Layers className="w-4 h-4 text-chrome-orange" />
            <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase font-bold">
              CAPABILITY CV & CAREER TIMELINE — CHAPTER BREAK
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-neutral-500">
            <Globe2 className="w-3.5 h-3.5 text-chrome-orange" />
            <span>RAMALLAH, PALESTINE // KUWAIT // GLOBAL WEB</span>
          </div>
        </div>

        {/* 1. Core Career Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CORE_METRICS.map((metric, i) => (
            <MetricCard3D key={i} metric={metric} index={i} />
          ))}
        </div>

        {/* 2. Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (4 columns on desktop): Intro + Languages + 3D Sculpture */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
            <div>
              <h2
                id="profile-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-cv-dark leading-[1.1] mb-6"
              >
                ONE MIND. <br />
                TWO WORLDS.
              </h2>

              <div className="w-12 h-1 bg-chrome-orange mb-6" />

              <p className="text-base font-sans text-neutral-800 leading-relaxed mb-4 font-medium">
                Most web developers only understand code inside the browser. Most systems engineers rarely craft polished consumer storefronts.
              </p>

              <p className="text-sm font-sans text-neutral-700 leading-relaxed mb-6">
                As a <strong>Computer Engineer</strong> with 7 years at the <strong>Ministry of National Economy in Ramallah</strong> and 1 year in Kuwait, Omer bridges both worlds: operating mission-critical firewalls, Cisco core networks, and Active Directory domains while designing high-converting client web platforms and autonomous AI agent systems.
              </p>

              {/* Language Proficiency Badge */}
              <div className="p-4 bg-white/90 rounded-lg border border-cv-border mb-6">
                <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-cv-border/50">
                  <Globe2 className="w-4 h-4 text-chrome-orange" />
                  <span className="text-xs font-mono font-bold uppercase text-cv-dark">
                    Bilingual Fluency
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-stone-100 rounded border border-stone-200 text-neutral-800">
                    <span className="font-bold text-chrome-orange">Arabic:</span> Native
                  </div>
                  <div className="p-2 bg-stone-100 rounded border border-stone-200 text-neutral-800">
                    <span className="font-bold text-chrome-orange">English:</span> Professional
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Chrome Bridge Sculpture */}
            <div className="pt-6 border-t border-cv-border/80" aria-hidden="true">
              <CVBridgeCanvas />
              <p className="text-[11px] font-mono text-neutral-600 mt-2 text-center uppercase tracking-wider font-semibold">
                Digital Products ── Enterprise Infrastructure
              </p>
            </div>
          </div>

          {/* Right Column (8 columns on desktop): Capabilities + Career Timeline + AI Deep Dive */}
          <div className="lg:col-span-8 space-y-12">
            {/* 4 Capability Groups in 2x2 Grid */}
            <div>
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-cv-border/70">
                <Award className="w-4 h-4 text-chrome-orange" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-700 uppercase">
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
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-cv-border/70">
                <Briefcase className="w-4 h-4 text-chrome-orange" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-700 uppercase">
                  CAREER TIMELINE & LEADERSHIP
                </h3>
              </div>

              <div className="space-y-6">
                {CAREER_TIMELINE.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/95 p-6 sm:p-7 rounded-lg border border-cv-border shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-chrome-orange" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-cv-border/60">
                      <div>
                        <h4 className="text-lg font-mono font-bold text-cv-dark leading-tight">
                          {item.role}
                        </h4>
                        <div className="text-xs font-mono text-neutral-600 mt-0.5">
                          <strong className="text-neutral-900">{item.organization}</strong> • {item.location}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <span className="px-2.5 py-1 text-xs font-mono font-bold text-white bg-cv-dark rounded">
                          {item.duration}
                        </span>
                        <span className="text-xs font-mono text-neutral-500">
                          {item.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {item.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs font-sans text-neutral-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-chrome-orange shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cv-border/50">
                      {item.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-mono text-neutral-700 bg-stone-100 border border-stone-200 rounded font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Complete Technology Matrix by Domain */}
            <div className="bg-white/95 p-6 sm:p-7 rounded-lg border border-cv-border shadow-xs">
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-cv-border/70">
                <Shield className="w-4 h-4 text-chrome-orange" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-700 uppercase">
                  ENTERPRISE & MODERN TECHNOLOGY MATRIX
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TECH_SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="p-3.5 bg-stone-50 rounded border border-stone-200/80">
                    <span className="text-[11px] font-mono font-bold text-cv-dark uppercase tracking-wider block mb-2">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 text-[10px] font-mono bg-white border border-stone-300 text-neutral-800 rounded font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. AI & Autonomous Agent Systems Engineering Showcase */}
            <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-lg border border-neutral-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-chrome-orange/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-chrome-orange uppercase mb-3">
                <Bot className="w-4 h-4 text-chrome-orange" />
                <span>SPECIALIZED ADVANCED DOMAIN</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
                AI SYSTEMS, AGENT SKILLS & AUTONOMOUS LOOPS
              </h4>

              <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed mb-6 max-w-2xl">
                Beyond traditional web development, Omer engineers production AI systems: specializing in agent skills architecture, autonomous multi-step execution loops, context window budget optimization, and enterprise telemetry integration (exemplified by the MNE Brain v2 infrastructure twin).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-800/80 rounded border border-neutral-700">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-chrome-orange mb-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Agent Skills & Looping</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Custom specialized skills, declarative tool schemas, deterministic execution loops, and autonomous self-correction chains.
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/80 rounded border border-neutral-700">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-chrome-orange mb-1">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Context & Multi-Agent Fleets</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Context window management, token budget optimization, memory persistence, reactive wakeups, and collaborative multi-agent swarms.
                  </p>
                </div>
              </div>
            </div>

            {/* Factual Integrity Badge */}
            <div className="p-4 bg-stone-200/60 rounded border border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-neutral-600 gap-2">
              <span className="font-semibold">Documented Enterprise & Production Track Record</span>
              <span className="text-neutral-500">Ministry of National Economy, Ramallah (7 yrs) • Kuwait (1 yr) • Live Client Deployments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
