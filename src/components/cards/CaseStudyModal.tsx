import React, { useEffect } from 'react';
import { ProjectCaseStudy } from '../../types';
import { X, CheckCircle2, Cpu, Layers, Award, Terminal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getPortfolioData } from '../../data/portfolioData';

interface CaseStudyModalProps {
  study: ProjectCaseStudy;
  projectName?: string;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, projectName = 'Project', onClose }) => {
  const { language } = useLanguage();
  const { ui } = getPortfolioData(language);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 overflow-y-auto flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} case study`}
    >
      <div className="relative w-full max-w-5xl my-auto bg-gradient-to-b from-[#11142e] via-[#0b0e24] to-[#070818] border border-cyber-cyan/30 rounded-2xl p-6 sm:p-10 text-white shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden text-start">
        {/* Top Rainbow Horizon Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple via-cyber-pink to-chrome-orange" />
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyber-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyber-cyan/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex justify-between items-start gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-[11px] font-mono tracking-widest text-cyber-cyan uppercase mb-2">
              <Terminal className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
              <span>{ui.caseStudy.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mt-1">
              {projectName}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="touch-target group flex items-center gap-1.5 px-4 py-2 border border-white/20 bg-white/5 rounded-xl font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none cursor-pointer"
            aria-label={ui.caseStudy.close}
          >
            <span>{ui.caseStudy.close}</span>
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200 shrink-0" />
          </button>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="relative z-10 grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-xl border border-orange-500/30 bg-[#161224]/80 shadow-[0_0_20px_rgba(255,85,0,0.08)]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-chrome-orange uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-chrome-orange shrink-0" />
              <span>{ui.caseStudy.challenge}</span>
            </div>
            <p className="text-sm font-sans text-neutral-300 leading-relaxed">{study.challenge}</p>
          </div>

          <div className="p-6 rounded-xl border border-emerald-500/30 bg-[#0c1c24]/80 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{ui.caseStudy.solution}</span>
            </div>
            <p className="text-sm font-sans text-neutral-300 leading-relaxed">{study.solution}</p>
          </div>
        </div>

        {/* Triple Specifications Grid */}
        <div className="relative z-10 grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4 text-cyber-cyan shrink-0" />
              <span>{ui.caseStudy.architecture}</span>
            </div>
            <div className="space-y-2">
              {study.architecture.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs font-sans text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4 text-cyber-purple shrink-0" />
              <span>{ui.caseStudy.coreStack}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {study.technologies.map((item) => (
                <span key={item} className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/10 border border-white/10 text-neutral-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{ui.caseStudy.impact}</span>
            </div>
            <div className="space-y-2">
              {study.results.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs font-sans text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screenshots Preview */}
        {study.screenshots && study.screenshots.length > 0 && (
          <div className="relative z-10 pt-4 border-t border-white/10">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
              {ui.caseStudy.verification}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {study.screenshots.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${projectName} screenshot`}
                  loading="lazy"
                  className="rounded-xl border border-white/15 shadow-lg w-full object-cover hover:border-cyber-cyan/50 transition-colors"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
