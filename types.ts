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
  CONTACT = 'contact'
}