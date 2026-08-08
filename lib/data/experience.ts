export type RoleType = "full-time" | "freelance";

export interface ExperienceRole {
  id: string;
  type: RoleType;
  title: string;
  company: string;
  location: string;
  period: string;
  startLabel: string;
  endLabel: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  accent?: string;
}

export const RESUME_PATH = "/pdf/Benjamin_Nkem_Resume.pdf";
export const RESUME_FILENAME = "Benjamin_Nkem_Resume.pdf";

export const SOCIAL_LINKS = {
  github: "https://github.com/benjaminnkem",
  email: "mailto:benjaminnkemfrancis@gmail.com",
  whatsapp: "https://wa.me/2348133961439",
} as const;

export const employment: ExperienceRole[] = [
  {
    id: "gidisquare",
    type: "full-time",
    title: "Lead Backend Engineer",
    company: "GidiSquare",
    location: "Remote",
    period: "Jul 2025 — Jul 2026",
    startLabel: "Jul '25",
    endLabel: "Jul '26",
    summary:
      "Led backend architecture and delivery for a multi-vendor marketplace — services, APIs, and data systems for products, listings, and professional services.",
    highlights: [
      "Led design and development of core backend services with NestJS, Node.js, and MongoDB for marketplace operations, user management, products, listings, and service transactions.",
      "Architected scalable REST APIs, authentication, authorization, and domain business logic for web and mobile clients.",
      "Defined backend standards, code review practices, and technical direction across marketplace service workstreams.",
      "Integrated payment gateways, notifications, cloud storage, and external APIs into production services.",
      "Optimized database queries, API performance, and service architecture to support growth under increasing load.",
      "Implemented monitoring, logging, validation, and security best practices for reliability and maintainability.",
      "Collaborated with product, mobile, and frontend teams to ship backend capabilities for buyers, sellers, and service providers.",
    ],
    technologies: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "REST APIs",
      "JWT",
      "Cloud Services",
      "CI/CD",
    ],
  },
  {
    id: "squad-gtco",
    type: "full-time",
    title: "Backend Engineer",
    company: "Squad GTCO (Guaranty Trust Bank)",
    location: "Remote",
    period: "Jun 2025 — Sep 2025",
    startLabel: "Jun '25",
    endLabel: "Sep '25",
    summary:
      "Built backend systems for a buy-now-pay-later (BNPL) product — APIs, payment flows, and service reliability in a regulated fintech environment.",
    highlights: [
      "Developed and maintained backend services powering a buy-now-pay-later product for installment-based purchases.",
      "Designed and implemented APIs and business logic for eligibility, installment schedules, repayments, and transaction state.",
      "Integrated with internal banking and payment systems while following security and compliance expectations for fintech workloads.",
      "Improved reliability through validation, error handling, logging, and careful handling of financial edge cases.",
      "Collaborated with product and engineering stakeholders to ship BNPL features from design through production readiness.",
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "REST APIs",
      "Fintech",
      "Payments",
      "MongoDB",
      "CI/CD",
    ],
  },
  {
    id: "allaccessfans",
    type: "full-time",
    title: "Senior Frontend Engineer",
    company: "AllaccessFans",
    location: "Remote",
    period: "Oct 2024 — Feb 2026",
    startLabel: "Oct '24",
    endLabel: "Feb '26",
    summary:
      "Led scalable frontend architecture for high-engagement web products — design systems, performance, and mentorship across the team.",
    highlights: [
      "Led development of scalable web apps with React, Next.js, TypeScript, and modern frontend tooling.",
      "Architected responsive, high-performance UIs that improved engagement and platform experience.",
      "Built reusable UI components and design systems to cut delivery time and keep consistency.",
      "Optimized performance via code splitting, lazy loading, caching, and frontend best practices.",
      "Integrated REST APIs and third-party services for reliable data flow and smooth interactions.",
      "Conducted code reviews, mentored juniors, and raised engineering standards on the frontend team.",
      "Partnered with QA to triage and resolve issues for a high-quality user experience.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux/Zustand",
      "Tailwind CSS",
      "REST APIs",
      "CI/CD",
      "Performance",
    ],
  },
  {
    id: "monei",
    type: "full-time",
    title: "Lead Frontend Engineer",
    company: "Monei",
    location: "Remote",
    period: "Dec 2023 — Aug 2025",
    startLabel: "Dec '23",
    endLabel: "Aug '25",
    summary:
      "Led frontend for AI-powered fintech — real-time conversational interfaces, streaming UIs, and product-shaping technical leadership.",
    highlights: [
      "Led frontend delivery of AI-powered financial products and core user-facing experiences.",
      "Designed real-time conversational interfaces for AI assistants and financial tools.",
      "Integrated AI services, streaming responses, and real-time data pipelines with backend teams.",
      "Built chat UIs with message streaming, history, typing indicators, and dynamic content rendering.",
      "Established reusable component patterns and frontend standards for speed and consistency.",
      "Mentored engineers through code reviews and technical leadership.",
      "Contributed to product strategy and technical decisions for AI-driven experiences.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Streaming APIs",
      "WebSockets",
      "AI Integrations",
      "State Management",
    ],
  },
];

export const freelancing: ExperienceRole[] = [
  {
    id: "freelance-lead",
    type: "freelance",
    title: "Independent Full Stack Engineer",
    company: "Freelance & Consulting",
    location: "Remote · Global",
    period: "2021 — Present",
    startLabel: "2021",
    endLabel: "Now",
    summary:
      "Partnered with startups and product teams to design, ship, and scale web & mobile products — from MVPs to production systems across marketplaces, fintech, and SaaS.",
    highlights: [
      "Delivered end-to-end products spanning React/Next.js frontends, NestJS APIs, and mobile experiences.",
      "Built marketplace platforms, admin dashboards, real-time interfaces, and AI-assisted product surfaces.",
      "Owned architecture decisions, performance tuning, auth systems, and third-party integrations (payments, storage, notifications).",
      "Translated ambiguous product requirements into shippable technical plans with clear milestones.",
      "Worked directly with founders, designers, and remote engineering teams across time zones.",
      "Maintained long-term client relationships through reliable delivery, communication, and post-launch support.",
    ],
    technologies: [
      "Next.js",
      "React",
      "React Native",
      "NestJS",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
      "Cloud",
    ],
  },
  {
    id: "freelance-product",
    type: "freelance",
    title: "Product Engineering Partner",
    company: "Selected Client Work",
    location: "Contract · Remote",
    period: "Ongoing engagements",
    startLabel: "Various",
    endLabel: "—",
    summary:
      "Focused engagements on high-impact product surfaces — inventory systems, booking platforms, media products, and growth-facing web experiences.",
    highlights: [
      "Shipped client products including commerce, media, booking, and operational tooling.",
      "Improved Core Web Vitals, load times, and interaction quality on production frontends.",
      "Designed typed API contracts and resilient error handling between client and server.",
      "Set up CI/CD, environment configs, and deploy pipelines for faster, safer releases.",
      "Provided technical audits and refactor roadmaps for early-stage codebases.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "REST",
      "UI Systems",
      "Performance",
      "DevOps",
    ],
  },
];

export const allExperience: ExperienceRole[] = [...employment, ...freelancing];
