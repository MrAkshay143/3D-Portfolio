
import React, { useState, useEffect, useMemo } from 'react';
import { FileCode, FileType, Code2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

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

const getFileIcon = (lang: string) => {
    switch(lang) {
        case 'html': return <Code2 size={14} className="text-orange-500" />;
        case 'css': return <FileType size={14} className="text-blue-400" />;
        case 'javascript': return <FileCode size={14} className="text-yellow-400" />;
        default: return <FileCode size={14} className="text-slate-400" />;
    }
};

const HeroCodeTerminal: React.FC = () => {
  const { data } = useData();
  const files = data.heroCode?.files || [];
  const speed = data.heroCode?.speed || 10;
  
  const [activeTab, setActiveTab] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Safety check if no files exist
  const activeFile = files[activeTab] || { content: '', lang: 'html', name: 'untitled' };

  // Tokenize content for syntax highlighting
  const tokens = useMemo(() => {
    if (!activeFile.content) return [];
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
      // Typing speed based on dynamic setting
      timeout = setTimeout(() => {
        setVisibleChars(prev => prev + 3); // Type 3 chars per tick for speed perception
      }, speed); 
    } else if (isAutoPlaying && files.length > 1) {
      // Wait before switching tab
      timeout = setTimeout(() => {
        setActiveTab(prev => (prev + 1) % files.length);
        setVisibleChars(0);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [visibleChars, charArray.length, isAutoPlaying, files.length, speed]);

  const handleTabClick = (index: number) => {
    setIsAutoPlaying(false); // Stop auto-rotation on manual interaction
    setActiveTab(index);
    setVisibleChars(0); // Restart typing for the clicked tab
  };
  
  if (files.length === 0) return null;

  return (
    // Updated max-width to [85vw] on mobile to prevent horizontal overflow from negative margin glow
    <div className="relative w-full max-w-[85vw] sm:max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      {/* Glow Effect - Negative inset can cause overflow if parent is 100vw, hence the 85vw constraint above */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
      
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[300px] md:h-[320px] lg:h-[400px] transition-all duration-500">
        
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
              {files.map((file, index) => (
                <button
                  key={file.id || index}
                  onClick={() => handleTabClick(index)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-200 rounded-t-lg mr-1 border-t border-x
                    ${activeTab === index 
                      ? 'bg-slate-900 border-slate-800 text-white border-b-transparent' 
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                    }
                  `}
                >
                  {getFileIcon(file.lang)}
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
        <div className="flex-1 p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-hidden bg-slate-900 relative">
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
