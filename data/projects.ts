import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "machineguru",
    title: "MachineGuru",
    tagline: "An interactive ML learning platform with real-time model training and guided experiments.",
    description:
      "MachineGuru bridges the gap between ML theory and practice. Built as a full-stack web app, it lets students and self-learners train real models in the browser, step through interactive learning paths, and visualize training metrics live — no Python environment setup required.",
    content: `## Problem
Most ML learning resources are passive — watch a video, read a doc. Students struggle to go from concept to implementation without setting up complex Python environments. There was no platform that combined guided theory with real, in-browser experimentation.

## Solution
MachineGuru is a full-stack platform where every concept page is paired with a live experiment. Users can tweak hyperparameters, run training jobs via FastAPI + TensorFlow, and see loss/accuracy curves update in real time through WebSocket streaming.

## Key Features
- Guided learning paths from linear regression to neural networks
- In-browser model training with real-time loss/accuracy visualization
- Hyperparameter playground — adjust learning rate, epochs, batch size live
- PostgreSQL-backed progress tracking and experiment history
- Clean, distraction-free interface built with React

## Technical Decisions
- Chose **FastAPI** over Flask for async support and automatic OpenAPI docs
- Used **WebSockets** to stream training metrics instead of polling — reduces latency from ~2s to near-real-time
- **TensorFlow.js** considered but rejected — server-side training gave more control over larger datasets
- PostgreSQL over MongoDB for relational experiment/user data

## Result
Completed as a solo project in ~6 weeks. Successfully demonstrated real-time model training from a React frontend with zero local setup required. Used as a learning reference by peers in the CS department.

## Learnings
Learned to manage async Python processes cleanly with FastAPI's background tasks. Gained confidence with WebSocket state management on both server and client sides.`,
    tech: ["Python", "React", "FastAPI", "TensorFlow", "PostgreSQL", "WebSocket"],
    tags: ["ai-ml", "full-stack", "education"],
    links: [
      { label: "GitHub", url: "https://github.com/shlokmodanwal", icon: "github" },
    ],
    status: "completed",
    featured: true,
    date: "2024-06",
    role: "Solo Developer",
  },
  {
    slug: "bhumilekh",
    title: "Bhumilekh",
    tagline: "A digital land records system that makes property registration transparent and accessible.",
    description:
      "Bhumilekh digitizes land record management for easier property registration, verification, and ownership transfer. Designed with rural accessibility in mind, it replaces paper-heavy government workflows with a clean, searchable web interface backed by a robust Node.js API.",
    content: `## Problem
Land record management in India is fragmented — records live in physical registers, are prone to fraud, and are inaccessible to citizens without visiting government offices. There was an opportunity to digitize this process with a clean, trustworthy web interface.

## Solution
Bhumilekh is a full-stack web platform that allows citizens to search, verify, and initiate property records online. Officials can update records through a secured admin interface. All changes are logged for auditability.

## Key Features
- Property search by survey number, owner name, or plot ID
- Document upload and digital verification workflow
- Role-based access: citizen, verifier, and admin
- Full audit trail for every record change
- Responsive design for low-bandwidth rural access

## Technical Decisions
- **Next.js** for SSR — land records pages need to be indexable and fast on first load
- **MongoDB** chosen for flexible schema since land record formats vary by state
- Role-based auth implemented with JWT + middleware — not a library — to keep it lean
- Prioritized performance on slow 3G connections: images lazy-loaded, fonts subset

## Result
Functional prototype completed as a team project. Demonstrated at the college tech fest — received positive feedback from faculty advisors for practical civic impact.

## Learnings
Navigating real-world data modeling challenges where schema is inconsistent. Learned to design for low-connectivity environments and accessibility-first interfaces.`,
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    tags: ["full-stack", "government-tech", "web"],
    links: [
      { label: "GitHub", url: "https://github.com/shlokmodanwal", icon: "github" },
    ],
    status: "completed",
    featured: true,
    date: "2024-03",
    role: "Lead Developer",
  },
  {
    slug: "madhur-bahar",
    title: "Madhur Bahar",
    tagline: "A full-stack e-commerce platform for artisanal food products with a seller dashboard.",
    description:
      "Madhur Bahar is a niche e-commerce platform connecting artisan food producers with consumers. It features a polished storefront, Stripe-powered checkout, order tracking, and a dedicated seller dashboard — all built on Next.js with a PostgreSQL backend.",
    content: `## Problem
Small artisan food sellers in India have no good platform to sell online — they're stuck on generic marketplaces with no brand identity. Madhur Bahar gives them a dedicated, branded storefront.

## Solution
A full-featured e-commerce platform with a consumer-facing storefront and a seller dashboard. Sellers manage inventory and orders; customers browse, filter, and checkout with Stripe. Emails are sent on order events via Resend.

## Key Features
- Product catalog with category filtering and search
- Stripe Checkout integration with webhook-based order fulfillment
- Seller dashboard: inventory management, order status updates
- Transactional email notifications for order placed / shipped
- Prisma ORM with PostgreSQL — type-safe queries end-to-end

## Technical Decisions
- **Prisma + PostgreSQL** over a simpler NoSQL setup — relational integrity matters for order/product/user relationships
- **Stripe Webhooks** for reliable post-payment state — avoids race conditions from client-side redirect handling
- Next.js App Router with Server Actions for form submissions — reduced client JS bundle size
- Focused on mobile-first design since target customers primarily use smartphones

## Result
Fully functional e-commerce platform deployed on Vercel. Supports end-to-end purchase flow from product browse to post-order email confirmation.

## Learnings
Stripe webhook handling edge cases (duplicate events, retries). Learned to design a seller-facing dashboard UX that is simple enough for non-technical users.`,
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Resend"],
    tags: ["full-stack", "e-commerce", "web"],
    links: [
      { label: "GitHub", url: "https://github.com/shlokmodanwal", icon: "github" },
    ],
    status: "completed",
    featured: true,
    date: "2023-12",
    role: "Full Stack Developer",
  },
  {
    slug: "nexsus",
    title: "Nexsus",
    tagline: "A developer-first project management tool with real-time collaboration and code-review workflows.",
    description:
      "Nexsus is a distraction-free alternative to heavy tools like Jira. It's built for developers who want tight GitHub integration, real-time team presence, and fast keyboard-driven navigation — without the bloat.",
    content: `## Problem
Existing project management tools (Jira, Linear, Trello) are either too bloated, too expensive, or too disconnected from how developers actually work — in their terminal and editor, not clicking through 12 menus.

## Solution
Nexsus is a minimal, developer-centric PM tool. Issues are plain text. Assignments update in real-time via WebSocket. GitHub PRs can be linked directly to issues. The interface is keyboard-first and loads in under 1 second.

## Key Features
- Real-time presence indicators and issue updates via WebSocket
- GitHub PR ↔ Issue linking
- Keyboard-first navigation (j/k to move, / to search)
- Redis-backed job queue for async background tasks (notifications, PR sync)
- Dockerized for self-hosting

## Technical Decisions
- **WebSocket over Server-Sent Events** — bidirectional is needed for presence updates
- **Redis** as pub/sub broker between server instances — scales horizontally without a central bottleneck
- **Docker Compose** setup so teams can self-host without vendor lock-in
- Intentionally avoided a UI framework like MUI — custom components keep the bundle lean

## Status
Actively in development. Core issue tracking, real-time presence, and GitHub PR linking are functional. Notifications and mobile view in progress.

## Learnings
Managing WebSocket connection state across React re-renders without memory leaks. Learning Docker networking for multi-container setups.`,
    tech: ["React", "Node.js", "WebSocket", "Redis", "Docker", "PostgreSQL"],
    tags: ["full-stack", "developer-tools", "web"],
    links: [
      { label: "GitHub", url: "https://github.com/shlokmodanwal", icon: "github" },
    ],
    status: "in-progress",
    featured: true,
    date: "2024-09",
    role: "Creator & Lead Developer",
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const allProjectTags = [...new Set(projects.flatMap((p) => p.tags))];
