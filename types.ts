
export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  image: string;
  category: 'Web' | 'App' | 'Software' | 'Adv. Excel';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools';
}

export interface ServiceProcess {
  title: string;
  description: string;
}

export interface ServiceDetails {
  longDescription: string;
  process: ServiceProcess[];
  benefits: string[];
  technologies: string[];
}

export interface Service {
  title: string;
  description: string;
  iconKey: string;
  features: string[];
  color: string;
  details: ServiceDetails;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  PROJECTS = 'projects',
  CONTACT = 'contact',
  TOOLS = 'tools'
}

// Admin / Dynamic Data Types

export interface NavLink {
  id: string;
  label: string;
  type: 'text' | 'icon' | 'both';
  target: string; // Section ID (#home) or URL or 'admin'
  iconKey?: string; // Icon name map key
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  description: string;
}

export interface CodeFile {
  id: string;
  name: string;
  lang: 'html' | 'css' | 'javascript';
  content: string;
}

export interface AboutData {
  bio: string;
  subBio: string;
  location: string;
  startYear: number;
  education: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  profileImage: string;
}

export interface FooterData {
  text: string;
}

export interface Tool {
  id: string;
  title: string;
  iconKey: string;
  features: string[];
  link: string;
  color: string;
}

export interface ToolSection {
  id: string;
  title: string;
  src: string;
  height: string; // e.g. "600px"
  order: number;
}

export interface AiConfig {
  systemInstruction: string;
  modelName: string;
  apiKey?: string; // Added API Key
}

export interface AdminConfig {
  username: string;
  password: string;
}

export interface PortfolioData {
  hero: HeroData;
  heroCode: {
    files: CodeFile[];
    speed: number; // typing speed in ms
  };
  about: AboutData;
  services: Service[];
  projects: Project[];
  skills: Skill[];
  footer: FooterData;
  navLinks: NavLink[];
  tools: Tool[];
  toolSections: ToolSection[];
  aiConfig: AiConfig;
  adminConfig: AdminConfig;
}

export interface DataContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
}
