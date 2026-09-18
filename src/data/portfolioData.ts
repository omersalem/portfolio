import { Project, NavItem, CapabilityGroup, InfrastructureNode, CareerTimelineItem, TechSkillCategory, CoreMetric } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'WORK', href: '#work' },
  { label: 'ENGINEERING', href: '#engineering' },
  { label: 'PROFILE', href: '#profile' },
  { label: 'CONTACT', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 'almalaki',
    name: 'Almalaki Store',
    url: 'https://almalakistore.ps/',
    displayUrl: 'almalakistore.ps',
    image: '/references/almalaki-store.png',
    description: 'Premier confectionery and cake supplies e-commerce platform featuring multi-currency commerce, curated catalog browsing, and mobile app integration.',
    ariaLabel: 'View Almalaki Store at almalakistore.ps',
    tags: ['E-Commerce', 'Bilingual Storefront', 'PWA'],
  },
  {
    id: 'bazaria',
    name: 'Bazaria Council',
    url: 'https://bazariacouncil.pages.dev/',
    displayUrl: 'bazariacouncil.pages.dev',
    image: '/references/bazaria-council.png',
    description: 'Official municipal portal providing citizen digital public services, official announcements, community tracking, and civic engagement.',
    ariaLabel: 'View Bazaria Council at bazariacouncil.pages.dev',
    tags: ['Civic Portal', 'Cloudflare Pages', 'Public Services'],
  },
  {
    id: 'handmade',
    name: 'handmade.ps',
    url: 'https://handmade.ps/',
    displayUrl: 'handmade.ps',
    image: '/references/handmade-ps.png',
    description: 'Artisanal digital boutique for handcrafted ceramics, bespoke gifts, and specialty home items with streamlined catalog navigation.',
    ariaLabel: 'View handmade.ps at handmade.ps',
    tags: ['Artisanal Store', 'Design System', 'Direct Checkout'],
  },
  {
    id: 'pistachio',
    name: 'Pistachio',
    url: 'https://postachio.pages.dev/',
    displayUrl: 'postachio.pages.dev',
    image: '/references/pistachio.png',
    description: 'Gourmet dessert and fresh pastry ordering interface engineered with rapid category filtering and WhatsApp direct customer ordering.',
    ariaLabel: 'View Pistachio at postachio.pages.dev',
    tags: ['Gourmet Food', 'Order Flow', 'Responsive Web'],
  },
  {
    id: 'lama-home',
    name: 'Lama Home',
    url: 'https://lamastorev2.pages.dev/',
    displayUrl: 'lamastorev2.pages.dev',
    image: '/references/lama-home.png',
    description: 'Curated home accessories and artisanal decor e-commerce store with high-contrast aesthetic imagery and secure shopping flow.',
    ariaLabel: 'View Lama Home at lamastorev2.pages.dev',
    tags: ['Home Accessories', 'Commerce UX', 'Fast Fulfillment'],
  },
];

export const INFRASTRUCTURE_NODES: InfrastructureNode[] = [
  {
    id: 'cisco-core',
    number: '01',
    label: 'Cisco Core Switches & Enterprise Routing',
    description: 'Enterprise network backbone architecture utilizing Cisco Core Switches, Catalyst & Nexus fabrics, distribution layers, resilient VLAN segmentation, and deterministic OSPF/BGP routing topologies.',
    technologies: ['Cisco Core Switch', 'Catalyst & Nexus', 'Enterprise Routers', 'VLAN / OSPF / BGP'],
  },
  {
    id: 'firewalls-waf',
    number: '02',
    label: 'Next-Gen Firewalls & Perimeter Security',
    description: 'Direct operational responsibility for perimeter firewalls, deep packet inspection, threat prevention, SSL inspection, high-availability clustering, and Web Application Firewall defense.',
    technologies: ['FortiGate NGFW', 'F5 BIG-IP (WAF/LTM)', 'Cisco FMC & FTD', 'Sophos Security'],
  },
  {
    id: 'active-directory',
    number: '03',
    label: 'Active Directory & Enterprise Identity',
    description: 'Direct responsibility for Active Directory Domain Services (AD DS), enterprise Group Policy Object (GPO) engineering, role-based access control (RBAC), and Kerberos/LDAP identity governance.',
    technologies: ['Active Directory (AD DS)', 'Group Policy (GPO)', 'Domain Architecture', 'Identity Governance'],
  },
  {
    id: 'exchange-server',
    number: '04',
    label: 'Microsoft Exchange Server Infrastructure',
    description: 'Nationwide enterprise messaging architecture, Database Availability Groups (DAG) clustering, secure mail flow transport pipelines, anti-spam hygiene, and TLS encryption compliance.',
    technologies: ['Exchange Server', 'DAG Clustering', 'Mail Flow Routing', 'TLS & Transport Security'],
  },
  {
    id: 'sccm-management',
    number: '05',
    label: 'SCCM Endpoint & Patch Management',
    description: 'Microsoft System Center Configuration Manager (SCCM) for centralized OS deployment, automated security patch pipelines, endpoint compliance, and enterprise software distribution.',
    technologies: ['Microsoft SCCM', 'OS Imaging & Task Sequences', 'Patch Compliance', 'Asset Automation'],
  },
  {
    id: 'ai-agents',
    number: '06',
    label: 'AI Autonomous Agents & Infrastructure Automation',
    description: 'Autonomous multi-agent orchestration, specialized agent skills architecture, execution loops, context window optimization, self-healing diagnostic runbooks, and MNE Brain v2.',
    technologies: ['Autonomous Agents', 'Skills Architecture', 'Looping & Context Chains', 'MNE Brain v2'],
  },
];

export const CAREER_TIMELINE: CareerTimelineItem[] = [
  {
    id: 'mne-ramallah',
    role: 'Computer Engineer (Infrastructure, Security & Systems)',
    organization: 'Ministry of National Economy (MNE)',
    location: 'Ramallah, Palestine',
    duration: '7 Years',
    period: '2019 – Present',
    responsibilities: [
      'Direct operational ownership for enterprise perimeter firewalls (FortiGate, Cisco FMC & FTD, F5 BIG-IP, Sophos), maintaining high availability and zero-trust perimeter defense.',
      'Comprehensive administration of nationwide Active Directory (AD DS) infrastructure and Group Policy (GPO) enforcement for ministerial endpoints.',
      'Core enterprise networking management across Cisco Core Switches, Catalyst distribution layers, and secure multi-site routing backbones.',
      'Operations and continuous availability of Microsoft Exchange Server messaging infrastructure and SCCM automated deployment/patching pipelines.',
      'Architecting and implementing AI automation, agent skills, and digital twin systems (MNE Brain v2) for autonomous telemetry and runbook execution.',
    ],
    technologies: ['FortiGate', 'F5 BIG-IP', 'Cisco FMC & FTD', 'Cisco Core Switches', 'Active Directory', 'Exchange Server', 'SCCM', 'Sophos', 'AI Agents'],
  },
  {
    id: 'kuwait-engineer',
    role: 'Computer Engineer',
    organization: 'Enterprise Systems Engineering',
    location: 'Kuwait',
    duration: '1 Year',
    period: '2018 – 2019',
    responsibilities: [
      'Enterprise computer systems deployment, server rack installation, network cabling, and hardware lifecycle management.',
      'Network switching, routing configuration, hardware diagnostics, and end-user access administration.',
      'Implementation of baseline system security protocols, backup policies, and disaster prevention routines.',
    ],
    technologies: ['Network Switching', 'Enterprise Routers', 'Hardware Diagnostics', 'Windows Server', 'Storage & Backup'],
  },
];

export const CORE_METRICS: CoreMetric[] = [
  {
    value: '8+ Years',
    label: 'Engineering Experience',
    subtext: 'Proven enterprise systems & modern web architecture',
  },
  {
    value: '7 Years',
    label: 'Ministry of National Economy',
    subtext: 'Ramallah — Firewalls, Core Networks & Active Directory',
  },
  {
    value: 'Bilingual',
    label: 'English & Arabic',
    subtext: 'Native Arabic & fluent professional English communication',
  },
  {
    value: 'Full Stack + Infra',
    label: 'Two Worlds Unified',
    subtext: 'From Cisco Core & FortiGate to React, Three.js & AI Agents',
  },
];

export const TECH_SKILL_CATEGORIES: TechSkillCategory[] = [
  {
    category: 'Perimeter & Firewalls',
    skills: ['FortiGate NGFW', 'F5 BIG-IP (WAF/ASM)', 'Cisco FMC', 'Cisco FTD', 'Sophos Security'],
  },
  {
    category: 'Core Networks & Routing',
    skills: ['Cisco Core Switches', 'Cisco Routers', 'Catalyst & Nexus', 'VLAN Segmentation', 'OSPF / BGP'],
  },
  {
    category: 'Enterprise Microsoft & Identity',
    skills: ['Active Directory (AD DS)', 'Group Policy (GPO)', 'Microsoft Exchange Server', 'Microsoft SCCM', 'Windows Server'],
  },
  {
    category: 'AI & Autonomous Agent Systems',
    skills: ['Agent Skills Architecture', 'Execution Looping', 'Context Window Management', 'Multi-Agent Workflows', 'MNE Brain v2'],
  },
  {
    category: 'Web Design & Implementation',
    skills: ['React 18 & TypeScript', 'Three.js & WebGL 3D', 'Tailwind CSS', 'Responsive Architecture', 'E-Commerce Platforms'],
  },
  {
    category: 'Languages',
    skills: ['Arabic (Native)', 'English (Professional Fluent)'],
  },
];

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'cap-web',
    number: '01',
    title: 'Website & Application Design and Implementation',
    description: 'Engineered digital storefronts, corporate platforms, and web applications built with modern architectural foundations, fluid responsive layouts, and meticulous typographic hierarchy.',
    highlights: ['React 18 & Modern TypeScript', 'Three.js Interactive 3D WebGL', 'Fluid Responsive Layouts', 'Clean Modular Codebases'],
  },
  {
    id: 'cap-ecom',
    number: '02',
    title: 'E-Commerce & High-Converting Commercial Platforms',
    description: 'Conversion-oriented commercial platforms engineered for speed, frictionless product discovery, multi-currency purchasing, and seamless checkout pipelines (proven across 5 live platforms).',
    highlights: ['Catalog & Filter Architecture', 'Checkout Optimization', 'Mobile PWA Experience', 'Order & WhatsApp Integration'],
  },
  {
    id: 'cap-ai',
    number: '03',
    title: 'AI Systems, Agent Skills, Looping & Context Engineering',
    description: 'Deep engineering of autonomous AI agents, specialized skill definitions, multi-step execution loops, token-efficient context management, and MNE Brain v2 operational digital twins.',
    highlights: ['Agent Skills & Customization', 'Autonomous Execution Loops', 'Context Window Optimization', 'Multi-Agent Orchestration'],
  },
  {
    id: 'cap-infra',
    number: '04',
    title: 'Enterprise Firewalls, Core Networks, Active Directory & Servers',
    description: 'End-to-end physical and virtual systems engineering: managing FortiGate, F5, Cisco FMC/FTD, Cisco Core Switches, Active Directory, Exchange Server, and SCCM at government scale.',
    highlights: ['FortiGate & F5 WAF Defense', 'Cisco Core Switching & Routers', 'Active Directory DS & GPO', 'Exchange Server & SCCM'],
  },
];
