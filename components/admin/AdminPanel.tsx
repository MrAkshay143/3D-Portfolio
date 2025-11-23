
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  Lock, User, Save, LogOut, RotateCcw, Plus, Trash2, X, Link as LinkIcon, Edit,
  Home, Briefcase, Code, Mail, Github, Linkedin, Smartphone, Globe, 
  FileSpreadsheet, TrendingUp, HelpCircle, Instagram, Twitter, Facebook, 
  Youtube, Monitor, Cpu, Database, Server, Calculator, FileLock, Image, FileText,
  UserCheck, MessageCircle, Video, Menu, LayoutTemplate, Terminal, Bot, Settings, Key
} from 'lucide-react';

// Icon mapping for preview and reference
const ICON_PREVIEW_MAP: Record<string, React.ReactNode> = {
  'home': <Home size={16} />,
  'user': <User size={16} />,
  'briefcase': <Briefcase size={16} />,
  'code': <Code size={16} />,
  'mail': <Mail size={16} />,
  'lock': <Lock size={16} />,
  'link': <LinkIcon size={16} />,
  'github': <Github size={16} />,
  'linkedin': <Linkedin size={16} />,
  'instagram': <Instagram size={16} />,
  'twitter': <Twitter size={16} />,
  'facebook': <Facebook size={16} />,
  'youtube': <Youtube size={16} />,
  'app': <Smartphone size={16} />,
  'web': <Globe size={16} />,
  'excel': <FileSpreadsheet size={16} />,
  'marketing': <TrendingUp size={16} />,
  'monitor': <Monitor size={16} />,
  'cpu': <Cpu size={16} />,
  'database': <Database size={16} />,
  'server': <Server size={16} />,
  // Tool specific
  'calculator': <Calculator size={16} />,
  'filelock': <FileLock size={16} />,
  'image': <Image size={16} />,
  'filetext': <FileText size={16} />,
  'usercheck': <UserCheck size={16} />,
  'messagecircle': <MessageCircle size={16} />,
  'video': <Video size={16} />,
};

const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Hero');
  // State to toggle between Card Tools and Iframe Sections in Tools tab
  const [toolsSubTab, setToolsSubTab] = useState<'cards' | 'sections'>('cards');
  
  const { data, updateData, resetData } = useData();
  const [formData, setFormData] = useState(data);

  // Sync form data with context data when context updates
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate against stored credentials (or default if not present yet)
    const storedUser = data.adminConfig?.username || 'admin';
    const storedPass = data.adminConfig?.password || 'admin';

    if (username === storedUser && password === storedPass) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleSave = () => {
    updateData(formData);
    alert('Changes saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to default? This will also reset the admin password to "admin".')) {
      resetData();
      setIsAuthenticated(false); // Force re-login
      onLogout();
    }
  };

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 relative z-50 px-4">
        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
            <p className="text-slate-400">Please authenticate to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:outline-none"
                  placeholder="admin"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:outline-none"
                  placeholder="admin"
                />
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all">
              Login
            </button>
            <button type="button" onClick={onLogout} className="w-full text-slate-500 hover:text-white text-sm">
              Back to Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  const tabs = ['Hero', 'About', 'Services', 'Projects', 'Skills', 'Navbar', 'Tools', 'Footer', 'AI', 'Settings'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative z-50 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm">Manage your portfolio content</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button onClick={handleReset} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/20 text-sm">
              <RotateCcw size={16} /> <span className="hidden sm:inline">Reset</span>
            </button>
            <button onClick={handleSave} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg font-bold text-sm">
              <Save size={16} /> Save
            </button>
            <button onClick={() => { setIsAuthenticated(false); onLogout(); }} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-sm">
              <LogOut size={16} /> Exit
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Scrollable on mobile */}
        <div className="mb-6 -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
          
          {/* ... Existing Tabs (Hero, About, etc. logic here, omitted for brevity as they are unchanged) ... */}
          {activeTab === 'Hero' && (
            /* ... Hero content logic matches original ... */
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-2">Main Content</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Greeting</label>
                    <input 
                      type="text" 
                      value={formData.hero.greeting}
                      onChange={(e) => handleChange('hero', 'greeting', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Name</label>
                    <input 
                      type="text" 
                      value={formData.hero.name}
                      onChange={(e) => handleChange('hero', 'name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Role</label>
                  <input 
                    type="text" 
                    value={formData.hero.role}
                    onChange={(e) => handleChange('hero', 'role', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Description</label>
                  <textarea 
                    rows={4}
                    value={formData.hero.description}
                    onChange={(e) => handleChange('hero', 'description', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Code Terminal Section */}
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                   <h3 className="font-bold text-lg text-white flex items-center gap-2"><Terminal size={20}/> Code Terminal Configuration</h3>
                   <button 
                    onClick={() => {
                       const newFile: any = {
                          id: `code-${Date.now()}`,
                          name: "new_file.js",
                          lang: "javascript",
                          content: "// New code snippet"
                       };
                       setFormData({
                          ...formData, 
                          heroCode: {
                            ...formData.heroCode,
                            files: [...formData.heroCode.files, newFile]
                          }
                       });
                    }}
                    className="flex items-center gap-2 text-xs bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg"
                   >
                     <Plus size={14}/> Add File
                   </button>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Typing Speed (ms per char)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range"
                      min="1" max="100"
                      value={formData.heroCode?.speed || 10}
                      onChange={(e) => {
                         setFormData({
                            ...formData,
                            heroCode: {
                              ...(formData.heroCode || { files: [] }),
                              speed: parseInt(e.target.value)
                            }
                         });
                      }}
                      className="flex-1"
                    />
                    <span className="text-sm font-mono text-white bg-slate-800 px-3 py-1 rounded">{formData.heroCode?.speed || 10}ms</span>
                  </div>
                </div>

                <div className="space-y-4">
                   {(formData.heroCode?.files || []).map((file, index) => (
                      <div key={file.id || index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                         <button 
                            onClick={() => {
                               if(confirm('Delete file?')) {
                                  const newFiles = formData.heroCode.files.filter((_, i) => i !== index);
                                  setFormData({
                                     ...formData,
                                     heroCode: {
                                        ...formData.heroCode,
                                        files: newFiles
                                     }
                                  });
                               }
                            }}
                            className="absolute top-3 right-3 p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500 hover:text-white"
                         >
                            <Trash2 size={14} />
                         </button>
                         
                         <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                               <label className="block text-xs text-slate-500 mb-1">File Name</label>
                               <input 
                                  value={file.name}
                                  onChange={(e) => {
                                     const newFiles = [...formData.heroCode.files];
                                     newFiles[index].name = e.target.value;
                                     setFormData({
                                        ...formData,
                                        heroCode: { ...formData.heroCode, files: newFiles }
                                     });
                                  }}
                                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm font-mono"
                               />
                            </div>
                            <div>
                               <label className="block text-xs text-slate-500 mb-1">Language</label>
                               <select 
                                  value={file.lang}
                                  onChange={(e) => {
                                     const newFiles = [...formData.heroCode.files];
                                     newFiles[index].lang = e.target.value as any;
                                     setFormData({
                                        ...formData,
                                        heroCode: { ...formData.heroCode, files: newFiles }
                                     });
                                  }}
                                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                               >
                                  <option value="html">HTML</option>
                                  <option value="css">CSS</option>
                                  <option value="javascript">JavaScript</option>
                               </select>
                            </div>
                         </div>
                         
                         <div>
                            <label className="block text-xs text-slate-500 mb-1">Code Content</label>
                            <textarea 
                               value={file.content}
                               onChange={(e) => {
                                  const newFiles = [...formData.heroCode.files];
                                  newFiles[index].content = e.target.value;
                                  setFormData({
                                     ...formData,
                                     heroCode: { ...formData.heroCode, files: newFiles }
                                  });
                               }}
                               className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white text-xs font-mono h-32"
                            />
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'About' && (
             /* ... About logic matches original ... */
             <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Location</label>
                  <input 
                    type="text" 
                    value={formData.about.location}
                    onChange={(e) => handleChange('about', 'location', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Phone</label>
                  <input 
                    type="text" 
                    value={formData.about.phone}
                    onChange={(e) => handleChange('about', 'phone', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Education</label>
                  <input 
                    type="text" 
                    value={formData.about.education}
                    onChange={(e) => handleChange('about', 'education', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
                 <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Start Year</label>
                  <input 
                    type="number" 
                    value={formData.about.startYear}
                    onChange={(e) => handleChange('about', 'startYear', parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Profile Image URL</label>
                <input 
                  type="text" 
                  value={formData.about.profileImage}
                  onChange={(e) => handleChange('about', 'profileImage', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Short Bio</label>
                <textarea 
                  rows={3}
                  value={formData.about.bio}
                  onChange={(e) => handleChange('about', 'bio', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Sub Bio</label>
                <textarea 
                  rows={3}
                  value={formData.about.subBio}
                  onChange={(e) => handleChange('about', 'subBio', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">GitHub URL</label>
                  <input 
                    type="text" 
                    value={formData.about.githubUrl}
                    onChange={(e) => handleChange('about', 'githubUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
                 <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">LinkedIn URL</label>
                  <input 
                    type="text" 
                    value={formData.about.linkedinUrl}
                    onChange={(e) => handleChange('about', 'linkedinUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
                 <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Email</label>
                  <input 
                    type="text" 
                    value={formData.about.email}
                    onChange={(e) => handleChange('about', 'email', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Services' && (
             /* ... Services logic matches original ... */
             <div className="space-y-6">
                {formData.services.map((service, index) => (
                  <div key={index} className="bg-slate-950 p-4 md:p-6 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                       <h3 className="font-bold text-base md:text-lg text-primary">{service.title || 'Untitled Service'}</h3>
                       <span className="text-xs text-slate-500 font-mono uppercase">Service #{index + 1}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                       <div>
                         <label className="block text-xs text-slate-500 mb-1">Service Title</label>
                         <input 
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...formData.services];
                            newServices[index].title = e.target.value;
                            setFormData({...formData, services: newServices});
                          }}
                          className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-white text-sm"
                        />
                       </div>
                       <div>
                         <label className="block text-xs text-slate-500 mb-1">Description</label>
                         <input 
                          type="text"
                          value={service.description}
                          onChange={(e) => {
                            const newServices = [...formData.services];
                            newServices[index].description = e.target.value;
                            setFormData({...formData, services: newServices});
                          }}
                          className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-white text-sm"
                        />
                       </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase">Features</label>
                        <button 
                          onClick={() => {
                            const newServices = [...formData.services];
                            newServices[index].features.push("New Feature");
                            setFormData({...formData, services: newServices});
                          }}
                          className="text-xs flex items-center gap-1 text-primary hover:text-white"
                        >
                          <Plus size={12} /> Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex gap-2">
                            <input 
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[index].features[fIdx] = e.target.value;
                                setFormData({...formData, services: newServices});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-xs text-slate-300"
                            />
                            <button 
                              onClick={() => {
                                const newServices = [...formData.services];
                                newServices[index].features = newServices[index].features.filter((_, i) => i !== fIdx);
                                setFormData({...formData, services: newServices});
                              }}
                              className="p-2 text-red-400 hover:bg-slate-800 rounded border border-slate-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'Projects' && (
             /* ... Projects logic matches original ... */
             <div className="space-y-6">
                <div className="flex justify-end">
                   <button 
                     className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg"
                     onClick={() => {
                        const newProject: any = {
                          id: Date.now(),
                          title: "New Project",
                          description: "Description",
                          techStack: ["React"],
                          image: "https://picsum.photos/600/400",
                          category: "Web",
                          demoUrl: "#",
                          repoUrl: "#"
                        };
                        setFormData({...formData, projects: [newProject, ...formData.projects]});
                     }}
                   >
                     <Plus size={16}/> Add New Project
                   </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {formData.projects.map((project, index) => (
                    <div key={project.id} className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative group shadow-sm">
                      <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
                         <div className="flex items-center gap-3">
                            {project.image && <img src={project.image} alt="" className="w-10 h-10 rounded object-cover bg-slate-800" />}
                            <div>
                              <h3 className="font-bold text-white">{project.title || "Untitled"}</h3>
                              <span className="text-xs text-slate-500">{project.category}</span>
                            </div>
                         </div>
                         <button 
                          onClick={() => {
                             if(confirm('Delete project?')) {
                               const newProjects = formData.projects.filter((_, i) => i !== index);
                               setFormData({...formData, projects: newProjects});
                             }
                          }}
                          className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                         <div>
                           <label className="block text-xs text-slate-500 mb-1">Title</label>
                           <input 
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].title = e.target.value;
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                           />
                         </div>
                         
                         <div>
                           <label className="block text-xs text-slate-500 mb-1">Category</label>
                           <select 
                              value={project.category}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].category = e.target.value as any;
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                           >
                             <option value="Web">Web</option>
                             <option value="App">App</option>
                             <option value="Software">Software</option>
                             <option value="Adv. Excel">Adv. Excel</option>
                           </select>
                         </div>

                         <div className="md:col-span-2">
                           <label className="block text-xs text-slate-500 mb-1">Description</label>
                           <textarea 
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].description = e.target.value;
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                              rows={2}
                           />
                         </div>

                         <div className="md:col-span-2">
                            <label className="block text-xs text-slate-500 mb-1">Tech Stack (comma separated)</label>
                            <input 
                              value={project.techStack.join(', ')}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].techStack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white font-mono"
                            />
                         </div>

                         <div>
                           <label className="block text-xs text-slate-500 mb-1">Live/Demo Link</label>
                           <input 
                              value={project.demoUrl || ''}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].demoUrl = e.target.value;
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                              placeholder="https://..."
                           />
                         </div>

                         <div>
                           <label className="block text-xs text-slate-500 mb-1">GitHub Repo Link</label>
                           <input 
                              value={project.repoUrl || ''}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].repoUrl = e.target.value;
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                              placeholder="https://github.com/..."
                           />
                         </div>

                         <div className="md:col-span-2">
                           <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                           <input 
                              value={project.image}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].image = e.target.value;
                                setFormData({...formData, projects: newProjects});
                              }}
                              className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                           />
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {activeTab === 'Skills' && (
             /* ... Skills logic matches original ... */
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <div className="w-full">
                      <label className="block text-xs text-slate-500 mb-1">Skill Name</label>
                      <input 
                        value={skill.name}
                        onChange={(e) => {
                           const newSkills = [...formData.skills];
                           newSkills[index].name = e.target.value;
                           setFormData({...formData, skills: newSkills});
                        }}
                        className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-xs text-slate-500 mb-1">Level (%)</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="range"
                          min="0" max="100"
                          value={skill.level}
                          onChange={(e) => {
                             const newSkills = [...formData.skills];
                             newSkills[index].level = parseInt(e.target.value);
                             setFormData({...formData, skills: newSkills});
                          }}
                          className="flex-1"
                        />
                        <span className="text-sm font-mono w-8 text-right text-white">{skill.level}</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'Navbar' && (
            /* ... Navbar logic matches original ... */
            <div className="space-y-6">
              <div className="flex justify-end">
                <button 
                  className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    const newLink: any = {
                      id: `nav-${Date.now()}`,
                      label: "New Link",
                      type: 'text',
                      target: '#',
                      iconKey: 'link'
                    };
                    setFormData({...formData, navLinks: [...(formData.navLinks || []), newLink]});
                  }}
                >
                  <Plus size={16}/> Add Link
                </button>
              </div>
              <div className="space-y-3">
                {(formData.navLinks || []).map((link, index) => (
                  <div key={link.id || index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <button 
                      onClick={() => {
                        const newLinks = formData.navLinks.filter((_, i) => i !== index);
                        setFormData({...formData, navLinks: newLinks});
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="flex-1 min-w-[150px] w-full md:w-auto">
                      <label className="block text-xs text-slate-500 mb-1">Label</label>
                      <input 
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...formData.navLinks];
                          newLinks[index].label = e.target.value;
                          setFormData({...formData, navLinks: newLinks});
                        }}
                        className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                      />
                    </div>
                    
                    <div className="w-full md:w-32">
                      <label className="block text-xs text-slate-500 mb-1">Type</label>
                      <select 
                        value={link.type}
                        onChange={(e) => {
                          const newLinks = [...formData.navLinks];
                          newLinks[index].type = e.target.value as any;
                          setFormData({...formData, navLinks: newLinks});
                        }}
                        className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                      >
                        <option value="text">Text</option>
                        <option value="icon">Icon</option>
                        <option value="both">Both</option>
                      </select>
                    </div>

                    <div className="flex-1 w-full md:w-auto">
                      <label className="block text-xs text-slate-500 mb-1">Target</label>
                      <input 
                        value={link.target}
                        onChange={(e) => {
                          const newLinks = [...formData.navLinks];
                          newLinks[index].target = e.target.value;
                          setFormData({...formData, navLinks: newLinks});
                        }}
                        className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                        placeholder="#section or url"
                      />
                    </div>

                    <div className="w-full md:w-40">
                      <label className="block text-xs text-slate-500 mb-1">Icon Key</label>
                      <div className="flex items-center gap-2">
                        <input 
                          value={link.iconKey || ''}
                          onChange={(e) => {
                            const newLinks = [...formData.navLinks];
                            newLinks[index].iconKey = e.target.value;
                            setFormData({...formData, navLinks: newLinks});
                          }}
                          className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-sm text-white"
                        />
                        <div className="w-9 h-9 bg-slate-800 rounded border border-slate-700 flex flex-shrink-0 items-center justify-center text-primary">
                           {ICON_PREVIEW_MAP[link.iconKey?.toLowerCase() || ''] || <HelpCircle size={16} className="text-slate-600"/>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Icon Reference */}
              <div className="mt-8 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Icon Cheat Sheet</h4>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-thin">
                  {Object.keys(ICON_PREVIEW_MAP).map(key => (
                    <span key={key} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-400 font-mono flex items-center gap-2 hover:border-primary/50 hover:text-white transition-colors cursor-default">
                        {React.cloneElement(ICON_PREVIEW_MAP[key] as React.ReactElement<any>, { size: 12 })} {key}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Tools' && (
             /* ... Tools logic matches original ... */
            <div className="space-y-6">
              {/* Sub-Tabs for Tools */}
              <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
                 <button 
                   onClick={() => setToolsSubTab('cards')} 
                   className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${toolsSubTab === 'cards' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                 >
                    Cards
                 </button>
                 <button 
                   onClick={() => setToolsSubTab('sections')} 
                   className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${toolsSubTab === 'sections' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                 >
                    Iframe Sections
                 </button>
              </div>

              {/* TOOL CARDS MANAGEMENT */}
              {toolsSubTab === 'cards' && (
                <>
                  <div className="flex justify-end">
                    <button 
                      className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg"
                      onClick={() => {
                        const newTool: any = {
                          id: `tool-${Date.now()}`,
                          title: "New Tool",
                          iconKey: "calculator",
                          features: ["Feature 1"],
                          link: "#",
                          color: "#3b82f6"
                        };
                        setFormData({...formData, tools: [newTool, ...formData.tools]});
                      }}
                    >
                      <Plus size={16}/> Add New Tool
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {(formData.tools || []).map((tool, index) => (
                      <div key={tool.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 relative flex flex-col h-full shadow-md">
                        <button 
                          onClick={() => {
                             if(confirm('Delete tool?')) {
                                const newTools = formData.tools.filter((_, i) => i !== index);
                                setFormData({...formData, tools: newTools});
                             }
                          }}
                          className="absolute top-3 right-3 p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500 hover:text-white z-10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                        
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center shrink-0" style={{ color: tool.color }}>
                                {ICON_PREVIEW_MAP[tool.iconKey?.toLowerCase() || ''] || <HelpCircle size={18}/>}
                            </div>
                            <div className="flex-1 pr-8">
                                <input 
                                    value={tool.title}
                                    onChange={(e) => {
                                      const newTools = [...formData.tools];
                                      newTools[index].title = e.target.value;
                                      setFormData({...formData, tools: newTools});
                                    }}
                                    className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-primary w-full text-white font-bold text-sm focus:outline-none"
                                    placeholder="Tool Title"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 mb-4 flex-1">
                           <div>
                             <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Color & Icon</label>
                             <div className="flex gap-2">
                               <input 
                                  type="color"
                                  value={tool.color}
                                  onChange={(e) => {
                                    const newTools = [...formData.tools];
                                    newTools[index].color = e.target.value;
                                    setFormData({...formData, tools: newTools});
                                  }}
                                  className="h-8 w-8 bg-transparent border-none p-0 cursor-pointer rounded overflow-hidden shrink-0"
                               />
                               <input 
                                  value={tool.iconKey}
                                  onChange={(e) => {
                                    const newTools = [...formData.tools];
                                    newTools[index].iconKey = e.target.value;
                                    setFormData({...formData, tools: newTools});
                                  }}
                                  className="bg-slate-900 p-1.5 rounded border border-slate-700 w-full text-xs text-white"
                                  placeholder="icon-key"
                               />
                             </div>
                           </div>

                           <div>
                             <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Link</label>
                             <input 
                                value={tool.link}
                                onChange={(e) => {
                                  const newTools = [...formData.tools];
                                  newTools[index].link = e.target.value;
                                  setFormData({...formData, tools: newTools});
                                }}
                                className="bg-slate-900 p-2 rounded border border-slate-700 w-full text-xs text-white"
                             />
                           </div>
                        </div>

                        {/* Features List for Tool */}
                        <div className="border-t border-slate-800 pt-3">
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase">Features</label>
                            <button 
                              onClick={() => {
                                const newTools = [...formData.tools];
                                newTools[index].features.push("Feature");
                                setFormData({...formData, tools: newTools});
                              }}
                              className="text-[10px] flex items-center gap-1 text-primary hover:text-white bg-primary/10 px-2 py-0.5 rounded"
                            >
                              <Plus size={10} /> Add
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            {tool.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex gap-1.5">
                                <input 
                                  type="text"
                                  value={feature}
                                  onChange={(e) => {
                                    const newTools = [...formData.tools];
                                    newTools[index].features[fIdx] = e.target.value;
                                    setFormData({...formData, tools: newTools});
                                  }}
                                  className="bg-slate-900 p-1.5 rounded border border-slate-700 w-full text-xs text-slate-300 focus:text-white"
                                />
                                <button 
                                  onClick={() => {
                                    const newTools = [...formData.tools];
                                    newTools[index].features = newTools[index].features.filter((_, i) => i !== fIdx);
                                    setFormData({...formData, tools: newTools});
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded border border-slate-800"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* IFRAME SECTIONS MANAGEMENT */}
              {toolsSubTab === 'sections' && (
                <>
                  <div className="flex justify-end">
                    <button 
                      className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg"
                      onClick={() => {
                        const newSection: any = {
                          id: `sec-${Date.now()}`,
                          title: "New Iframe Section",
                          src: "https://example.com",
                          height: "600px",
                          order: (formData.toolSections?.length || 0) + 1
                        };
                        setFormData({...formData, toolSections: [...(formData.toolSections || []), newSection]});
                      }}
                    >
                      <Plus size={16}/> Add New Section
                    </button>
                  </div>

                  <div className="space-y-4">
                     {(formData.toolSections || []).sort((a, b) => a.order - b.order).map((section, index) => (
                       <div key={section.id} className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative">
                          <button 
                            onClick={() => {
                              if(confirm('Delete section?')) {
                                const newSections = formData.toolSections.filter(s => s.id !== section.id);
                                setFormData({...formData, toolSections: newSections});
                              }
                            }}
                            className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                          
                          <div className="flex items-center gap-3 mb-6">
                             <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-emerald-500">
                                <LayoutTemplate size={20} />
                             </div>
                             <div>
                                <h3 className="font-bold text-white text-lg">{section.title}</h3>
                                <span className="text-xs text-slate-500 uppercase">Order: {section.order}</span>
                             </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-xs text-slate-500 mb-1 uppercase tracking-wider">Title</label>
                               <input 
                                  value={section.title}
                                  onChange={(e) => {
                                     const newSections = [...formData.toolSections];
                                     const idx = newSections.findIndex(s => s.id === section.id);
                                     newSections[idx].title = e.target.value;
                                     setFormData({...formData, toolSections: newSections});
                                  }}
                                  className="bg-slate-900 p-2.5 rounded border border-slate-700 w-full text-sm text-white focus:border-primary focus:outline-none"
                               />
                             </div>
                             <div>
                               <label className="block text-xs text-slate-500 mb-1 uppercase tracking-wider">Display Order</label>
                               <input 
                                  type="number"
                                  value={section.order}
                                  onChange={(e) => {
                                     const newSections = [...formData.toolSections];
                                     const idx = newSections.findIndex(s => s.id === section.id);
                                     newSections[idx].order = parseInt(e.target.value);
                                     setFormData({...formData, toolSections: newSections});
                                  }}
                                  className="bg-slate-900 p-2.5 rounded border border-slate-700 w-full text-sm text-white focus:border-primary focus:outline-none"
                               />
                             </div>
                             <div className="md:col-span-2">
                               <label className="block text-xs text-slate-500 mb-1 uppercase tracking-wider">Iframe Source URL</label>
                               <input 
                                  value={section.src}
                                  onChange={(e) => {
                                     const newSections = [...formData.toolSections];
                                     const idx = newSections.findIndex(s => s.id === section.id);
                                     newSections[idx].src = e.target.value;
                                     setFormData({...formData, toolSections: newSections});
                                  }}
                                  className="bg-slate-900 p-2.5 rounded border border-slate-700 w-full text-sm text-white focus:border-primary focus:outline-none"
                                  placeholder="https://..."
                               />
                             </div>
                             <div>
                               <label className="block text-xs text-slate-500 mb-1 uppercase tracking-wider">Height</label>
                               <input 
                                  value={section.height}
                                  onChange={(e) => {
                                     const newSections = [...formData.toolSections];
                                     const idx = newSections.findIndex(s => s.id === section.id);
                                     newSections[idx].height = e.target.value;
                                     setFormData({...formData, toolSections: newSections});
                                  }}
                                  className="bg-slate-900 p-2.5 rounded border border-slate-700 w-full text-sm text-white focus:border-primary focus:outline-none"
                                  placeholder="e.g. 600px"
                               />
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
                </>
              )}

            </div>
          )}

          {activeTab === 'Footer' && (
             /* ... Footer logic matches original ... */
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Footer Text</label>
              <textarea 
                rows={3}
                value={formData.footer.text}
                onChange={(e) => setFormData({...formData, footer: { text: e.target.value }})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
              />
            </div>
          )}

          {activeTab === 'AI' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
                   <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                      <Bot size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-white text-lg">AI Assistant Configuration</h3>
                      <p className="text-slate-500 text-xs">Manage the behavior and knowledge of the chat bot.</p>
                   </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Model Name</label>
                     <p className="text-xs text-slate-500 mb-2">Specify the Gemini model version to use (e.g. 'gemini-2.5-flash').</p>
                     <input 
                        type="text"
                        value={formData.aiConfig?.modelName || 'gemini-2.5-flash'}
                        onChange={(e) => setFormData({
                           ...formData, 
                           aiConfig: { ...formData.aiConfig, modelName: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-2">
                        <Key size={12}/> API Key
                     </label>
                     <p className="text-xs text-slate-500 mb-2">
                        Override the default API key. Leave empty to use system defaults.
                     </p>
                     <input 
                        type="password"
                        value={formData.aiConfig?.apiKey || ''}
                        onChange={(e) => setFormData({
                           ...formData, 
                           aiConfig: { ...formData.aiConfig, apiKey: e.target.value }
                        })}
                        placeholder="Enter Gemini API Key..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none placeholder:text-slate-600"
                     />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">System Prompt / Instruction</label>
                    <p className="text-xs text-slate-500 mb-2">This text tells the AI who it is and how to behave. Include details about your persona, skills, and rules.</p>
                    <textarea 
                      rows={12}
                      value={formData.aiConfig?.systemInstruction || ''}
                      onChange={(e) => setFormData({
                         ...formData, 
                         aiConfig: { ...formData.aiConfig, systemInstruction: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white text-sm font-mono focus:border-primary focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
             /* ... Settings logic matches original ... */
             <div className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                       <div className="p-2 bg-slate-800 rounded-lg text-white border border-slate-700">
                          <Settings size={24} />
                       </div>
                       <div>
                          <h3 className="font-bold text-white text-lg">Admin Security</h3>
                          <p className="text-slate-500 text-xs">Update your login credentials.</p>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                       <div>
                          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Admin Username</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input 
                              type="text"
                              value={formData.adminConfig?.username || ''}
                              onChange={(e) => setFormData({
                                 ...formData, 
                                 adminConfig: { ...(formData.adminConfig || {password: ''}), username: e.target.value }
                              })}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:border-primary focus:outline-none"
                            />
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Admin Password</label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input 
                              type="text" // Showing as text so user can see what they type for this simple CMS
                              value={formData.adminConfig?.password || ''}
                              onChange={(e) => setFormData({
                                 ...formData, 
                                 adminConfig: { ...(formData.adminConfig || {username: ''}), password: e.target.value }
                              })}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:border-primary focus:outline-none"
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 mt-2">Make sure to save changes after updating your password.</p>
                       </div>
                    </div>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
