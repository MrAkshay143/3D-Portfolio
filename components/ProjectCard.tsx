import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
      <div className="h-48 md:h-40 lg:h-48 overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
      </div>
      
      <div className="p-6 md:p-4 lg:p-6 relative">
        <h3 className="text-xl md:text-lg lg:text-xl font-bold text-white mb-2 font-sans group-hover:text-primary transition-colors truncate">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 md:mb-3 lg:mb-4 h-20 md:h-16 lg:h-20 overflow-hidden line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 md:mb-4 lg:mb-6 h-auto md:h-16 lg:h-auto overflow-hidden">
          {project.techStack.map((tech, index) => (
            <span 
              key={tech} 
              className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-700/50 text-primary border border-primary/20 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:scale-105 cursor-default"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
          {project.demoUrl && (
            <a href={project.demoUrl} className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors group/link">
              <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group/link">
              <Github size={16} className="group-hover/link:scale-110 transition-transform" /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;