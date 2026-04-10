export const recruiterRoleOptions = [
  { value: 'frontend', label: 'Frontend Engineer' },
  { value: 'fullstack', label: 'Full-Stack Engineer' },
  { value: 'backend', label: 'Backend Engineer' },
  { value: 'ai', label: 'AI Product Engineer' },
];

export const companyTypeOptions = [
  { value: 'startup', label: 'Startup' },
  { value: 'agency', label: 'Agency' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'remote', label: 'Remote-first Team' },
];

export const defaultDraftInput = {
  roleTarget: 'frontend',
  companyType: 'startup',
  recruiterName: '',
  companyName: '',
  jobTitle: '',
  jobDescription: '',
};

export const profile = {
  name: 'Ahmed',
  fullName: 'Ahmed',
  brand: 'Ahmed Dev',
  brandAccent: 'Portfolio',
  location: 'Pakistan',
  availability: 'Open to frontend and full-stack roles',
  heroCode: {
    filename: 'portfolio.profile.ts',
    snippet: `const candidate = {
  name: "Ahmed",
  focus: ["React", "Node.js", "Product UI"],
  strengths: ["performance", "UX", "clean code"],
  openTo: ["Frontend", "Full-Stack", "AI-assisted products"],
};`,
  },
  defaultTypewriterRoles: [
    'Frontend Engineer',
    'Full-Stack Developer',
    'React / Next.js Builder',
    'Product-minded Web Engineer',
  ],
  intro:
    'I build polished React interfaces, conversion-focused web products, and reliable backend flows. My sweet spot is shipping fast without sacrificing code quality.',
  longBio:
    'I enjoy turning product requirements into responsive interfaces, practical APIs, and high-trust user experiences. My recent work spans premium marketing sites, lead capture systems, and this AI-powered recruiter portfolio.',
  quickFacts: [
    { val: '15+', label: 'Projects Shipped' },
    { val: '96/100', label: 'Best PageSpeed' },
    { val: '24h', label: 'Typical Response' },
  ],
  contact: {
    email: 'ahmedchoudery30@gmail.com',
    github: 'https://github.com/ahmedchoudery',
    whatsapp: '923174307043',
    locationLabel: 'Pakistan',
  },
};

export const rolePlaybooks = {
  frontend: {
    label: 'Frontend Engineer',
    titleLines: ['Ahmed', 'Frontend', 'Engineer.'],
    stackPills: ['React', 'Next.js', 'TypeScript', 'Responsive UI', 'Performance', 'SEO'],
    priorityTags: ['frontend', 'ui', 'react', 'performance', 'responsive', 'seo'],
    summaryLead:
      'Frontend-focused engineer building fast, polished interfaces with React, design discipline, and strong attention to user experience.',
    whyMe: [
      'Translates product ideas into polished, responsive UI',
      'Balances visual quality with speed and maintainability',
      'Strong instinct for conversion, clarity, and interaction design',
      'Comfortable owning implementation from hero section to form submission',
    ],
  },
  fullstack: {
    label: 'Full-Stack Engineer',
    titleLines: ['Ahmed', 'Full-Stack', 'Engineer.'],
    stackPills: ['React', 'Node.js', 'MongoDB', 'APIs', 'Forms', 'Deployment'],
    priorityTags: ['frontend', 'backend', 'api', 'forms', 'database', 'fullstack'],
    summaryLead:
      'Full-stack engineer comfortable owning UI, backend flows, deployment details, and the glue that makes a product feel complete.',
    whyMe: [
      'Ships end-to-end features instead of isolated screens',
      'Comfortable with frontend polish and backend data handling',
      'Builds reliable lead capture and business workflows',
      'Keeps projects practical, readable, and production-focused',
    ],
  },
  backend: {
    label: 'Backend Engineer',
    titleLines: ['Ahmed', 'Backend', 'Engineer.'],
    stackPills: ['Node.js', 'Express', 'MongoDB', 'Validation', 'APIs', 'Vercel'],
    priorityTags: ['backend', 'api', 'forms', 'database', 'validation', 'server'],
    summaryLead:
      'Backend-leaning engineer focused on APIs, validation, persistence, and the operational details behind dependable web products.',
    whyMe: [
      'Builds practical backend flows around real product needs',
      'Cares about validation, error handling, and durable data',
      'Understands how frontend and backend decisions affect each other',
      'Prefers simple, maintainable service boundaries over unnecessary complexity',
    ],
  },
  ai: {
    label: 'AI Product Engineer',
    titleLines: ['Ahmed', 'AI Product', 'Engineer.'],
    stackPills: ['React', 'Prompting', 'OpenAI-ready APIs', 'Personalization', 'Product UX', 'Automation'],
    priorityTags: ['ai', 'automation', 'frontend', 'api', 'product'],
    summaryLead:
      'Engineer exploring practical AI features through product experiences, personalization flows, and backend integrations that stay grounded in real UX.',
    whyMe: [
      'Builds AI features as useful product experiences, not demos',
      'Combines UI thinking with integration and prompt orchestration',
      'Comfortable blending rule-based logic with model output',
      'Focuses on keeping AI experiences truthful, resilient, and explainable',
    ],
  },
};

export const companyTypePlaybooks = {
  startup: {
    label: 'Startup',
    summaryAddon:
      'Comfortable shipping quickly, iterating in public, and taking ownership across product boundaries.',
  },
  agency: {
    label: 'Agency',
    summaryAddon:
      'Used to balancing visual quality, client expectations, and delivery speed across multiple project styles.',
  },
  enterprise: {
    label: 'Enterprise',
    summaryAddon:
      'Brings a structured approach to UI consistency, reliability, and maintainable implementation details.',
  },
  remote: {
    label: 'Remote-first Team',
    summaryAddon:
      'Works well asynchronously and documents decisions so progress stays visible and predictable.',
  },
};

export const projects = [
  {
    id: 'recruiter-portfolio',
    title: 'Recruiter-Tailored Portfolio',
    category: 'AI Product / Developer Experience',
    desc:
      'This portfolio personalizes its hero copy, project ranking, skills focus, and CTA for each recruiter using role signals, job-description context, and AI-ready backend scaffolding.',
    longDesc:
      'Built on React with a Node + Mongo backend, the portfolio adapts for frontend, backend, full-stack, and AI product roles while keeping all claims grounded in real project data.',
    tags: ['React', 'Node.js', 'MongoDB', 'Personalization', 'Prompting'],
    focusAreas: ['ai', 'frontend', 'backend', 'api', 'product'],
    stats: [
      { label: 'Portfolio Modes', value: '4' },
      { label: 'Saved Sessions', value: 'Shareable' },
    ],
    url: '#home',
    featured: true,
    color: '#38BDF8',
  },
  {
    id: 'falak-halls',
    title: 'Falak Halls & Events',
    category: 'Marketing Site / Conversion',
    desc:
      'Premium venue website with gallery flow, inquiry funnel, and WhatsApp conversion path for a real local business.',
    longDesc:
      'Focused on visual quality, trust-building layout, and a lead capture path that turns page visits into booking conversations.',
    tags: ['React', 'SEO', 'Responsive', 'Conversion'],
    focusAreas: ['frontend', 'performance', 'seo', 'product'],
    stats: [
      { label: 'Inquiry Growth', value: '+65%' },
      { label: 'Page Speed', value: '96/100' },
    ],
    url: 'https://falak-marriage-hall.vercel.app/',
    color: '#FF4D6D',
  },
  {
    id: 'spice-route',
    title: 'Spice Route Restaurant',
    category: 'Product Website',
    desc:
      'Restaurant experience with reservations, menu discovery, and location guidance designed for mobile-first customer journeys.',
    longDesc:
      'Structured the information architecture around intent: menu browsing, table reservations, and local search visibility.',
    tags: ['Next.js', 'Maps', 'UX', 'SEO'],
    focusAreas: ['frontend', 'responsive', 'seo', 'ux'],
    url: '#portfolio',
    color: '#FFB800',
  },
  {
    id: 'noor-boutique',
    title: 'Noor Boutique',
    category: 'E-Commerce Experience',
    desc:
      'Retail storefront with catalog browsing, sizing guidance, and lightweight purchase flow tuned for mobile shoppers.',
    longDesc:
      'Focused on visual presentation, clean product discovery, and a low-friction order path suited to local commerce patterns.',
    tags: ['E-Commerce', 'Catalog', 'Mobile UI'],
    focusAreas: ['frontend', 'ui', 'responsive', 'product'],
    url: '#portfolio',
    color: '#A78BFA',
  },
  {
    id: 'citymed-clinic',
    title: 'CityMed Clinic',
    category: 'Service Platform',
    desc:
      'Healthcare service site with appointment intent, doctor listing, and structured service information for faster trust-building.',
    longDesc:
      'Designed to guide users from landing to action while keeping the experience simple enough for non-technical audiences.',
    tags: ['Booking Flow', 'Responsive', 'Information Design'],
    focusAreas: ['frontend', 'product', 'forms', 'responsive'],
    url: '#portfolio',
    color: '#00FFA3',
  },
  {
    id: 'lead-capture-api',
    title: 'Lead Capture Backend',
    category: 'Backend Workflow',
    desc:
      'Express + Mongo contact pipeline with validation, persistence, admin retrieval, and deployment-safe API routing.',
    longDesc:
      'Built to support real lead capture flows with validation, durable storage, environment-aware configuration, and useful success/error responses.',
    tags: ['Express', 'MongoDB', 'Validation', 'APIs'],
    focusAreas: ['backend', 'api', 'forms', 'database', 'validation'],
    url: '#contact',
    color: '#10B981',
  },
];

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend Delivery',
    description: 'Product UI, responsive implementation, and polished interaction details.',
    skills: [
      { name: 'React / Next.js', pct: 95, tags: ['frontend', 'react', 'fullstack', 'ai'] },
      { name: 'HTML / CSS', pct: 98, tags: ['frontend', 'responsive', 'ui'] },
      { name: 'JavaScript / TypeScript', pct: 90, tags: ['frontend', 'backend', 'api'] },
      { name: 'Animation / UI Polish', pct: 88, tags: ['frontend', 'ui', 'product'] },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Product Logic',
    description: 'Forms, APIs, validation, persistence, and deployment-ready thinking.',
    skills: [
      { name: 'Node.js / Express', pct: 86, tags: ['backend', 'api', 'fullstack'] },
      { name: 'MongoDB / Data Modeling', pct: 82, tags: ['backend', 'database', 'fullstack'] },
      { name: 'SEO / Performance', pct: 92, tags: ['frontend', 'seo', 'performance'] },
      { name: 'Prompting / AI Flows', pct: 72, tags: ['ai', 'automation', 'product'] },
    ],
  },
];

export const techStack = [
  { name: 'React', level: '3+ years', tags: ['frontend', 'fullstack', 'ai'] },
  { name: 'Next.js', level: '2+ years', tags: ['frontend', 'seo'] },
  { name: 'Node.js', level: '2+ years', tags: ['backend', 'fullstack'] },
  { name: 'Express', level: '2+ years', tags: ['backend', 'api'] },
  { name: 'MongoDB', level: '2+ years', tags: ['backend', 'database'] },
  { name: 'Vercel', level: 'Production deploys', tags: ['deployment', 'fullstack'] },
  { name: 'Framer Motion', level: 'UI interactions', tags: ['frontend', 'ui'] },
  { name: 'Prompt Design', level: 'Emerging practice', tags: ['ai', 'product'] },
];

export const timeline = [
  {
    year: '2026',
    title: 'Recruiter-Personalized Portfolio',
    body:
      'Turned a services portfolio into a recruiter-focused product that adapts to hiring context with rules and AI-ready personalization.',
    tags: ['ai', 'frontend', 'backend', 'product'],
  },
  {
    year: '2024',
    title: 'Falak Halls & Events Website',
    body:
      'Built a premium business site with gallery flow, conversion CTAs, and strong performance for a local venue brand.',
    tags: ['frontend', 'seo', 'performance'],
  },
  {
    year: '2023',
    title: 'Lead Capture and Local Business Projects',
    body:
      'Shipped client-facing websites with forms, discovery flows, and practical backend support for real-world leads.',
    tags: ['fullstack', 'forms', 'api'],
  },
];

export const footerLinkGroups = {
  sections: [
    { label: 'personalize()', href: '#personalize' },
    { label: 'projects()', href: '#portfolio' },
    { label: 'skills()', href: '#skills' },
    { label: 'about()', href: '#about' },
    { label: 'contact()', href: '#contact' },
  ],
  roles: recruiterRoleOptions.map((role) => ({
    label: role.label.toLowerCase().replaceAll(' ', '_'),
    href: '#personalize',
  })),
  stack: [
    { label: 'react', href: '#skills' },
    { label: 'nodejs', href: '#skills' },
    { label: 'mongodb', href: '#skills' },
    { label: 'vercel', href: '#skills' },
    { label: 'prompting', href: '#personalize' },
  ],
};
