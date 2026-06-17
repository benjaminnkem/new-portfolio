export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  overview: string[];
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "allaccess",
    name: "AllAccessFans",
    category: "Content Creator Platform",
    description:
      "A membership platform connecting creators with their audience through exclusive content, subscriptions, and community features.",
    overview: [
      "Built a creator-first dashboard for managing subscribers, payouts, and content tiers in one place.",
      "Designed onboarding flows that reduce time-to-first-post for new creators joining the platform.",
      "Implemented role-based access so creators, moderators, and fans each get tailored experiences.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    images: [
      "/images/projects/allaccess/1.png",
      "/images/projects/allaccess/2.png",
    ],
  },
  {
    slug: "disux",
    name: "Disux",
    category: "Design & UX Studio",
    description:
      "A digital studio site showcasing brand systems, product design work, and case studies for client engagements.",
    overview: [
      "Crafted a editorial layout system that scales from single project features to full portfolio grids.",
      "Integrated motion and scroll-driven reveals to highlight process and deliverables without overwhelming content.",
      "Structured case study templates so new projects can be published with consistent storytelling.",
    ],
    technologies: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS", "Figma"],
    images: [
      "/images/projects/disux/1.png",
      "/images/projects/disux/2.png",
      "/images/projects/disux/3.png",
      "/images/projects/disux/4.png",
    ],
  },
  {
    slug: "monei",
    name: "Monei",
    category: "Fintech Platform",
    description:
      "A personal finance application helping users track spending, set budgets, and visualize financial health over time.",
    overview: [
      "Developed real-time transaction categorization with clear visual breakdowns across accounts.",
      "Built savings goal modules with progress tracking and automated contribution reminders.",
      "Focused on accessible data visualization so complex financial patterns stay easy to read at a glance.",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Recharts", "Tailwind CSS"],
    images: [
      "/images/projects/monei/1.png",
      "/images/projects/monei/2.png",
      "/images/projects/monei/3.png",
    ],
  },
  {
    slug: "stockly",
    name: "Stockly",
    category: "Inventory Management",
    description:
      "An inventory and stock management tool for small businesses to monitor products, suppliers, and restock alerts.",
    overview: [
      "Created a unified inventory view with low-stock warnings and supplier lead-time tracking.",
      "Added bulk import and export workflows so teams can migrate existing spreadsheets quickly.",
      "Designed dashboards that surface turnover rates and dead-stock items for smarter purchasing decisions.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    images: [
      "/images/projects/stockly/1.png",
      "/images/projects/stockly/2.png",
      "/images/projects/stockly/3.png",
      "/images/projects/stockly/4.png",
    ],
  },
  {
    slug: "ticketwave",
    name: "TicketWave",
    category: "Event Ticketing",
    description:
      "An event ticketing platform for discovering, booking, and managing live experiences with seamless checkout.",
    overview: [
      "Built event discovery with filtering by date, location, and category alongside rich venue previews.",
      "Implemented a secure checkout flow with QR-based digital tickets and organizer verification tools.",
      "Designed organizer dashboards for sales analytics, attendee lists, and on-site check-in management.",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Tailwind CSS"],
    images: [
      "/images/projects/ticketwave/1.png",
      "/images/projects/ticketwave/2.png",
      "/images/projects/ticketwave/3.png",
      "/images/projects/ticketwave/4.png",
      "/images/projects/ticketwave/5.png",
      "/images/projects/ticketwave/6.png",
    ],
  },
  {
    slug: "zapfi",
    name: "Zapfi",
    category: "Payments & Transfers",
    description:
      "A fast payments app for sending money, paying bills, and managing digital wallets with a minimal interface.",
    overview: [
      "Designed a frictionless send-and-receive flow optimized for mobile-first, one-handed use.",
      "Integrated bill payment modules with saved beneficiaries and recurring schedule support.",
      "Built transaction history with smart search and export options for personal record keeping.",
    ],
    technologies: ["React Native", "Node.js", "Redis", "PostgreSQL", "Tailwind CSS"],
    images: [
      "/images/projects/zapfi/1.png",
      "/images/projects/zapfi/2.png",
      "/images/projects/zapfi/3.png",
      "/images/projects/zapfi/4.png",
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug);