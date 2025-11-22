import React, { useState, useEffect, useMemo } from 'react';
import { FileCode, FileType, Code2 } from 'lucide-react';

interface FileData {
  name: string;
  lang: 'html' | 'css' | 'javascript';
  icon: React.ReactNode;
  content: string;
}

const FILES: FileData[] = [
  {
    name: 'index.html',
    lang: 'html',
    icon: <Code2 size={14} className="text-orange-500" />,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>DevSpace</title>
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
    name: 'style.css',
    lang: 'css',
    icon: <FileType size={14} className="text-blue-400" />,
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
    name: 'script.js',
    lang: 'javascript',
    icon: <FileCode size={14} className="text-yellow-400" />,
    content: `const app = document.getElementById('app');
const title = document.querySelector('.hero-title');

const init = async () => {
  console.log("Initializing DevSpace...");
  
  await new Promise(r => setTimeout(r, 1000));
  
  title.innerText = "Alex Dev";
  title.classList.add('active');
  
  return {
    status: 'Ready',
    version: '2.0.0'
  };
};

init();`
  }
];

const getSyntaxColor = (word: string, lang: string): string => {
  // HTML Highlighting
  if (lang === 'html') {
    if (word.startsWith('<') || word.startsWith('</') || word.endsWith('>')) return 'text-pink-400'; // Tags
    if (word.includes('=')) return 'text-blue-300'; // Attributes (rough approx)
    if (word.startsWith('"') || word.endsWith('"')) return 'text-green-400'; // Strings
    return 'text-slate-300';
  }
  
  // CSS Highlighting
  if (lang === 'css') {
    if (word.startsWith('.') || word.startsWith('#')) return 'text-yellow-400'; // Selectors
    if (word.endsWith(':')) return 'text-blue-300'; // Properties
    if (word.includes('px') || word.includes('rem') || word.includes('%') || word.startsWith('#')) return 'text-green-400'; // Values
    return 'text-slate-300';
  }

  // JS Highlighting
  if (lang === 'javascript') {
    if (['const', 'let', 'var', 'function', 'return', 'async', 'await', 'new', 'class'].includes(word)) return 'text-pink-400 font-bold';
    if (['console', 'document', 'window', 'Promise', 'setTimeout'].includes(word.replace('.', ''))) return 'text-blue-400';
    if (word.startsWith('"') || word.startsWith("'") || word.endsWith('"') || word.endsWith("'")) return 'text-green-400';
    if (word.match(/^[0-9]+$/)) return 'text-orange-400';
    if (word.includes('=>') || word.includes('=')) return 'text-purple-400';
    if (word.includes('(') || word.includes(')') || word.includes('{') || word.includes('}')) return 'text-yellow-400';
    return 'text-slate-300';
  }

  return 'text-slate-300';
};

const HeroCodeTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeFile = FILES[activeTab];

  // Tokenize content for syntax highlighting
  const tokens = useMemo(() => {
    // Split by common delimiters while keeping them for JS/CSS/HTML structure
    const rawTokens = activeFile.content.split(/(\s+|[<>/=:";(){}[\],.]|(?<=\w)(?=\W)|(?<=\W)(?=\w))/g).filter(Boolean);
    return rawTokens.map((token) => ({
      text: token,
      color: getSyntaxColor(token.trim(), activeFile.lang)
    }));
  }, [activeFile]);

  // Flatten to char array for typing animation
  const charArray = useMemo(() => {
    return tokens.flatMap(token => 
      token.text.split('').map(char => ({ char, color: token.color }))
    );
  }, [tokens]);

  // Typing & Auto-switch Logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (visibleChars < charArray.length) {
      // Typing speed
      timeout = setTimeout(() => {
        setVisibleChars(prev => prev + 3); // Type 3 chars per tick for speed
      }, 10); 
    } else if (isAutoPlaying) {
      // Wait before switching tab
      timeout = setTimeout(() => {
        setActiveTab(prev => (prev + 1) % FILES.length);
        setVisibleChars(0);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [visibleChars, charArray.length, isAutoPlaying]);

  const handleTabClick = (index: number) => {
    setIsAutoPlaying(false); // Stop auto-rotation on manual interaction
    setActiveTab(index);
    setVisibleChars(0); // Restart typing for the clicked tab
  };

  return (
    <div className="relative w-full max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
      
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[400px] transition-all duration-500">
        
        {/* Window Header & Tabs */}
        <div className="bg-slate-950 border-b border-slate-800 flex items-center px-4 pt-2 select-none">
           {/* Window Controls */}
           <div className="flex gap-2 mr-4 pb-2 self-center shrink-0">
             <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
             <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
           </div>
           
           {/* Tabs */}
           <div className="flex flex-1 overflow-x-auto scrollbar-hide">
              {FILES.map((file, index) => (
                <button
                  key={file.name}
                  onClick={() => handleTabClick(index)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-200 rounded-t-lg mr-1 border-t border-x
                    ${activeTab === index 
                      ? 'bg-slate-900 border-slate-800 text-white border-b-transparent' 
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                    }
                  `}
                >
                  {file.icon}
                  <span className="font-mono">{file.name}</span>
                  {/* Active Tab Highlight Line */}
                  {activeTab === index && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                  )}
                </button>
              ))}
           </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 p-6 font-mono text-sm overflow-hidden bg-slate-900 relative">
          <div className="whitespace-pre-wrap leading-relaxed break-words">
            {charArray.map((item, index) => (
              <span 
                key={index} 
                className={`${item.color} transition-opacity duration-0 ${index < visibleChars ? 'opacity-100' : 'opacity-0'}`}
              >
                {item.char}
              </span>
            ))}
            <span className={`inline-block w-2 h-4 bg-primary ml-1 align-middle ${visibleChars >= charArray.length ? 'animate-pulse' : 'opacity-100'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCodeTerminal;