import { Project, Skill, Service } from './types';

export const DEVELOPER_NAME = "Akshay Mondal";
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
    color: "#6366f1", // Indigo
    details: {
      longDescription: "We transform innovative ideas into powerful, user-friendly mobile applications. Whether you need a native iOS/Android app or a cost-effective cross-platform solution using React Native or Flutter, our development process ensures high performance, security, and scalability. We focus on creating intuitive interfaces that drive user engagement and retention.",
      process: [
        { title: "Discovery & Strategy", description: "We analyze your market, target audience, and business goals to define the app's core functionality and roadmap." },
        { title: "UI/UX Design", description: "Crafting wireframes and interactive prototypes to ensure a seamless and engaging user experience before coding begins." },
        { title: "Agile Development", description: "Iterative coding sprints with regular feedback loops, ensuring the product evolves to meet your exact needs." },
        { title: "Testing & Launch", description: "Rigorous QA testing on multiple devices followed by a smooth deployment to the App Store and Play Store." }
      ],
      benefits: [
        "Increased Customer Engagement",
        "Direct Marketing Channel",
        "Brand Recognition",
        "Offline Accessibility"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js Mobile"]
    }
  },
  {
    title: "Web Development",
    description: "High-performance, scalable websites and e-commerce platforms.",
    iconKey: "web",
    features: ["Responsive Design", "SEO Optimized Architecture", "High-Performance SPA"],
    color: "#ec4899", // Pink
    details: {
      longDescription: "Our web development services focus on building lightning-fast, secure, and scalable web applications. From simple corporate websites to complex Progressive Web Apps (PWAs) and enterprise SaaS platforms, we utilize modern frameworks like Next.js and React to deliver superior digital experiences that rank high on search engines and convert visitors into customers.",
      process: [
        { title: "Architecture Planning", description: "Defining the tech stack and database structure to ensure scalability and security from day one." },
        { title: "Frontend Development", description: "Building responsive, accessible, and pixel-perfect interfaces using modern libraries like React and Tailwind CSS." },
        { title: "Backend Integration", description: "Developing robust APIs and server-side logic to handle data processing and third-party integrations." },
        { title: "Optimization & SEO", description: "Fine-tuning performance metrics (Core Web Vitals) and structure for maximum search engine visibility." }
      ],
      benefits: [
        "Global Reach",
        "24/7 Availability",
        "Cost-Effective Marketing",
        "Data-Driven Insights"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS"]
    }
  },
  {
    title: "Excel Solutions",
    description: "Automated reporting tools and interactive data dashboards.",
    iconKey: "excel",
    features: ["Automated Reporting", "VBA & Macro Scripting", "Interactive Dashboards"],
    color: "#10b981", // Emerald
    details: {
      longDescription: "Unlock the hidden potential of your data with our Advanced Excel Solutions. We move beyond basic spreadsheets to create powerful automated tools, VBA macros, and dynamic dashboards that save hours of manual work. We help businesses streamline operations, eliminate human error, and visualize complex datasets for better decision-making.",
      process: [
        { title: "Requirement Analysis", description: "Understanding your current data workflow and identifying bottlenecks that can be automated." },
        { title: "Data Modeling", description: "Structuring your raw data into clean, usable formats suitable for analysis and reporting." },
        { title: "Automation Scripting", description: "Writing VBA macros and Power Query scripts to automate repetitive tasks and calculations." },
        { title: "Dashboard Creation", description: "Designing interactive visual interfaces that present Key Performance Indicators (KPIs) at a glance." }
      ],
      benefits: [
        "Eliminate Manual Entry Errors",
        "Save 10+ Hours/Week",
        "Instant Reporting",
        "Visual Decision Support"
      ],
      technologies: ["MS Excel", "VBA", "Power Query", "Power Pivot", "Google Sheets API"]
    }
  },
  {
    title: "Digital Marketing",
    description: "Data-driven SEO and social strategies to boost visibility.",
    iconKey: "marketing",
    features: ["SEO & Content Strategy", "Social Media Growth", "PPC Campaign Management"],
    color: "#f59e0b", // Amber
    details: {
      longDescription: "In the digital age, visibility is everything. Our Digital Marketing services use data-driven strategies to place your brand in front of the right audience. We combine technical SEO, engaging content marketing, and targeted social media campaigns to drive organic traffic and maximize ROI. We don't just generate clicks; we generate conversions.",
      process: [
        { title: "Audit & Research", description: "Comprehensive analysis of your current online presence and competitor landscape." },
        { title: "Strategy Formulation", description: "Developing a tailored plan across SEO, Content, and Paid Media channels." },
        { title: "Execution & Content", description: "Creating high-quality content and managing campaigns to engage your audience." },
        { title: "Analytics & Refining", description: "Continuous monitoring of campaign performance and optimizing for better results." }
      ],
      benefits: [
        "Higher Conversion Rates",
        "Measurable ROI",
        "Targeted Audience Reach",
        "Improved Brand Loyalty"
      ],
      technologies: ["Google Analytics 4", "SEMrush", "Meta Ads Manager", "Mailchimp", "Google Ads"]
    }
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Assistant for a portfolio website belonging to ${DEVELOPER_NAME}, a ${DEVELOPER_ROLE}.
Your goal is to answer questions about Akshay's skills, experience, and projects based on the following data:

Skills: React, TypeScript, Three.js, Node.js, Python, AWS, Docker, Excel, Digital Marketing.
Projects: E-Commerce Analytics, AI Content Generator, Blockchain Voting.
Personality: Professional, enthusiastic, and technically articulate.

If a user asks for contact info, suggest they use the contact form or email contact@imakshay.in.
Keep answers concise (under 3 sentences usually) and helpful.
`;