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
  technologies: string[];
}

export interface CareerTimelineItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export interface TechSkillCategory {
  category: string;
  skills: string[];
}

export interface CoreMetric {
  value: string;
  label: string;
  subtext: string;
}

export interface EffectSettings {
  reducedMotion: boolean;
  reducedEffects: boolean;
  webGLSupported: boolean;
  saveData: boolean;
  toggleReducedEffects: () => void;
}


export interface ProjectCaseStudy {
  projectId: string;
  challenge: string;
  solution: string;
  architecture: string[];
  technologies: string[];
  screenshots: string[];
  results: string[];
}
