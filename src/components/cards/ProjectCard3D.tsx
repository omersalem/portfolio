import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useState as useLocalState } from 'react';
import { PROJECT_CASE_STUDIES } from '../../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface ProjectCard3DProps {
  project: Project;
  index: number;
  isFifth?: boolean;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, index, isFifth = false }) => {
  const [showCaseStudy, setShowCaseStudy] = useLocalState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const disable3D = reducedMotion || reducedEffects;

  // Normalized mouse coordinates: -0.5 (left/top) to 0.5 (right/bottom)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel mouse coordinates for dynamic spotlight
  const mousePixelX = useMotionValue(200);
  const mousePixelY = useMotionValue(200);

  // Smooth spring physics for 3D rotation and depth
  const springConfig = { damping: 20, stiffness: 160, mass: 0.55 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt angles: up to 12 deg on X, 14 deg on Y for tactile physicality
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const cardScale = useSpring(isHovered || isFocused ? 1.035 : 1.0, springConfig);
  const cardZ = useSpring(isHovered || isFocused ? 36 : 0, springConfig);

  // Parallax translation for the inner screenshot image
  const imagePanX = useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]);
  const imagePanY = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);

  // Specular sheen shift across the glass viewport
  const sheenTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-120, 120]);

  // Dynamic cursor spotlight background
  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(460px circle at ${x}px ${y}px, rgba(255, 85, 0, 0.20), rgba(255, 255, 255, 0.08) 25%, transparent 68%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disable3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    mousePixelX.set(e.clientX - rect.left);
    mousePixelY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!disable3D) {
      mouseX.set(0);
      mouseY.set(-0.2); // subtle upward tilt on keyboard focus
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
    <div
      className={`flex flex-col ${
        isFifth ? 'md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-full lg:mx-0' : ''
      }`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={disable3D ? undefined : { opacity: 0, y: 35, rotateX: 8 }}
        whileInView={disable3D ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={
          disable3D
            ? {}
            : {
                rotateX,
                rotateY,
                scale: cardScale,
                z: cardZ,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative w-full h-full rounded-xl transition-shadow duration-300"
      >
        {/* Dynamic 3D Floor Shadow Layer */}
        {!disable3D && (
          <motion.div
            className="absolute -inset-2 rounded-2xl bg-black/90 filter blur-xl pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHovered || isFocused ? 0.95 : 0.4,
              transform: isHovered || isFocused ? 'translateY(22px) scale(0.96)' : 'translateY(8px) scale(0.92)',
              boxShadow: isHovered || isFocused ? '0 30px 60px -12px rgba(255, 85, 0, 0.28)' : 'none',
            }}
          />
        )}

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.ariaLabel}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="group relative block w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#191b22] via-[#121318] to-[#0c0d10] border border-chrome-border/80 hover:border-chrome-orange/70 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none transition-colors duration-300 shadow-[0_1px_0_0_rgba(255,255,255,0.09)_inset]"
          style={disable3D ? {} : { transformStyle: 'preserve-3d' }}
        >
          {/* Interactive Dynamic Chrome Cursor Spotlight */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: spotlightBg,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Subtle top rim highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-20" />

          {/* 1. Browser Slab Header (Pops out in 3D: translateZ: 28px) */}
          <div
            className="h-10 px-4 bg-[#14151a]/95 border-b border-chrome-border/70 flex items-center justify-between relative z-10 backdrop-blur-md"
            style={disable3D ? {} : { transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}
          >
            {/* Mac-style Window Controls with 3D depth and hover glow */}
            <div
              className="flex items-center space-x-1.5"
              style={disable3D ? {} : { transform: 'translateZ(12px)' }}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]' : 'bg-neutral-600'
                }`}
              />
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]' : 'bg-neutral-600'
                }`}
              />
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]' : 'bg-neutral-600'
                }`}
              />
            </div>

            {/* Display URL Pill */}
            <div
              className="px-3 py-0.5 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-200 group-hover:border-chrome-orange/40 transition-colors truncate max-w-[180px] sm:max-w-[220px]"
              style={disable3D ? {} : { transform: 'translateZ(10px)' }}
            >
              {project.displayUrl}
            </div>

            {/* External Link Icon */}
            <div style={disable3D ? {} : { transform: 'translateZ(12px)' }}>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-chrome-orange transition-colors shrink-0" />
            </div>
          </div>

          {/* 2. Screenshot Media Area with 3D Depth Aperture (translateZ: 36px) */}
          <div
            className="relative w-full aspect-[16/10] bg-neutral-950 overflow-hidden border-b border-chrome-border/60"
            style={disable3D ? {} : { transform: 'translateZ(36px)', transformStyle: 'preserve-3d' }}
          >
            <motion.img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top select-none"
              style={
                disable3D
                  ? {}
                  : {
                      x: imagePanX,
                      y: imagePanY,
                      scale: isHovered ? 1.09 : 1.02,
                      transition: 'scale 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }
              }
              width={640}
              height={400}
            />

            {/* Ambient Vignette & Shadow Frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Holographic Specular Glare Reflection on Glass */}
            {!disable3D && (
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.15) 48%, rgba(255,85,0,0.22) 52%, transparent 65%)',
                  x: sheenTranslateX,
                }}
              />
            )}
          </div>

          {/* 3. Card Content & Metadata (translateZ: 30px) */}
          <div
            className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-[#111216]/95"
            style={disable3D ? {} : { transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          >
            <div>
              {/* Title & Counter Row */}
              <div
                className="flex items-baseline justify-between mb-2"
                style={disable3D ? {} : { transform: 'translateZ(16px)' }}
              >
                <h3 className="text-lg sm:text-xl font-mono font-bold text-white group-hover:text-chrome-orange transition-colors">
                  {project.name}
                </h3>
                <span className="text-[11px] font-mono text-chrome-orange font-bold px-2 py-0.5 rounded bg-chrome-orange/15 border border-chrome-orange/30 shadow-[0_0_10px_rgba(255,85,0,0.15)]">
                  0{index + 1}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed mb-4"
                style={disable3D ? {} : { transform: 'translateZ(10px)' }}
              >
                {project.description}
              </p>
            </div>

            <div>
              {/* Tags */}
              <div
                className="flex flex-wrap gap-2 pt-3 border-t border-chrome-border/50"
                style={disable3D ? {} : { transform: 'translateZ(12px)' }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#1b1d23] text-neutral-300 rounded border border-chrome-border/70 group-hover:border-chrome-orange/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Explicit Destination Link Cue */}
              <div
                className="mt-4 flex items-center justify-between text-xs font-mono text-chrome-orange pt-2"
                style={disable3D ? {} : { transform: 'translateZ(18px)' }}
              >
                <span onClick={(e)=>{e.preventDefault();setShowCaseStudy(true)}} className="font-semibold underline underline-offset-4 group-hover:tracking-wider transition-all cursor-pointer">
                  VIEW CASE STUDY
                </span>
                <span className="text-chrome-orange text-sm font-bold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
      {showCaseStudy && PROJECT_CASE_STUDIES.find((item)=>item.projectId===project.id) && (
        <CaseStudyModal study={PROJECT_CASE_STUDIES.find((item)=>item.projectId===project.id)! as any} onClose={()=>setShowCaseStudy(false)} />
      )}
    </>
  );
};




