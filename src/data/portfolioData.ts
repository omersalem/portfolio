import { Project, NavItem, CapabilityGroup, InfrastructureNode } from '../types';

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
    id: 'networks',
    number: '01',
    label: 'Networks and routing',
    description: 'Enterprise switching, resilient BGP/OSPF routing topologies, VLAN segmentation, and deterministic multi-site traffic flows.',
  },
  {
    id: 'security',
    number: '02',
    label: 'Cisco, FortiGate, F5, and security',
    description: 'High-availability firewalls, ASM/WAF application defense policies, SSL inspection, IPsec VPN tunneling, and zero-trust edge posture.',
  },
  {
    id: 'servers',
    number: '03',
    label: 'Windows and Linux servers',
    description: 'Production hardening, Active Directory DS/GPO infrastructure, Ubuntu LTS systems, systemd service management, and kernel tuning.',
  },
  {
    id: 'virtualization',
    number: '04',
    label: 'VMware and virtualization',
    description: 'vSphere hypervisor clusters, ESXi host performance, vCenter orchestration, high-availability resource pools, and SAN datastores.',
  },
  {
    id: 'storage',
    number: '05',
    label: 'Storage and backup',
    description: 'Redundant block/file storage architectures, snapshot lifecycle scheduling, immutable off-site disaster recovery, and data protection.',
  },
  {
    id: 'automation',
    number: '06',
    label: 'Infrastructure discovery and automation',
    description: 'Automated topology discovery, agentic telemetry analysis, self-healing runbooks, PowerShell/CLI orchestration, and AI-native systems.',
  },
];

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'cap-web',
    number: '01',
    title: 'Website design and full-stack development',
    description: 'Engineered digital storefronts, corporate platforms, and web applications built with modern architectural foundations, responsive layouts, and meticulous typographic hierarchy.',
    highlights: ['React & Modern Frameworks', 'Architectural Editorial Design', 'Fluid Responsive Layouts', 'Clean Modular Codebases'],
  },
  {
    id: 'cap-ecom',
    number: '02',
    title: 'E-commerce and customer-facing platforms',
    description: 'Conversion-oriented commercial platforms engineered for speed, frictionless product discovery, multi-currency purchasing, and seamless checkout pipelines.',
    highlights: ['Catalog & Filter Architecture', 'Checkout Optimization', 'Mobile PWA Experience', 'Order & Inventory Integration'],
  },
  {
    id: 'cap-ai',
    number: '03',
    title: 'AI, automation, and technical knowledge systems',
    description: 'Integration of LLMs, agentic operational assistants, automated telemetry diagnostics, and technical knowledge brains designed for deep domain insight.',
    highlights: ['MNE Brain Architecture', 'Knowledge Graphs & Retrieval', 'Agentic Runbook Execution', 'Operational Scripting'],
  },
  {
    id: 'cap-infra',
    number: '04',
    title: 'Hardware, networking, security, servers, and virtualization',
    description: 'End-to-end physical and virtual systems engineering ensuring digital products operate on hardened, secure, redundant, and monitored enterprise infrastructure.',
    highlights: ['Enterprise Network Fabrics', 'UTM & WAF Policy Hardening', 'Virtual Hypervisors & Storage', 'Disaster Recovery Systems'],
  },
];
