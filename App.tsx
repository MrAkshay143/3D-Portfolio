import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, MapPin, Briefcase, GraduationCap, Globe, Smartphone, FileSpreadsheet, TrendingUp } from 'lucide-react';
import Background3D from './components/Background3D';
import AIChat from './components/AIChat';
import ProjectCard from './components/ProjectCard';
import HeroCodeTerminal from './components/HeroCodeTerminal';
import DeveloperIDCard from './components/DeveloperIDCard';
import ServiceCard from './components/ServiceCard';
import SkillCircle from './components/SkillCircle';
import { PROJECTS, DEVELOPER_NAME, DEVELOPER_ROLE, SERVICES_DATA, SKILLS } from './constants';
import { SectionId } from './types';

// Helper for intersection observer
const useInView = (options = { threshold: 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  
  return (
    <section 
      id={id}
      ref={ref} 
      className={`transition-all duration-1000 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
    >
      {children}
    </section>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SectionId.HOME);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Trigger slightly before top hits 0
          if (rect.top >= -300 && rect.top < 500) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getServiceIcon = (key: string) => {
    switch(key) {
      case 'app': return <Smartphone size={28} />;
      case 'web': return <Globe size={28} />;
      case 'excel': return <FileSpreadsheet size={28} />;
      case 'marketing': return <TrendingUp size={28} />;
      default: return <Globe size={28} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white overflow-x-hidden text-slate-200">
      <Background3D />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/70 backdrop-blur-lg border-b border-white/5 supports-[backdrop-filter]:bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-mono tracking-tight hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {"<DevSpace />"}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {Object.values(SectionId).map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm uppercase tracking-wider font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  activeSection === id ? 'text-primary scale-110' : 'text-slate-400 hover:text-white'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 absolute w-full shadow-2xl animate-fade-in-up">
             {Object.values(SectionId).map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-lg font-semibold text-slate-300 hover:text-primary uppercase py-2"
              >
                {id}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id={SectionId.HOME} className="min-h-screen flex items-center pt-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* Left: Text Content */}
            <div className="text-left order-2 md:order-1">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Available for Hire
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl animate-fade-in-up leading-tight" style={{animationDelay: '0.2s'}}>
                Hello, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">{DEVELOPER_NAME}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                {DEVELOPER_ROLE} crafting immersive digital experiences with modern web technologies and AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <button 
                  onClick={() => scrollTo(SectionId.PROJECTS)}
                  className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  View Projects
                </button>
                <button 
                  onClick={() => scrollTo(SectionId.CONTACT)}
                  className="px-8 py-4 border border-slate-600 bg-slate-900/50 backdrop-blur-sm text-white rounded-full font-bold hover:bg-slate-800 hover:border-white transition-all hover:scale-105"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right: Code Terminal */}
            <div className="order-1 md:order-2 flex justify-center lg:justify-end w-full">
              <HeroCodeTerminal />
            </div>
          </div>
          
          {/* Background Glow Effects */}
          <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
          <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10" />

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 opacity-50 cursor-pointer" onClick={() => scrollTo(SectionId.ABOUT)}>
            <ChevronDown size={32} />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <AnimatedSection id={SectionId.ABOUT} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Whole Section Transparent Layer */}
            <div className="relative bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-16 overflow-hidden shadow-2xl">
              {/* Decorative background gradient blob */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10"></div>

              {/* Changed to md:grid-cols-12 to maintain side-by-side layout on tablets */}
              <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
                
                {/* Left: ID Card (Span 5 cols on Tablet+) */}
                <div className="md:col-span-5 flex justify-center order-1">
                  <DeveloperIDCard />
                </div>

                {/* Right: Content Details (Span 7 cols on Tablet+) */}
                <div className="md:col-span-7 order-2 space-y-8">
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-secondary rounded-full"></span>
                      About Me
                    </h2>
                    
                    <div className="text-lg leading-relaxed mb-8">
                        <p className="text-slate-300 mb-6">
                          I specialize in building scalable, high-performance web applications. With deep expertise in both frontend aesthetics and backend logic, I bridge the gap between design and engineering.
                        </p>
                        <p className="text-slate-400 text-base">
                          My approach combines technical precision with creative problem-solving, ensuring every project not only functions perfectly but also provides an engaging user experience.
                        </p>
                    </div>
                        
                    {/* Icon Bullets */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-slate-800/50 text-primary border border-slate-700">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Location</h4>
                          <p className="text-slate-400 text-sm">San Francisco, CA</p>
                        </div>
                      </div>

                       <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-slate-800/50 text-secondary border border-slate-700">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Experience</h4>
                          <p className="text-slate-400 text-sm">5+ Years Full Stack</p>
                        </div>
                      </div>

                       <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-slate-800/50 text-yellow-400 border border-slate-700">
                          <GraduationCap size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Education</h4>
                          <p className="text-slate-400 text-sm">M.S. Computer Science</p>
                        </div>
                      </div>

                       <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-slate-800/50 text-purple-400 border border-slate-700">
                          <Globe size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Focus</h4>
                          <p className="text-slate-400 text-sm">Scalable Architecture</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a href="#" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1 shadow-lg">
                        <Github size={18}/> <span className="font-medium text-sm">GitHub</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-secondary/50 hover:text-secondary transition-all hover:-translate-y-1 shadow-lg">
                        <Linkedin size={18}/> <span className="font-medium text-sm">LinkedIn</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition-all hover:-translate-y-1 shadow-lg">
                        <Mail size={18}/> <span className="font-medium text-sm">Email</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* SERVICES SECTION */}
        <AnimatedSection id={SectionId.SERVICES} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 transition-transform duration-500 hover:scale-[1.02] cursor-default">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-flex items-center gap-3 group">
                  <span className="w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#6366f1] group-hover:w-12 transition-all duration-300"></span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:from-primary group-hover:to-secondary transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">Our Services</span>
                  <span className="w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#6366f1] group-hover:w-12 transition-all duration-300"></span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto group-hover:text-slate-300 transition-colors">Comprehensive digital solutions designed to elevate your business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SERVICES_DATA.map((service, idx) => (
                <ServiceCard 
                  key={idx} 
                  service={service} 
                  icon={getServiceIcon(service.iconKey)} 
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* PROJECTS SECTION */}
        <AnimatedSection id={SectionId.PROJECTS} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary rounded-full shadow-[0_0_10px_#ec4899]"></span>
                  Featured Projects
                  <span className="w-8 h-1 bg-secondary rounded-full shadow-[0_0_10px_#ec4899]"></span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">A selection of my recent work utilizing modern web technologies.</p>
             </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CONTACT SECTION */}
        <AnimatedSection id={SectionId.CONTACT} className="py-20 px-6 mb-20">
           <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
                
                {/* LEFT COLUMN - CONTACT FORM */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                  
                  <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-2">
                      Contact Me
                    </h2>
                    <p className="text-slate-400 text-sm tracking-widest uppercase font-mono">Get in touch with me</p>
                  </div>

                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <input type="text" placeholder="First Name" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600" />
                      </div>
                      <div className="space-y-2">
                        <input type="text" placeholder="Last Name" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600" />
                      </div>
                    </div>
                    
                    <div>
                       <input type="email" placeholder="Email" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600" />
                    </div>
                    
                    <div>
                       <input type="text" placeholder="Subject" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600" />
                    </div>

                    <div>
                       <textarea rows={5} placeholder="Your Message" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600 resize-none" />
                    </div>

                    <button className="bg-gradient-to-r from-secondary to-pink-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all hover:-translate-y-1 active:scale-95 w-auto inline-block">
                      Send Message
                    </button>
                  </form>
                </div>

                {/* RIGHT COLUMN - SKILLS */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

                  <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-2">
                      My Skills
                    </h2>
                    <p className="text-slate-400 text-sm tracking-widest uppercase font-mono">Let me help you</p>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8 w-full max-w-md mx-auto">
                       {SKILLS.map((skill, index) => (
                         <SkillCircle 
                           key={index}
                           id={index}
                           title={skill.name} 
                           percentage={skill.level} 
                         />
                       ))}
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="bg-slate-950 py-12 border-t border-white/5 text-center text-slate-500 text-sm relative z-20">
          <p>&copy; {new Date().getFullYear()} DevSpace. Built with React, Three.js & Gemini.</p>
        </footer>

      </main>

      <AIChat />
    </div>
  );
};

export default App;