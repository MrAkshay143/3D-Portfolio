
import React, { createContext, useState, useEffect, useContext } from 'react';
import { PortfolioData, DataContextType } from '../types';
import { PROJECTS, SERVICES_DATA, SKILLS, DEVELOPER_NAME, DEVELOPER_ROLE, START_YEAR, SYSTEM_INSTRUCTION } from '../constants';

const INITIAL_DATA: PortfolioData = {
  hero: {
    greeting: "Hello, I'm",
    name: DEVELOPER_NAME,
    role: DEVELOPER_ROLE,
    description: `${DEVELOPER_ROLE} crafting immersive digital experiences with modern web technologies and AI.`
  },
  heroCode: {
    speed: 10,
    files: [
      {
        id: 'file-1',
        name: 'index.html',
        lang: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ImAkshay</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app">
      <h1 class="hero-title">Hello World</h1>
      <div class="loader"></div>
    </div>
    <script src="script.js"></script>
  </body>
</html>`
      },
      {
        id: 'file-2',
        name: 'style.css',
        lang: 'css',
        content: `:root {
  --primary: #6366f1;
  --bg: #0f172a;
}

.hero-title {
  font-size: 4rem;
  background: linear-gradient(to right, #fff, #6366f1);
  -webkit-background-clip: text;
  color: transparent;
  animation: fadeIn 1s ease-in;
}

.loader {
  border: 4px solid var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}`
      },
      {
        id: 'file-3',
        name: 'script.js',
        lang: 'javascript',
        content: `const app = document.getElementById('app');
const title = document.querySelector('.hero-title');

const init = async () => {
  console.log("Initializing ImAkshay...");
  
  await new Promise(r => setTimeout(r, 1000));
  
  title.innerText = "${DEVELOPER_NAME}";
  title.classList.add('active');
  
  return {
    status: 'Ready',
    version: '2.0.0'
  };
};

init();`
      }
    ]
  },
  about: {
    bio: "I specialize in building scalable, high-performance web applications. With deep expertise in both frontend aesthetics and backend logic, I bridge the gap between design and engineering.",
    subBio: "My approach combines technical precision with creative problem-solving, ensuring every project not only functions perfectly but also provides an engaging user experience.",
    location: "West Bengal, India",
    startYear: START_YEAR,
    education: "M.S. Computer Science",
    phone: "+91 9732004563",
    githubUrl: "https://github.com/MrAkshay143/",
    linkedinUrl: "https://www.linkedin.com/in/mrakshay/",
    email: "contact@imakshay.in",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  services: SERVICES_DATA,
  projects: PROJECTS,
  skills: SKILLS,
  navLinks: [
    { id: 'home', label: 'Home', type: 'text', target: 'home', iconKey: 'home' },
    { id: 'about', label: 'About', type: 'text', target: 'about', iconKey: 'user' },
    { id: 'services', label: 'Services', type: 'text', target: 'services', iconKey: 'briefcase' },
    { id: 'projects', label: 'Projects', type: 'text', target: 'projects', iconKey: 'code' },
    { id: 'tools', label: 'Tools', type: 'text', target: 'tools', iconKey: 'cpu' },
    { id: 'contact', label: 'Contact', type: 'text', target: 'contact', iconKey: 'mail' },
    { id: 'admin', label: 'Admin', type: 'both', target: 'admin', iconKey: 'lock' },
  ],
  tools: [
    {
      id: 'tool-1',
      title: "Sales Calculator",
      iconKey: "calculator",
      features: ["Enter sale weight and rate", "Auto-calculate collection value", "Options: Calc, Save, Share, TCS"],
      link: "https://imakshay.in/onlineservices/calculator/sales_calculator_pro/",
      color: "#3b82f6"
    },
    {
      id: 'tool-2',
      title: "COP Calculator",
      iconKey: "calculator",
      features: ["Input essential production metrics", "Auto-compute production costs", "Accurate farm insights provided"],
      link: "https://imakshay.in/onlineservices/calculator/cop/",
      color: "#10b981"
    },
    {
      id: 'tool-3',
      title: "File Encryptor",
      iconKey: "filelock",
      features: ["Convert file to binary code", "Password-protect your file", "Export HTML for decryption"],
      link: "https://imakshay.in/onlineservices/file_smuggling/",
      color: "#f43f5e"
    },
    {
      id: 'tool-4',
      title: "YourPlay",
      iconKey: "youtube",
      features: ["Stream YouTube videos ad-free", "Enjoy smooth, uninterrupted play", "Modern video streaming experience"],
      link: "https://play.yourcart.in/",
      color: "#ef4444"
    },
    {
      id: 'tool-5',
      title: "JPG to PNG Converter",
      iconKey: "image",
      features: ["Convert JPG images to PNG", "High-quality, lossless output", "Drag, drop, and convert fast"],
      link: "https://imakshay.in/onlineservices/jpgtopng",
      color: "#8b5cf6"
    },
    {
      id: 'tool-6',
      title: "Image to PDF Converter",
      iconKey: "filetext",
      features: ["Merge images into one PDF", "Ideal for reports and invoices", "Fast, secure, free conversion"],
      link: "https://imakshay.in/onlineservices/imagetopdf",
      color: "#f59e0b"
    },
    {
      id: 'tool-7',
      title: "PAN-Aadhaar Checker",
      iconKey: "usercheck",
      features: ["Verify PAN-Aadhaar link fast", "Avoid penalties effortlessly", "Secure, government-approved tool"],
      link: "https://imakshay.in/onlineservices/check_pan_aadhaar_link_status/",
      color: "#06b6d4"
    },
    {
      id: 'tool-8',
      title: "LoveChat",
      iconKey: "messagecircle",
      features: ["Live chat with synced video", "Seamless real-time interaction", "Modern, interactive messaging"],
      link: "https://imakshay.in/lovechat/",
      color: "#ec4899"
    },
    {
      id: 'tool-9',
      title: "YourChat / VCall",
      iconKey: "video",
      features: ["Encrypted, secure peer calls", "Send attachments and audio", "Crystal clear video calling"],
      link: "https://imakshay.in/yourchat/",
      color: "#8b5cf6"
    }
  ],
  toolSections: [
    {
      id: "section-1",
      title: "Advanced Excel",
      src: "https://imakshay.in/advanced_excel_files/",
      height: "500px",
      order: 1
    },
    {
      id: "section-2",
      title: "Discover Our Software",
      src: "https://imakshay.in/soft/",
      height: "600px",
      order: 2
    },
    {
      id: "section-3",
      title: "Discover Our Apps",
      src: "https://imakshay.in/app/",
      height: "600px",
      order: 3
    }
  ],
  footer: {
    text: `© ${new Date().getFullYear()} ${DEVELOPER_NAME}. All rights reserved. | Built with React & Three.js`
  },
  aiConfig: {
    systemInstruction: SYSTEM_INSTRUCTION,
    modelName: "gemini-2.5-flash",
    apiKey: "" // Initialize as empty, will use process.env.API_KEY by default
  },
  adminConfig: {
    username: "admin",
    password: "ImAkshay@2025"
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure new fields exist if loading from old local storage
        if (!parsed.toolSections) parsed.toolSections = INITIAL_DATA.toolSections;
        if (!parsed.navLinks) parsed.navLinks = INITIAL_DATA.navLinks;
        if (!parsed.tools) parsed.tools = INITIAL_DATA.tools;
        if (!parsed.heroCode) parsed.heroCode = INITIAL_DATA.heroCode;
        
        // Initialize AI Config if missing
        if (!parsed.aiConfig) {
           parsed.aiConfig = INITIAL_DATA.aiConfig;
        } else {
           if (!parsed.aiConfig.modelName) parsed.aiConfig.modelName = INITIAL_DATA.aiConfig.modelName;
           if (parsed.aiConfig.apiKey === undefined) parsed.aiConfig.apiKey = "";
        }

        // Initialize Admin Config if missing or if using old default
        if (!parsed.adminConfig || (parsed.adminConfig.password === 'admin' && INITIAL_DATA.adminConfig.password !== 'admin')) {
             parsed.adminConfig = INITIAL_DATA.adminConfig;
        }
        
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolioData', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(INITIAL_DATA);
    localStorage.removeItem('portfolioData');
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
