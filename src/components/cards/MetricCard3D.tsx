import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CoreMetric } from '../../types';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface MetricCard3DProps {
  metric: CoreMetric;
  index: number;
}

export const MetricCard3D: React.FC<MetricCard3DProps> = ({ metric, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const disable3D = reducedMotion || reducedEffects;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePixelX = useMotionValue(100);
  const mousePixelY = useMotionValue(100);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const cardScale = useSpring(isHovered || isFocused ? 1.03 : 1.0, springConfig);
  const cardZ = useSpring(isHovered || isFocused ? 24 : 0, springConfig);

  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(280px circle at ${x}px ${y}px, rgba(255, 85, 0, 0.14), rgba(255, 255, 255, 0.8) 35%, transparent 75%)`
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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!disable3D) {
      mouseX.set(0);
      mouseY.set(-0.2);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isHighlighted = isHovered || isFocused;

  return (
    <div className="flex flex-col h-full" style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={disable3D ? undefined : { opacity: 0, y: 20, rotateX: 6 }}
        whileInView={disable3D ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
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
        {/* Dynamic Floor Shadow */}
        {!disable3D && (
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-neutral-900/15 filter blur-md pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHighlighted ? 0.9 : 0.25,
              transform: isHighlighted ? 'translateY(14px) scale(0.96)' : 'translateY(4px) scale(0.94)',
              boxShadow: isHighlighted ? '0 16px 30px -8px rgba(255, 85, 0, 0.22)' : 'none',
            }}
          />
        )}

        {/* Card Slab Body */}
        <div
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="region"
          aria-label={`${metric.label}: ${metric.value}`}
          className={`relative h-full p-5 rounded-xl overflow-hidden border transition-all duration-300 cursor-default focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none flex flex-col justify-between ${
            isHighlighted
              ? 'border-chrome-orange/80 bg-gradient-to-b from-white via-[#faf9f6] to-[#f2eee6] shadow-lg'
              : 'border-cv-border bg-gradient-to-b from-white/95 via-[#fcfbf9]/90 to-[#f6f4ee]/90 hover:border-neutral-400'
          }`}
          style={disable3D ? {} : { transformStyle: 'preserve-3d' }}
        >
          {/* Spotlight overlay */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: spotlightBg,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Top highlight rail */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />

          {/* Corner CAD Accents */}
          <div className="absolute top-2 left-2 text-[8px] font-mono text-chrome-orange/40 pointer-events-none select-none">
            ┌
          </div>
          <div className="absolute top-2 right-2 text-[8px] font-mono text-chrome-orange/40 pointer-events-none select-none">
            ┐
          </div>

          <div>
            {/* Metric Value (translateZ: 26px) */}
            <div
              className="text-2xl sm:text-3xl font-display font-extrabold text-cv-dark mb-1.5 tracking-tight group-hover:text-neutral-900"
              style={disable3D ? {} : { transform: 'translateZ(26px)' }}
            >
              {metric.value}
            </div>

            {/* Metric Label (translateZ: 20px) */}
            <div
              className="text-xs font-mono font-bold text-chrome-orange uppercase tracking-wider mb-1.5 flex items-center space-x-1.5"
              style={disable3D ? {} : { transform: 'translateZ(20px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-chrome-orange shrink-0" />
              <span>{metric.label}</span>
            </div>
          </div>

          {/* Metric Subtext (translateZ: 14px) */}
          <div
            className="text-[11px] font-sans text-neutral-600 leading-snug pt-2 border-t border-cv-border/50"
            style={disable3D ? {} : { transform: 'translateZ(14px)' }}
          >
            {metric.subtext}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
