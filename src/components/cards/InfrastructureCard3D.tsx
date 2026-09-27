import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Network, ShieldCheck, KeyRound, Mail, Layers, Bot, Activity } from 'lucide-react';
import { InfrastructureNode } from '../../types';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface InfrastructureCard3DProps {
  node: InfrastructureNode;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

// Icon mapping per infrastructure domain
const NODE_ICONS = [
  Network,     // 01 Cisco Core Switches & Routing
  ShieldCheck, // 02 Firewalls & Perimeter Security
  KeyRound,    // 03 Active Directory & Identity
  Mail,        // 04 Microsoft Exchange Server
  Layers,      // 05 SCCM Endpoint Management
  Bot,         // 06 AI Autonomous Agents
];

const DOMAIN_CODES = [
  'FABRIC_ROUTING',
  'PERIMETER_DEFENSE',
  'IDENTITY_GOV',
  'MESSAGING_CLUSTER',
  'ENDPOINT_OPS',
  'AGENTIC_SYSTEMS',
];

export const InfrastructureCard3D: React.FC<InfrastructureCard3DProps> = ({
  node,
  index,
  isActive,
  onActivate,
  onDeactivate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const IconComponent = NODE_ICONS[index % NODE_ICONS.length];
  const domainCode = node.domainCode || DOMAIN_CODES[index % DOMAIN_CODES.length];
  const accentColor = node.accentColor || '#00F0FF';
  const glowColor = node.glowColor || 'rgba(0, 240, 255, 0.35)';

  const disable3D = reducedMotion || reducedEffects;

  // Normalized mouse coordinates: -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel mouse coordinates for dynamic spotlight
  const mousePixelX = useMotionValue(150);
  const mousePixelY = useMotionValue(150);

  // Smooth spring physics for 3D rotation and depth
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt angles: up to 11 deg on X, 13 deg on Y for tactile physical sensation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [11, -11]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-13, 13]);
  const cardScale = useSpring(isHovered || isFocused || isActive ? 1.025 : 1.0, springConfig);
  const cardZ = useSpring(isHovered || isFocused || isActive ? 28 : 0, springConfig);

  // Specular sheen shift across the metallic surface
  const sheenTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-100, 100]);

  // Dynamic cursor spotlight background
  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x}px ${y}px, ${glowColor}, rgba(255, 255, 255, 0.06) 30%, transparent 70%)`
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
    onActivate();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    onDeactivate();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onActivate();
    if (!disable3D) {
      mouseX.set(0);
      mouseY.set(-0.2); // subtle upward tilt on keyboard focus
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    mouseX.set(0);
    mouseY.set(0);
    onDeactivate();
  };

  const isHighlighted = isHovered || isFocused || isActive;

  return (
    <div className="flex flex-col h-full" style={{ perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={disable3D ? undefined : { opacity: 0, y: 25, rotateX: 6 }}
        whileInView={disable3D ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
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
        className="relative w-full h-full rounded-2xl transition-shadow duration-300"
      >
        {/* 1. Dynamic 3D Floor Shadow & Glow Layer */}
        {!disable3D && (
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-black/90 filter blur-lg pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHighlighted ? 0.95 : 0.35,
              transform: isHighlighted ? 'translateY(18px) scale(0.95)' : 'translateY(6px) scale(0.92)',
              boxShadow: isHighlighted ? `0 25px 45px -8px ${glowColor}` : 'none',
            }}
          />
        )}

        {/* 2. Main Hardware Slab Body */}
        <div
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="region"
          aria-label={`${node.number} ${node.label}`}
          className={`group relative flex flex-col justify-between h-full p-5 sm:p-6 rounded-2xl overflow-hidden border transition-all duration-300 cursor-default focus-visible:ring-2 focus-visible:outline-none ${
            isHighlighted
              ? 'bg-gradient-to-b from-[#181c30] via-[#101322] to-[#080914]'
              : 'border-white/10 bg-gradient-to-b from-[#121526] via-[#0d0f1b] to-[#070814] hover:border-white/20'
          }`}
          style={
            disable3D
              ? { borderColor: isHighlighted ? accentColor : undefined }
              : {
                  transformStyle: 'preserve-3d',
                  borderColor: isHighlighted ? accentColor : undefined,
                  boxShadow: isHighlighted ? `0 0 25px ${glowColor}` : undefined,
                }
          }
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

          {/* Top Specular Rim Highlight Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

          {/* Holographic Specular Glare Reflection on Metallic Surface */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.08) 48%, rgba(0,240,255,0.18) 52%, transparent 65%)',
                x: sheenTranslateX,
              }}
            />
          )}

          {/* Precision CAD Corner Brackets */}
          <div
            className="absolute top-2 left-2 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? accentColor : 'rgba(255,255,255,0.2)' }}
          >
            ┌
          </div>
          <div
            className="absolute top-2 right-2 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? accentColor : 'rgba(255,255,255,0.2)' }}
          >
            ┐
          </div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-600 pointer-events-none select-none">
            └
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-600 pointer-events-none select-none">
            ┘
          </div>

          <div>
            {/* Header: Node Number + Domain Code + Status LED (translateZ: 24px) */}
            <div
              className="flex items-center justify-between mb-3.5"
              style={disable3D ? {} : { transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center space-x-2">
                <span
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-bold border transition-colors shadow-sm"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}55`,
                    backgroundColor: `${accentColor}15`,
                    boxShadow: `0 0 10px ${glowColor}`,
                  }}
                >
                  NODE_{node.number}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 tracking-wider hidden sm:inline-block">
                  // {domainCode}
                </span>
              </div>

              {/* Status LED & Core Sync Pulse */}
              <div className="flex items-center space-x-1.5">
                <span
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isHighlighted ? accentColor : '#10B981',
                    boxShadow: isHighlighted ? `0 0 10px ${accentColor}` : '0 0 4px rgba(16,185,129,0.5)',
                    transform: isHighlighted ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <span
                  className="text-[9px] font-mono uppercase font-bold transition-colors"
                  style={{ color: isHighlighted ? accentColor : '#94A3B8' }}
                >
                  {isHighlighted ? 'SYNCED' : 'ACTIVE'}
                </span>
              </div>
            </div>

            {/* Title & Hardware Domain Icon (translateZ: 30px) */}
            <div
              className="flex items-start space-x-3 mb-2.5"
              style={disable3D ? {} : { transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            >
              <div
                className="p-2 rounded-xl border transition-all duration-300 shrink-0 mt-0.5"
                style={{
                  backgroundColor: isHighlighted ? `${accentColor}25` : 'rgba(255,255,255,0.04)',
                  borderColor: isHighlighted ? accentColor : 'rgba(255,255,255,0.12)',
                  color: isHighlighted ? accentColor : '#FFFFFF',
                  boxShadow: isHighlighted ? `0 0 14px ${glowColor}` : 'none',
                }}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              <h3
                className="text-sm sm:text-base font-display font-bold text-white transition-colors leading-snug"
                style={{ color: isHighlighted ? accentColor : undefined }}
              >
                {node.label}
              </h3>
            </div>

            {/* Description Text (translateZ: 18px) */}
            <p
              className="text-xs font-sans text-neutral-300 leading-relaxed mb-4 pl-0.5"
              style={disable3D ? {} : { transform: 'translateZ(18px)' }}
            >
              {node.description}
            </p>
          </div>

          <div>
            {/* Verified Technology Badges as Surface-Mount Chips (translateZ: 26px) */}
            <div
              className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.08]"
              style={disable3D ? {} : { transform: 'translateZ(26px)', transformStyle: 'preserve-3d' }}
            >
              {node.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-mono text-neutral-300 bg-white/[0.04] border border-white/10 rounded-md shadow-sm transition-colors"
                  style={{
                    borderColor: isHighlighted ? `${accentColor}44` : undefined,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom Telemetry Channel Cue (translateZ: 16px) */}
            <div
              className="mt-3 pt-2 flex items-center justify-between text-[10px] font-mono border-t border-white/[0.06]"
              style={disable3D ? {} : { transform: 'translateZ(16px)' }}
            >
              <span
                className="flex items-center space-x-1.5 font-semibold transition-colors"
                style={{ color: accentColor }}
              >
                <Activity className="w-3 h-3" />
                <span>3D_CONDUIT_{node.number}</span>
              </span>
              <span className="text-neutral-400 group-hover:text-white transition-colors">
                HOVER TO PULSE CORE →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
