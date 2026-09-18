export interface Project {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  image: string;
  description: string;
  ariaLabel: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CapabilityGroup {
  id: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface InfrastructureNode {
  id: string;
  number: string;
  label: string;
  description: string;
}

export interface EffectSettings {
  reducedMotion: boolean;
  reducedEffects: boolean;
  webGLSupported: boolean;
  saveData: boolean;
  toggleReducedEffects: () => void;
}
