// Everything the journey page says lives here.
// Strings wrapped in [square brackets] are placeholders still waiting on real content.

export type LayerIndex = 0 | 1 | 2 | 3;

export const LAYERS = ["phone", "web", "api", "data"] as const;

export type Shot =
  | { kind: "image"; src: string; width: number; height: number }
  | { kind: "code" };

export type Project = {
  key: string;
  layer: LayerIndex;
  name: string;
  role: string;
  blurb: string;
  stack: string;
  link?: { href: string; label: string };
  shot: Shot;
};

const img = (src: string, width: number, height: number): Shot => ({
  kind: "image",
  src: `/journey/${src}`,
  width,
  height,
});

// Order matters: the request falls through these top to bottom.
export const PROJECTS: Project[] = [
  {
    key: "wetinnext-phone",
    layer: 0,
    name: "wetinnext",
    role: "founder · builder",
    blurb:
      "the page you just tapped, on the phone where most nights get planned. buy a ticket in a minute, no account needed.",
    stack: "[stack]",
    shot: img("wn-phone-home.jpg", 631, 760),
  },
  {
    key: "gidisquare-app",
    layer: 0,
    name: "gidisquare app",
    role: "lead backend",
    blurb:
      "uk service marketplace app for 2,000+ verified pros. i led the backend behind every screen.",
    stack: "nestjs · mongodb · redis · socket.io",
    shot: img("gidi-mobile.jpg", 508, 1100),
  },
  {
    key: "wetinnext",
    layer: 1,
    name: "wetinnext",
    role: "founder · builder",
    blurb:
      "the same app on a laptop. nigeria's place to find a night, make a plan and hold a verified ticket.",
    stack: "[stack]",
    link: { href: "https://wetinnext.com/", label: "wetinnext.com" },
    shot: img("wn-desktop.jpg", 1300, 658),
  },
  {
    key: "monei",
    layer: 1,
    name: "monei",
    role: "lead frontend",
    blurb: "an ai assistant that moves real money in chat: balances, transfers, portfolios.",
    stack: "next.js · ai sdk · tanstack query · gsap",
    link: { href: "https://monei.cc/", label: "monei.cc" },
    shot: img("monei.jpg", 1100, 796),
  },
  {
    key: "allaccess",
    layer: 1,
    name: "allaccessfans",
    role: "senior frontend",
    blurb: "creator dashboards, onboarding and subscription flows for a membership platform.",
    stack: "next.js · typescript · zustand",
    link: { href: "https://allaccessfans.co/", label: "allaccessfans.co" },
    shot: img("allaccess.jpg", 1100, 883),
  },
  {
    key: "zapfi",
    layer: 1,
    name: "zapfi",
    role: "lead frontend",
    blurb: "a web3 wallet. create one in seconds, then buy, send and receive. 3d onboarding story.",
    stack: "react three fiber · gsap · next.js",
    shot: img("zapfi.jpg", 1100, 781),
  },
  {
    key: "gidisquare",
    layer: 2,
    name: "gidisquare",
    role: "lead backend",
    blurb: "bookings, wallet payments and live chat. stripe, queues, sockets, admin tooling.",
    stack: "nestjs · stripe · bullmq · redis · socket.io",
    link: { href: "https://gidisquare.co.uk/", label: "gidisquare.co.uk" },
    shot: img("gidisquare.jpg", 1100, 904),
  },
  {
    key: "squad",
    layer: 2,
    name: "squad · gtco",
    role: "backend",
    blurb: "buy-now-pay-later apis inside a regulated bank. payment flows that can't be wrong.",
    stack: "payments · compliance · reliability",
    shot: { kind: "code" },
  },
  {
    key: "disux",
    layer: 3,
    name: "disux",
    role: "end to end",
    blurb: "crypto to naira exchange. kyc, live rates, instant bank payouts.",
    stack: "nestjs · mysql · next.js",
    link: { href: "https://www.disuxchange.com/", label: "disuxchange.com" },
    shot: img("disux.jpg", 1100, 796),
  },
  {
    key: "stockly",
    layer: 3,
    name: "stockly",
    role: "end to end",
    blurb: "inventory for small businesses: restock alerts, supplier lead times, bulk import.",
    stack: "postgres · prisma · next.js",
    shot: img("stockly.jpg", 1100, 748),
  },
];

export const WETINNEXT = {
  url: "https://wetinnext.com/",
  pitch:
    "wetinnext is nigeria's place to find a night, make a plan and hold a verified ticket. i started it, designed it, and built every layer: the web app, the api, ticketing and payouts.",
  why: "[why you started it, in one line]",
  facts: [
    { k: "role", v: "founder · builder" },
    { k: "built", v: "event discovery, plans, guest checkout, one-use qr tickets, phone check-in, organizer payouts" },
    { k: "cities", v: "lagos · abuja · ibadan · abeokuta · owerri · yenagoa" },
    { k: "traction", v: "[tickets sold · organizers]" },
  ],
  screens: [
    { src: "/journey/wn-phone-home.jpg", label: "home", alt: "WetinNext home on a phone: What's happening in Nigeria" },
    { src: "/journey/wn-phone-browse.jpg", label: "find your night", alt: "WetinNext browse page: Find your night" },
    { src: "/journey/wn-phone-event.jpg", label: "event + checkout", alt: "WetinNext event page with a Get tickets bar" },
  ],
};

export const HACKATHONS = [
  { result: "won", name: "mesh · ai³ hackathon", note: "ai fact-checking with tamper-evident proofs" },
  { result: "won", name: "hackops 1.0 · pipeops", note: "750+ builders · lagos · [what you built]" },
  { result: "built", name: "squad hackathon 3.0 · gtco", note: "[what you built]" },
  { result: "built", name: "squad hackathon 2.0 · gtco", note: "[what you built]" },
] as const;

export const MESH = {
  tagline: "ask it a claim. it goes and checks.",
  points: [
    "pulls live evidence from the web",
    "independent ai investigators, run through gonka router",
    "shows where they disagree instead of hiding it",
    "signs every verdict with a tamper-evident attestation",
  ],
  link: "[demo / github link]",
};

export const TRACKS = [
  { title: "big 7", mood: "gym" },
  { title: "bank on it", mood: "deploy day" },
  { title: "dangote", mood: "founder mode" },
  { title: "buy you life", mood: "after hours" },
];

export const CONTACT = {
  github: "https://github.com/benjaminnkem",
  whatsapp: "https://wa.me/2348133961439",
  email: "[your email]",
  resume: "/pdf/Benjamin_Nkem_Resume.pdf",
};

export const TICKET_QR = CONTACT.github;
