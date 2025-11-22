import { Project, Skill, Service } from './types';

export const DEVELOPER_NAME = "Alex Dev";
export const DEVELOPER_ROLE = "Senior Full Stack Engineer";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Analytics Dashboard",
    description: "A real-time analytics dashboard for e-commerce platforms visualizing sales trends, user demographics, and inventory status using D3.js and React.",
    techStack: ["React", "TypeScript", "D3.js", "Node.js", "Socket.io"],
    image: "https://picsum.photos/600/400?random=1",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "SaaS application leveraging LLMs to help marketers generate blog posts and social media captions. Features a rich text editor and multi-language support.",
    techStack: ["Next.js", "Python", "FastAPI", "Gemini API", "Tailwind"],
    image: "https://picsum.photos/600/400?random=2",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "Decentralized Voting System",
    description: "Blockchain-based voting application ensuring transparency and security for community governance proposals.",
    techStack: ["Solidity", "React", "Web3.js", "Ethereum"],
    image: "https://picsum.photos/600/400?random=3",
    demoUrl: "#",
    repoUrl: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "Web Development", level: 95, category: "Frontend" },
  { name: "App Development", level: 90, category: "Frontend" },
  { name: "Advanced Excel", level: 88, category: "Tools" },
  { name: "Software Dev", level: 85, category: "Backend" },
  { name: "Digital Marketing", level: 80, category: "Tools" },
];

export const SERVICES_DATA: Service[] = [
  {
    title: "App Development",
    description: "User-centric mobile apps with robust backend integration.",
    iconKey: "app",
    features: ["iOS & Android Native", "Cross-Platform Solutions", "User-Centric UI/UX"],
    color: "#6366f1" // Indigo
  },
  {
    title: "Web Development",
    description: "High-performance, scalable websites and e-commerce platforms.",
    iconKey: "web",
    features: ["Responsive Design", "SEO Optimized Architecture", "High-Performance SPA"],
    color: "#ec4899" // Pink
  },
  {
    title: "Excel Solutions",
    description: "Automated reporting tools and interactive data dashboards.",
    iconKey: "excel",
    features: ["Automated Reporting", "VBA & Macro Scripting", "Interactive Dashboards"],
    color: "#10b981" // Emerald
  },
  {
    title: "Digital Marketing",
    description: "Data-driven SEO and social strategies to boost visibility.",
    iconKey: "marketing",
    features: ["SEO & Content Strategy", "Social Media Growth", "PPC Campaign Management"],
    color: "#f59e0b" // Amber
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Assistant for a portfolio website belonging to ${DEVELOPER_NAME}, a ${DEVELOPER_ROLE}.
Your goal is to answer questions about Alex's skills, experience, and projects based on the following data:

Skills: React, TypeScript, Three.js, Node.js, Python, AWS, Docker.
Projects: E-Commerce Analytics, AI Content Generator, Blockchain Voting.
Personality: Professional, enthusiastic, and technically articulate.

If a user asks for contact info, suggest they use the contact form or email alex@example.com.
Keep answers concise (under 3 sentences usually) and helpful.
`;