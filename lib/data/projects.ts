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
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    images: [
      "/images/projects/allaccess/1.png",
      "/images/projects/allaccess/2.png",
    ],
  },
  {
    slug: "disux",
    name: "Disux",
    category: "Crypto Exchange",
    description:
      "A non-custodial crypto-to-Naira exchange that replaces unreliable P2P trades with fast, secure, and low-fee transactions.",
    overview: [
      "Built the full-stack platform end to end — NestJS API with MySQL on the backend and a Next.js frontend styled with Tailwind CSS.",
      "Designed a streamlined buy/sell flow from account creation and KYC verification through order placement and instant Naira bank payouts.",
      "Implemented live rate feeds, multi-asset support (BTC, ETH, USDT, TON, and more), and a non-custodial model that keeps user funds under their control.",
    ],
    technologies: ["Next.js", "NestJS", "MySQL", "TypeScript", "Tailwind CSS"],
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
    category: "AI Fintech Platform",
    description:
      "An AI-native financial infrastructure platform that lets businesses and intelligent agents automate payments, banking, investments, and insurance through a single unified API.",
    overview: [
      "Led frontend development as senior engineer — built the marketing site and product UI in Next.js with Radix UI, Tailwind CSS, and motion-driven storytelling via GSAP and Framer Motion.",
      "Shipped the Mr. Monei AI assistant experience using the Vercel AI SDK, with conversational flows for executing transactions, checking balances, and managing portfolios.",
      "Integrated TanStack Query, React Hook Form, and Zod for robust data fetching and validation across MCP server tooling, NGN/USD on-off ramps, and automated transaction workflows.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "TanStack Query",
      "AI SDK",
      "GSAP",
      "Zustand",
    ],
    images: [
      "/images/projects/monei/1.png",
      "/images/projects/monei/2.png",
      "/images/projects/monei/3.png",
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
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    images: [
      "/images/projects/stockly/1.png",
      "/images/projects/stockly/2.png",
      "/images/projects/stockly/3.png",
    ],
  },
  {
    slug: "zapfi",
    name: "Zapfi",
    category: "Web3 Wallet",
    description:
      "A web3-powered crypto wallet that makes getting into digital assets simple — generate a wallet in seconds, then buy, sell, send, and receive crypto from one place.",
    overview: [
      "Led frontend development in Next.js, building the full user experience from onboarding through wallet creation, trading, and transaction history.",
      "Integrated web3 wallet flows so users can generate secure addresses and manage their portfolio without leaving the platform.",
      "Crafted an immersive marketing experience with React Three Fiber, GSAP, and Framer Motion to bring the crypto onboarding journey to life.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
      "Zustand",
    ],
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
