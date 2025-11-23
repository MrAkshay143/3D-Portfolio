import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, MapPin, Briefcase, GraduationCap, Globe, Smartphone, FileSpreadsheet, TrendingUp, Phone, Lock, Home, User, Code, Link as LinkIcon, Cpu } from 'lucide-react';
import Background3D from './components/Background3D';
import AIChat from './components/AIChat';
import ProjectCard from './components/ProjectCard';
import HeroCodeTerminal from './components/HeroCodeTerminal';
import DeveloperIDCard from './components/DeveloperIDCard';
import ServiceCard from './components/ServiceCard';
import ServiceDetail from './components/ServiceDetail';
import SkillCircle from './components/SkillCircle';
import AdminPanel from './components/admin/AdminPanel';
import ToolsPage from './components/ToolsPage';
import { DataProvider, useData } from './contexts/DataContext';
import { SectionId, Service } from './types';

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
      className={`transition-all duration-1000 ease-out transform ${
        isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
      } ${className}`}
    >
      {children}
    </section>
  );
};

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-spring transform ${
        isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const MainContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SectionId.HOME);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isToolsView, setIsToolsView] = useState(false);
  
  // Project Filtering State
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const projectCategories = ["All Projects", "Web", "App", "Software", "Adv. Excel"];
  
  const { data } = useData();

  // Calculate experience dynamically from data
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - data.about.startYear;

  useEffect(() => {
    const handleScroll = () => {
      if (isToolsView || isAdminView || selectedService) return;
      
      const sections = Object.values(SectionId);
      for (const id of sections) {
        if (id === SectionId.TOOLS) continue; // Skip tools since it's a separate view
        
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
  }, [isToolsView, isAdminView, selectedService]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setSelectedService(null);
    setIsAdminView(false);
    setIsToolsView(false);
    
    // Need a small delay to allow view to switch back to home before scrolling
    setTimeout(() => {
       const element = document.getElementById(id);
       element?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
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

  const getNavIcon = (key?: string) => {
    if (!key) return null;
    switch(key.toLowerCase()) {
      case 'home': return <Home size={14} />;
      case 'user': return <User size={14} />;
      case 'briefcase': return <Briefcase size={14} />;
      case 'code': return <Code size={14} />;
      case 'mail': return <Mail size={14} />;
      case 'lock': return <Lock size={14} />;
      case 'link': return <LinkIcon size={14} />;
      case 'cpu': return <Cpu size={14} />;
      default: return null;
    }
  };

  const handleNavClick = (link: any) => {
    setIsMenuOpen(false);
    
    if (link.target === 'admin') {
      setIsAdminView(true);
      setIsToolsView(false);
      setSelectedService(null);
    } else if (link.target === 'tools') {
      setIsToolsView(true);
      setIsAdminView(false);
      setSelectedService(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.target.startsWith('#')) {
      scrollTo(link.target.substring(1));
    } else if (link.target.startsWith('http')) {
      window.open(link.target, '_blank');
    } else {
      // Fallback for SectionId style simple strings
      scrollTo(link.target);
    }
  };

  const filteredProjects = activeCategory === 'All Projects' 
    ? data.projects 
    : data.projects.filter(p => p.category === activeCategory);

  if (isAdminView) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold font-mono text-white cursor-pointer" onClick={() => setIsAdminView(false)}>
              {"< Back to Portfolio"}
            </div>
          </div>
        </nav>
        <AdminPanel onLogout={() => setIsAdminView(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white overflow-x-hidden text-slate-200">
      <Background3D />
      
      {/* SVG Filters for Effects */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/70 backdrop-blur-lg border-b border-white/5 supports-[backdrop-filter]:bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-mono tracking-tight hover:opacity-80 transition-opacity cursor-pointer" onClick={() => {
            setSelectedService(null);
            setIsToolsView(false);
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}>
            {"<ImAkshay />"}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {(data.navLinks || []).map((link) => {
              const isActive = (activeSection === link.target && !selectedService && !isToolsView) || 
                               (link.target === 'tools' && isToolsView);
              
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center gap-2 text-sm uppercase tracking-wider font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive ? 'text-primary scale-110' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {(link.type === 'icon' || link.type === 'both') && getNavIcon(link.iconKey)}
                  {(link.type === 'text' || link.type === 'both') && link.label}
                </button>
              );
            })}
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
             {(data.navLinks || []).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-left text-lg font-semibold text-slate-300 hover:text-primary uppercase py-2 flex items-center gap-3"
              >
                 {(link.type === 'icon' || link.type === 'both') && getNavIcon(link.iconKey)}
                 {(link.type === 'text' || link.type === 'both') && link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        
        {isToolsView ? (
          /* Tools View */
          <ToolsPage onBack={() => setIsToolsView(false)} />
        ) : selectedService ? (
          /* Detail View */
          <ServiceDetail 
            service={selectedService} 
            onBack={() => setSelectedService(null)}
            icon={getServiceIcon(selectedService.iconKey)}
          />
        ) : (
          /* Main Landing Page Views */
          <>
            {/* HERO SECTION */}
            <section id={SectionId.HOME} className="min-h-[90vh] md:min-h-0 lg:min-h-screen flex items-center pt-24 md:pt-32 md:pb-24 lg:pt-20 lg:pb-0 relative overflow-hidden w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Text Content - Order swapped on mobile to be first */}
                <div className="text-center md:text-left w-full flex flex-col items-center md:items-start order-1 md:order-none">
                  <div className="mb-4 md:mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Available for Hire
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-5 tracking-tight drop-shadow-2xl animate-fade-in-up leading-tight" style={{animationDelay: '0.2s'}}>
                    {data.hero.greeting} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">{data.hero.name}</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    {data.hero.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-4 justify-center md:justify-start items-center md:items-start animate-fade-in-up w-full md:w-auto" style={{animationDelay: '0.4s'}}>
                    <button 
                      onClick={() => scrollTo(SectionId.PROJECTS)}
                      className="px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] w-auto min-w-[160px]"
                    >
                      View Projects
                    </button>
                    <button 
                      onClick={() => scrollTo(SectionId.CONTACT)}
                      className="px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 border border-slate-600 bg-slate-900/50 backdrop-blur-sm text-white rounded-full font-bold hover:bg-slate-800 hover:border-white transition-all hover:scale-105 w-auto min-w-[160px]"
                    >
                      Contact Me
                    </button>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end w-full mt-12 md:mt-0 order-2 md:order-none">
                  <HeroCodeTerminal />
                </div>
              </div>
              
              <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
              <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10" />

              <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 opacity-50 cursor-pointer hidden md:block" onClick={() => scrollTo(SectionId.ABOUT)}>
                <ChevronDown size={32} />
              </div>
            </section>

            {/* ABOUT SECTION */}
            <AnimatedSection id={SectionId.ABOUT} className="py-20 md:py-10 lg:py-14 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="relative bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 lg:p-12 overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10"></div>

                  <div className="grid md:grid-cols-12 gap-8 md:gap-8 lg:gap-16 items-center">
                    
                    {/* Left: ID Card (5 cols) */}
                    <div className="md:col-span-5 flex justify-center order-1">
                      <DeveloperIDCard 
                        name={data.hero.name} 
                        role={data.hero.role} 
                        profileImage={data.about.profileImage}
                      />
                    </div>

                    {/* Right: Content Details (7 cols) */}
                    <div className="md:col-span-7 order-2 space-y-6 md:space-y-6">
                      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 flex items-center gap-3">
                          <span className="w-2 h-8 bg-secondary rounded-full"></span>
                          About Me
                        </h2>
                        
                        <div className="text-base md:text-base lg:text-lg leading-relaxed mb-6 md:mb-6">
                            <p className="text-slate-300 mb-4 md:mb-4">
                              {data.about.bio}
                            </p>
                            <p className="text-slate-400 text-sm md:text-sm lg:text-base">
                              {data.about.subBio}
                            </p>
                        </div>
                            
                        <div className="grid sm:grid-cols-2 gap-4 md:gap-4 lg:gap-6 mb-6 md:mb-6">
                          <div className="flex items-start gap-3 md:gap-4">
                            <div className="p-2 md:p-3 rounded-lg bg-slate-800/50 text-primary border border-slate-700">
                              <MapPin size={20} className="w-5 h-5 md:w-5 md:h-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1">Location</h4>
                              <p className="text-slate-400 text-xs md:text-sm">{data.about.location}</p>
                            </div>
                          </div>

                           <div className="flex items-start gap-3 md:gap-4">
                            <div className="p-2 md:p-3 rounded-lg bg-slate-800/50 text-secondary border border-slate-700">
                              <Briefcase size={20} className="w-5 h-5 md:w-5 md:h-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1">Experience</h4>
                              <p className="text-slate-400 text-xs md:text-sm">{experienceYears}+ Years Full Stack</p>
                            </div>
                          </div>

                           <div className="flex items-start gap-3 md:gap-4">
                            <div className="p-2 md:p-3 rounded-lg bg-slate-800/50 text-yellow-400 border border-slate-700">
                              <GraduationCap size={20} className="w-5 h-5 md:w-5 md:h-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1">Education</h4>
                              <p className="text-slate-400 text-xs md:text-sm">{data.about.education}</p>
                            </div>
                          </div>

                           <div className="flex items-start gap-3 md:gap-4">
                            <div className="p-2 md:p-3 rounded-lg bg-slate-800/50 text-purple-400 border border-slate-700">
                              <Phone size={20} className="w-5 h-5 md:w-5 md:h-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1">Contact</h4>
                              <p className="text-slate-400 text-xs md:text-sm">{data.about.phone}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-nowrap gap-3 px-1 md:px-0 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                          <a href={data.about.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1 shadow-lg">
                            <Github size={18}/> <span className="font-medium text-sm">GitHub</span>
                          </a>
                          <a href={data.about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-secondary/50 hover:text-secondary transition-all hover:-translate-y-1 shadow-lg">
                            <Linkedin size={18}/> <span className="font-medium text-sm">LinkedIn</span>
                          </a>
                          <a href={`mailto:${data.about.email}`} className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition-all hover:-translate-y-1 shadow-lg">
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
            <AnimatedSection id={SectionId.SERVICES} className="py-20 md:py-10 lg:py-14 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-8 lg:mb-12 transition-transform duration-500 hover:scale-[1.02] cursor-default">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 inline-flex items-center gap-3 group flex-wrap justify-center">
                      <span className="w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#6366f1] group-hover:w-12 transition-all duration-300"></span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:from-primary group-hover:to-secondary transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">Our Services</span>
                      <span className="w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#6366f1] group-hover:w-12 transition-all duration-300"></span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto group-hover:text-slate-300 transition-colors text-sm md:text-base">Comprehensive digital solutions designed to elevate your business.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3 lg:gap-4">
                  {data.services.map((service, idx) => (
                    <ScrollReveal key={idx} delay={idx * 100}>
                      <ServiceCard 
                        service={service} 
                        icon={getServiceIcon(service.iconKey)}
                        onClick={() => setSelectedService(service)}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* PROJECTS SECTION */}
            <AnimatedSection id={SectionId.PROJECTS} className="py-20 md:py-10 lg:py-14 px-4 sm:px-6 relative">
              {/* Colorful Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 blur-[100px] -z-10 pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                 <div className="text-center mb-8 md:mb-8 lg:mb-12">
                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 inline-flex items-center gap-3 flex-wrap justify-center">
                      <span className="w-8 h-1 bg-secondary rounded-full shadow-[0_0_10px_#ec4899]"></span>
                      Featured Projects
                      <span className="w-8 h-1 bg-secondary rounded-full shadow-[0_0_10px_#ec4899]"></span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mb-8">A selection of my recent work utilizing modern web technologies.</p>
                    
                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {projectCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                            activeCategory === category 
                              ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                              : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                 </div>
                
                {activeCategory === 'All Projects' ? (
                  <div className="relative w-full overflow-hidden mask-gradient-sides">
                    <div className="flex w-max animate-scroll hover:[animation-play-state:paused] py-4 pl-4 will-change-transform">
                      {[...data.projects, ...data.projects].map((project, idx) => (
                        <div key={`${project.id}-${idx}`} className="w-[280px] md:w-[320px] lg:w-[360px] h-[450px] flex-shrink-0 mr-6 md:mr-8">
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 min-h-[400px]">
                    {filteredProjects.map((project, idx) => (
                      <ScrollReveal key={project.id} delay={idx * 150}>
                        <div className="h-[500px]">
                           <ProjectCard project={project} />
                        </div>
                      </ScrollReveal>
                    ))}
                    {filteredProjects.length === 0 && (
                      <div className="col-span-full text-center py-20 text-slate-500">
                        No projects found in this category.
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            </AnimatedSection>

            {/* CONTACT SECTION */}
            <AnimatedSection id={SectionId.CONTACT} className="py-20 md:py-10 lg:py-14 px-4 sm:px-6 mb-10 md:mb-12 lg:mb-16">
               <div className="max-w-7xl mx-auto">
                 <div className="grid md:grid-cols-2 gap-8 md:gap-6 lg:gap-24">
                    
                    {/* LEFT COLUMN - CONTACT FORM */}
                    <ScrollReveal delay={0}>
                      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 md:p-6 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                        
                        <div className="mb-6 md:mb-6 lg:mb-8 text-center lg:text-left">
                          <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-2">
                            Contact Me
                          </h2>
                          <p className="text-slate-400 text-sm tracking-widest uppercase font-mono">Get in touch with me</p>
                        </div>

                        <form className="space-y-4 md:space-y-4 lg:space-y-5" onSubmit={(e) => e.preventDefault()}>
                          <div className="grid grid-cols-2 gap-4 md:gap-4 lg:gap-5">
                            <div className="space-y-2">
                              <input type="text" placeholder="First Name" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600 text-sm md:text-base" />
                            </div>
                            <div className="space-y-2">
                              <input type="text" placeholder="Last Name" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600 text-sm md:text-base" />
                            </div>
                          </div>
                          
                          <div>
                            <input type="email" placeholder="Email" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600 text-sm md:text-base" />
                          </div>
                          
                          <div>
                            <input type="text" placeholder="Subject" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600 text-sm md:text-base" />
                          </div>

                          <div>
                            <textarea rows={5} placeholder="Your Message" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-600 resize-none text-sm md:text-base" />
                          </div>

                          <button className="bg-gradient-to-r from-secondary to-pink-600 text-white font-bold py-3 md:py-3 lg:py-4 px-6 md:px-6 lg:px-8 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all hover:-translate-y-1 active:scale-95 w-auto inline-block text-sm md:text-base">
                            Send Message
                          </button>
                        </form>
                      </div>
                    </ScrollReveal>

                    {/* RIGHT COLUMN - SKILLS */}
                    <ScrollReveal delay={200}>
                      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 md:p-6 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

                        <div className="mb-8 md:mb-8 lg:mb-12 text-center">
                          <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-2">
                            My Skills
                          </h2>
                          <p className="text-slate-400 text-sm tracking-widest uppercase font-mono">Let me help you</p>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 md:gap-y-8 lg:gap-y-12 gap-x-6 md:gap-x-4 lg:gap-x-8 w-full max-w-md mx-auto">
                            {data.skills.map((skill, index) => (
                              <ScrollReveal key={index} delay={index * 100}>
                                <SkillCircle 
                                  key={index}
                                  id={index}
                                  title={skill.name} 
                                  percentage={skill.level} 
                                />
                              </ScrollReveal>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                 </div>
               </div>
            </AnimatedSection>
          </>
        )}

        {/* Footer */}
        <footer className="bg-slate-950 py-8 md:py-8 lg:py-12 border-t border-white/5 text-center text-slate-500 text-xs md:text-sm relative z-20">
          <p>{data.footer.text}</p>
        </footer>

      </main>

      <AIChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}

export default App;