
import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, AlertCircle, ArrowLeft, ShieldCheck, LayoutDashboard, Bot, Terminal } from 'lucide-react';

declare global {
  interface Window {
    gsap: any;
  }
}

interface AdminLoginProps {
  onLogin: (u: string, p: string) => void;
  isError: boolean;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, isError, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Refs for SVG elements
  const svgRef = useRef<SVGSVGElement>(null);
  const armLRef = useRef<SVGPathElement>(null);
  const armRRef = useRef<SVGPathElement>(null);
  const eyeLRef = useRef<SVGGElement>(null);
  const eyeRRef = useRef<SVGGElement>(null);
  const noseRef = useRef<SVGPathElement>(null);
  const mouthRef = useRef<SVGGElement>(null);
  const chinRef = useRef<SVGPathElement>(null);
  const faceRef = useRef<SVGPathElement>(null);
  const eyebrowRef = useRef<SVGGElement>(null);
  const outerEarLRef = useRef<SVGGElement>(null);
  const outerEarRRef = useRef<SVGGElement>(null);
  const earHairLRef = useRef<SVGGElement>(null);
  const earHairRRef = useRef<SVGGElement>(null);
  const hairRef = useRef<SVGPathElement>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial setup
    if (window.gsap && armLRef.current && armRRef.current) {
        window.gsap.set(armLRef.current, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
        window.gsap.set(armRRef.current, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handlePasswordFocus = () => {
    if (!window.gsap) return;
    window.gsap.to(armLRef.current, { duration: 0.45, x: -93, y: 2, rotation: 0, ease: "quad.out" });
    window.gsap.to(armRRef.current, { duration: 0.45, x: -93, y: 2, rotation: 0, ease: "quad.out", delay: 0.1 });
  };

  const handlePasswordBlur = () => {
    if (!window.gsap) return;
    window.gsap.to(armLRef.current, { duration: 1.35, y: 220, ease: "quad.out" });
    window.gsap.to(armLRef.current, { duration: 1.35, rotation: 105, ease: "quad.out", delay: 0.1 });
    window.gsap.to(armRRef.current, { duration: 1.35, y: 220, ease: "quad.out" });
    window.gsap.to(armRRef.current, { duration: 1.35, rotation: -105, ease: "quad.out", delay: 0.1 });
  };

  const handleEmailFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!window.gsap) return;
    const value = e.target.value;
    const maxChars = 30; // approx width
    const ratio = Math.min(value.length / maxChars, 1);
    const lookX = (ratio - 0.5) * 20;

    window.gsap.to([eyeLRef.current, eyeRRef.current], { duration: 0.5, x: lookX, y: 0, ease: "expo.out" });
    window.gsap.to(noseRef.current, { duration: 0.5, x: lookX, ease: "expo.out" });
    window.gsap.to(mouthRef.current, { duration: 0.5, x: lookX, ease: "expo.out" });
    window.gsap.to(faceRef.current, { duration: 0.5, x: lookX * 0.5, ease: "expo.out" });
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const value = e.target.value;
    
    if (!window.gsap) return;
    
    const maxChars = 30; // approx width
    const ratio = Math.min(value.length / maxChars, 1);
    
    // Map ratio (-0.5 to 0.5 range approx for look)
    const lookX = (ratio - 0.5) * 20; 
    const lookY = 0;

    window.gsap.to([eyeLRef.current, eyeRRef.current], { duration: 0.5, x: lookX, y: lookY, ease: "expo.out" });
    window.gsap.to(noseRef.current, { duration: 0.5, x: lookX, ease: "expo.out" });
    window.gsap.to(mouthRef.current, { duration: 0.5, x: lookX, ease: "expo.out" });
    window.gsap.to(faceRef.current, { duration: 0.5, x: lookX * 0.5, ease: "expo.out" });
  };

  const handleEmailBlur = () => {
     if (!window.gsap) return;
     window.gsap.to([eyeLRef.current, eyeRRef.current], { duration: 1, x: 0, y: 0, ease: "expo.out" });
     window.gsap.to(noseRef.current, { duration: 1, x: 0, scaleX: 1, scaleY: 1, ease: "expo.out" });
     window.gsap.to(mouthRef.current, { duration: 1, x: 0, rotation: 0, ease: "expo.out" });
     window.gsap.to(faceRef.current, { duration: 1, x: 0, skewX: 0, ease: "expo.out" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Content Information (Visible on Tablet/Desktop) */}
        <div className="hidden md:block space-y-6 h-full flex flex-col justify-center relative">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-primary mb-3">
                 <ShieldCheck size={14} />
                 <span>SECURE GATEWAY v2.0</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                ImAkshay <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Admin Control</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                 Access your centralized terminal to manage content and configurations.
              </p>
           </div>

           <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                 <div className="p-1.5 bg-primary/10 rounded text-primary">
                    <LayoutDashboard size={16} />
                 </div>
                 <h3 className="text-white font-medium text-xs">CMS Control</h3>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                 <div className="p-1.5 bg-pink-500/10 rounded text-pink-500">
                    <Bot size={16} />
                 </div>
                 <h3 className="text-white font-medium text-xs">AI Config</h3>
              </div>

               <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                 <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-500">
                    <Terminal size={16} />
                 </div>
                 <h3 className="text-white font-medium text-xs">Tools Manager</h3>
              </div>
           </div>

           <div className="pt-2">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 text-xs"
              >
                <ArrowLeft size={14} />
                <span>Back to Portfolio</span>
              </button>
           </div>
        </div>

        {/* Right Side: Animated Login Card - Compressed Size */}
        <div className="w-full max-w-sm mx-auto md:mx-0">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 w-full shadow-2xl relative overflow-hidden">
             <button onClick={onBack} className="absolute top-4 left-4 text-slate-500 hover:text-white transition-colors z-20 group flex items-center gap-1 md:hidden">
                <ArrowLeft size={18} />
                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Back</span>
             </button>

             {/* SVG Avatar - Smaller */}
             <div className="w-32 h-32 mx-auto mb-4 relative rounded-full border-4 border-slate-700 bg-slate-800 overflow-hidden shadow-inner">
                <svg ref={svgRef} className="w-full h-full" viewBox="0 0 200 200">
                    <defs>
                        <circle id="armMaskPath" cx="100" cy="100" r="100"/>	
                    </defs>
                    <clipPath id="armMask">
                        <use xlinkHref="#armMaskPath" overflow="visible"/>
                    </clipPath>
                    <circle cx="100" cy="100" r="100" className="fill-slate-800"/>
                    
                    {/* Body */}
                    <g className="body">
                        <path fill="#e2e8f0" d="M193.3,135.9c-5.8-8.4-15.5-13.9-26.5-13.9H151V72c0-27.6-22.4-50-50-50S51,44.4,51,72v50H32.1 c-10.6,0-20,5.1-25.8,13l0,78h187L193.3,135.9z"/>
                        <path fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M193.3,135.9 c-5.8-8.4-15.5-13.9-26.5-13.9H151V72c0-27.6-22.4-50-50-50S51,44.4,51,72v50H32.1c-10.6,0-20,5.1-25.8,13"/>
                        <path fill="#f1f5f9" d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z"/>
                    </g>

                    {/* Ears */}
                    <g ref={outerEarLRef} className="earL">
                        <g fill="#f1f5f9" stroke="#334155" strokeWidth="2.5">
                            <circle cx="47" cy="83" r="11.5"/>
                            <path d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g ref={earHairLRef} className="earHair">
                            <rect x="51" y="64" fill="#e2e8f0" width="15" height="35"/>
                            <path d="M53.4 62.8C48.5 67.4 45 72.2 42.8 77c3.4-.1 6.8-.1 10.1.1-4 3.7-6.8 7.6-8.2 11.6 2.1 0 4.2 0 6.3.2-2.6 4.1-3.8 8.3-3.7 12.5 1.2-.7 3.4-1.4 5.2-1.9" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </g>
                    <g ref={outerEarRRef} className="earR">
                        <g fill="#f1f5f9" stroke="#334155" strokeWidth="2.5">
                            <circle cx="155" cy="83" r="11.5"/>
                            <path d="M155.7 78.9c2.3 0 4.1 1.9 4.1 4.1 0 2.3-1.9 4.1-4.1 4.1" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g ref={earHairRRef} className="earHair">
                            <rect x="131" y="64" fill="#e2e8f0" width="20" height="35"/>
                            <path d="M148.6 62.8c4.9 4.6 8.4 9.4 10.6 14.2-3.4-.1-6.8-.1-10.1.1 4 3.7 6.8 7.6 8.2 11.6-2.1 0-4.2 0-6.3.2 2.6 4.1 3.8 8.3 3.7 12.5-1.2-.7-3.4-1.4-5.2-1.9" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </g>

                    {/* Face & Chin */}
                    <path ref={chinRef} className="chin" d="M84.1 121.6c2.7 2.9 6.1 5.4 9.8 7.5l.9-4.5c2.9 2.5 6.3 4.8 10.2 6.5 0-1.9-.1-3.9-.2-5.8 3 1.2 6.2 2 9.7 2.5-.3-2.1-.7-4.1-1.2-6.1" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path ref={faceRef} className="face" fill="#f1f5f9" d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46"/>
                    <path ref={hairRef} className="hair" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M81.457,27.929 c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235 c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474"/>

                    {/* Eyebrow */}
                    <g ref={eyebrowRef} className="eyebrow">
                        <path fill="#e2e8f0" d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037 c-4.569-1.465-8.909-3.222-12.996-5.226c-0.98,3.075-2.07,6.137-3.267,9.179c-5.514-3.067-10.559-6.545-15.097-10.329 c-1.806,2.889-3.745,5.73-5.816,8.515c-7.916-4.124-15.053-9.114-21.296-14.738l1.107-11.768h73.475V55.064z"/>
                        <path fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M63.56,55.102 c6.243,5.624,13.38,10.614,21.296,14.738c2.071-2.785,4.01-5.626,5.816-8.515c4.537,3.785,9.583,7.263,15.097,10.329 c1.197-3.043,2.287-6.104,3.267-9.179c4.087,2.004,8.427,3.761,12.996,5.226c0.545-3.348,0.986-6.696,1.322-10.037 c4.913-0.481,9.857-1.34,14.787-2.599"/>
                    </g>

                    {/* Eyes */}
                    <g ref={eyeLRef} className="eyeL">
                        <circle cx="85.5" cy="78.5" r="3.5" fill="#334155"/>
                        <circle cx="84" cy="76" r="1" fill="#fff"/>
                    </g>
                    <g ref={eyeRRef} className="eyeR">
                        <circle cx="114.5" cy="78.5" r="3.5" fill="#334155"/>
                        <circle cx="113" cy="76" r="1" fill="#fff"/>
                    </g>

                    {/* Nose & Mouth */}
                    <path ref={noseRef} className="nose" d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z" fill="#334155"/>
                    <g ref={mouthRef} className="mouth">
                        <path className="mouthBG" fill="#64748b" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
                    </g>

                    {/* Arms (for covering eyes) */}
                    <g className="arms" clipPath="url(#armMask)">
                        <g ref={armLRef} className="armL">
                            <path fill="#f1f5f9" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M121.3 97.4L111 58.7l38.8-10.4 20 36.1z"/>
                            <path fill="#f1f5f9" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M134.4 52.5l19.3-5.2c2.7-.7 5.4.9 6.1 3.5.7 2.7-.9 5.4-3.5 6.1L146 59.7M160.8 76.5l19.4-5.2c2.7-.7 5.4.9 6.1 3.5.7 2.7-.9 5.4-3.5 6.1l-18.3 4.9M158.3 66.8l23.1-6.2c2.7-.7 5.4.9 6.1 3.5.7 2.7-.9 5.4-3.5 6.1l-23.1 6.2M150.9 58.4l26-7c2.7-.7 5.4.9 6.1 3.5.7 2.7-.9 5.4-3.5 6.1l-21.3 5.7"/>
                            <path fill="#e2e8f0" d="M178.8 74.7l2.2-.6c1.1-.3 2.2.3 2.4 1.4.3 1.1-.3 2.2-1.4 2.4l-2.2.6-1-3.8zM180.1 64l2.2-.6c1.1-.3 2.2.3 2.4 1.4.3 1.1-.3 2.2-1.4 2.4l-2.2.6-1-3.8zM175.5 54.9l2.2-.6c1.1-.3 2.2.3 2.4 1.4.3 1.1-.3 2.2-1.4 2.4l-2.2.6-1-3.8zM152.1 49.4l2.2-.6c1.1-.3 2.2.3 2.4 1.4.3 1.1-.3 2.2-1.4 2.4l-2.2.6-1-3.8z"/>
                            <path fill="#fff" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M123.5 96.8c-41.4 14.9-84.1 30.7-108.2 35.5L1.2 80c33.5-9.9 71.9-16.5 111.9-21.8"/>
                            <path fill="#fff" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M108.5 59.4c7.7-5.3 14.3-8.4 22.8-13.2-2.4 5.3-4.7 10.3-6.7 15.1 4.3.3 8.4.7 12.3 1.3-4.2 5-8.1 9.6-11.5 13.9 3.1 1.1 6 2.4 8.7 3.8-1.4 2.9-2.7 5.8-3.9 8.5 2.5 3.5 4.6 7.2 6.3 11-4.9-.8-9-.7-16.2-2.7M94.5 102.8c-.6 4-3.8 8.9-9.4 14.7-2.6-1.8-5-3.7-7.2-5.7-2.5 4.1-6.6 8.8-12.2 14-1.9-2.2-3.4-4.5-4.5-6.9-4.4 3.3-9.5 6.9-15.4 10.8-.2-3.4.1-7.1 1.1-10.9M97.5 62.9c-1.7-2.4-5.9-4.1-12.4-5.2-.9 2.2-1.8 4.3-2.5 6.5-3.8-1.8-9.4-3.1-17-3.8.5 2.3 1.2 4.5 1.9 6.8-5-.6-11.2-.9-18.4-1 2 2.9.9 3.5 3.9 6.2"/>
                        </g>
                        <g ref={armRRef} className="armR">
                            <path fill="#f1f5f9" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M265.4 97.3l10.4-38.6-38.9-10.5-20 36.1z"/>
                            <path fill="#f1f5f9" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M252.4 52.4L233 47.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l10.3 2.8M226 76.4l-19.4-5.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l18.3 4.9M228.4 66.7l-23.1-6.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l23.1 6.2M235.8 58.3l-26-7c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l21.3 5.7"/>
                            <path fill="#e2e8f0" d="M207.9 74.7l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM206.7 64l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM211.2 54.8l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM234.6 49.4l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8z"/>
                            <path fill="#fff" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M263.3 96.7c41.4 14.9 84.1 30.7 108.2 35.5l14-52.3C352 70 313.6 63.5 273.6 58.1"/>
                            <path fill="#fff" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M278.2 59.3l-18.6-10 2.5 11.9-10.7 6.5 9.9 8.7-13.9 6.4 9.1 5.9-13.2 9.2 23.1-.9M284.5 100.1c-.4 4 1.8 8.9 6.7 14.8 3.5-1.8 6.7-3.6 9.7-5.5 1.8 4.2 5.1 8.9 10.1 14.1 2.7-2.1 5.1-4.4 7.1-6.8 4.1 3.4 9 7 14.7 11 1.2-3.4 1.8-7 1.7-10.9M314 66.7s5.4-5.7 12.6-7.4c1.7 2.9 3.3 5.7 4.9 8.6 3.8-2.5 9.8-4.4 18.2-5.7.1 3.1.1 6.1 0 9.2 5.5-1 12.5-1.6 20.8-1.9-1.4 3.9-2.5 8.4-2.5 8.4"/>
                        </g>				
                    </g>
                </svg>
             </div>

             <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-1">Admin Access</h2>
             </div>

             {/* Form */}
             <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                           ref={emailRef}
                           type="text"
                           value={email}
                           onChange={handleEmailInput}
                           onFocus={handleEmailFocus}
                           onBlur={handleEmailBlur}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                           placeholder="Enter Username"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                           type="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           onFocus={handlePasswordFocus}
                           onBlur={handlePasswordBlur}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                           placeholder="Enter Password"
                        />
                    </div>
                </div>

                {isError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                        <AlertCircle size={16} />
                        <span>Invalid username or password.</span>
                    </div>
                )}

                <button type="submit" className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-primary/25 mt-2">
                    Log In
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
