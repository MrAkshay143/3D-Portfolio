import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle, Layers, Zap, Cpu } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  icon: React.ReactNode;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, icon }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative z-20 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <div className="p-2 rounded-full bg-slate-800 border border-slate-700 group-hover:border-primary/50 transition-all">
             <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Services</span>
        </button>

        {/* Hero Header */}
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl mb-12">
           {/* Theme Glow */}
           <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -z-10 opacity-20" style={{ backgroundColor: service.color }} />
           
           <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10"
                style={{ backgroundColor: `${service.color}20`, color: service.color }}
              >
                {React.cloneElement(icon as React.ReactElement<any>, { size: 48 })}
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{service.title}</h1>
                <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">{service.details.longDescription}</p>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* Left Column: Process & Tech */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* Process Section */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Layers className="text-primary" /> Our Process
                </h3>
                
                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-800" />

                  {service.details.process.map((step, idx) => (
                    <div key={idx} className="relative pl-12 group">
                      <div 
                        className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-900 border-2 flex items-center justify-center text-sm font-bold z-10 transition-colors duration-300"
                        style={{ borderColor: service.color, color: service.color }}
                      >
                        {idx + 1}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Section */}
               <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8">
                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Cpu className="text-secondary" /> Technologies Used
                 </h3>
                 <div className="flex flex-wrap gap-3">
                    {service.details.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-mono hover:border-primary/50 hover:text-white transition-all hover:-translate-y-1"
                      >
                        {tech}
                      </span>
                    ))}
                 </div>
               </div>

           </div>

           {/* Right Column: Benefits & CTA */}
           <div className="space-y-8">
              
              {/* Benefits Card */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-slate-700 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="text-yellow-400" /> Key Benefits
                </h3>
                <ul className="space-y-4">
                  {service.details.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={18} className="mt-1 shrink-0" style={{ color: service.color }} />
                      <span className="text-slate-300 text-sm font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Box */}
              <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 text-center">
                 <h3 className="text-xl font-bold text-white mb-3">Ready to start?</h3>
                 <p className="text-slate-400 text-sm mb-6">Let's discuss how {service.title} can help your business grow.</p>
                 <a 
                   href="mailto:contact@imakshay.in"
                   className="inline-block w-full py-3 px-6 bg-primary hover:bg-indigo-600 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                 >
                   Get a Quote
                 </a>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;