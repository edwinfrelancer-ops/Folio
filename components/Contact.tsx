import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Motion';
import { ArrowUpRight, ChevronUp, Mail, Coffee, Phone, Copy, Check, CheckCircle2 } from 'lucide-react';

// --- BRAND LOGOS ---
const GmailLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const PaypalLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.01 4.287-.023.143-.047.288-.077.437-.946 5.05-4.336 5.05-4.336 5.05h-1.33c-.537 0-.98.403-1.06.94l-1.096 6.96h-4.396a.64.64 0 0 1-.62-.74l.732-4.66c.036-.232.236-.403.47-.403h1.76c2.44 0 4.394-1.12 4.96-4.08.31-1.62.13-2.73-.83-3.66-.75-.72-2.02-1.08-4.05-1.08H7.95a.64.64 0 0 0-.632.74l-2.67 16.98z" />
  </svg>
);

// --- 3D TIME GLOBE WIDGET ---
const TimeGlobeWidget: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clientTime, setClientTime] = useState('');
  const [nairobiTime, setNairobiTime] = useState('');
  const [timeDiff, setTimeDiff] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Time Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Client Time
      setClientTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: true 
      }));

      // Nairobi Time (UTC+3)
      const nairobi = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Nairobi" }));
      setNairobiTime(nairobi.toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: true 
      }));

      // Calculate Difference
      const diff = (nairobi.getTime() - now.getTime()) / (1000 * 60 * 60);
      const diffFormatted = diff >= 0 ? `+${Math.round(diff)} HRS` : `${Math.round(diff)} HRS`;
      setTimeDiff(diffFormatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Globe Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI fix
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const GLOBE_RADIUS = rect.width * 0.35;
    const DOT_DENSITY = 40; // Number of longitude lines
    const DOT_COUNT_PER_LINE = 20;
    
    let rotation = 0;
    let animationFrame: number;

    const points: {x: number, y: number, z: number}[] = [];

    // Generate Sphere Points
    for (let i = 0; i < DOT_DENSITY; i++) {
      const theta = (Math.PI * 2 * i) / DOT_DENSITY; // Longitude
      for (let j = 0; j < DOT_COUNT_PER_LINE; j++) {
        const phi = (Math.PI * j) / DOT_COUNT_PER_LINE; // Latitude
        points.push({
          x: GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
          y: GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
          z: GLOBE_RADIUS * Math.cos(phi)
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Rotate based on hover state (faster if hovered)
      rotation += isHovered ? 0.02 : 0.002; 

      points.forEach(point => {
        // Rotate around Y axis
        const x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const z = point.z * Math.cos(rotation) + point.x * Math.sin(rotation);
        const y = point.y; // Tilt could be added here

        // Project 3D to 2D
        const scale = 400 / (400 + z); // Perspective projection
        const x2d = (x * scale) + cx;
        const y2d = (y * scale) + cy;
        const alpha = Math.max(0.1, (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS)); // Depth fading

        // Check dark mode for color
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? `rgba(255, 255, 255, ${alpha * 0.5})` : `rgba(0, 0, 0, ${alpha * 0.4})`;

        if (z > -GLOBE_RADIUS * 0.8) { // Only draw front-ish points
            ctx.beginPath();
            ctx.arc(x2d, y2d, isHovered ? 1.5 : 1, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
      });

      // Draw Connection Lines (Optional - sleek wireframe effect)
      if (isHovered) {
         ctx.strokeStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
         ctx.beginPath();
         // Just a simple equator ring for effect
         ctx.ellipse(cx, cy, GLOBE_RADIUS, GLOBE_RADIUS * 0.3, 0, 0, Math.PI * 2);
         ctx.stroke();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700 group cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* Header */}
        <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    Temporal Link
                </span>
            </div>
            <span className="text-[9px] font-mono text-zinc-300 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded">
                {timeDiff}
            </span>
        </div>

        {/* 3D Canvas Layer */}
        <div className="relative h-64 w-full my-4">
            <canvas ref={canvasRef} className="w-full h-full" />
            
            {/* Center Label Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <div className={`transition-all duration-500 ${isHovered ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-sm'}`}>
                    <span className="text-[8px] uppercase tracking-widest text-emerald-500 font-bold block mb-1">Sync Active</span>
                 </div>
            </div>
        </div>

        {/* Time Comparison Grid */}
        <div className="grid grid-cols-2 gap-8 relative z-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div>
                <span className="block text-[8px] uppercase tracking-widest text-zinc-400 mb-2">Local Terminal</span>
                <p className="text-2xl font-serif italic text-zinc-900 dark:text-white">{clientTime}</p>
                <span className="text-[8px] text-zinc-300">USER_LOC</span>
            </div>
            <div className="text-right">
                <span className="block text-[8px] uppercase tracking-widest text-zinc-400 mb-2">HQ Uplink</span>
                <p className="text-2xl font-serif italic text-zinc-900 dark:text-white">{nairobiTime}</p>
                <span className="text-[8px] text-zinc-300">NAIROBI, KE</span>
            </div>
        </div>
    </div>
  );
};

// --- MAIN CONTACT COMPONENT ---

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleTopScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("nyandikaedwin04@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactOptions = [
    {
      label: "Official Channel",
      title: "contact@edwinfreelancer.work.gd",
      href: "mailto:contact@edwinfreelancer.work.gd",
      icon: <Mail size={20} />,
      color: "#EA4335", // Google Red
      bgStyle: "bg-[#EA4335]/5 dark:bg-[#EA4335]/10",
      borderStyle: "border-[#EA4335]/10 dark:border-[#EA4335]/20 hover:border-[#EA4335]/40",
      textStyle: "group-hover:text-[#EA4335]",
      shadowStyle: "hover:shadow-[#EA4335]/10",
      iconColor: "text-[#EA4335]"
    },
    {
      label: "Direct Line",
      title: "+254 718 616 917",
      href: "tel:+254718616917",
      icon: <Phone size={20} />,
      color: "#10B981", // Emerald
      bgStyle: "bg-[#10B981]/5 dark:bg-[#10B981]/10",
      borderStyle: "border-[#10B981]/10 dark:border-[#10B981]/20 hover:border-[#10B981]/40",
      textStyle: "group-hover:text-[#10B981]",
      shadowStyle: "hover:shadow-[#10B981]/10",
      iconColor: "text-[#10B981]"
    },
    {
      label: "Liaison",
      title: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/edwin-nyandika-2aa512318",
      icon: <LinkedInLogo className="w-5 h-5" />,
      color: "#0077B5", // LinkedIn Blue
      bgStyle: "bg-[#0077B5]/5 dark:bg-[#0077B5]/10",
      borderStyle: "border-[#0077B5]/10 dark:border-[#0077B5]/20 hover:border-[#0077B5]/40",
      textStyle: "group-hover:text-[#0077B5]",
      shadowStyle: "hover:shadow-[#0077B5]/10",
      iconColor: "text-[#0077B5]"
    }
  ];

  return (
    <footer id="contact" className="relative pt-64 pb-20 px-6 md:px-24 bg-[#FDFDFB] dark:bg-[#080808] transition-colors duration-500 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-100 dark:via-zinc-900 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-zinc-100 dark:bg-zinc-900 rounded-full blur-[120px] opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-24 mb-40">
          
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center space-x-4 mb-12">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.8em] font-black text-zinc-900 dark:text-white">Active Terminal</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="text-[clamp(3.5rem,10vw,7rem)] font-serif italic text-zinc-900 dark:text-zinc-50 leading-[0.9] tracking-tighter mb-16">
                Initialize <br />
                <span className="text-zinc-200 dark:text-zinc-800 font-normal not-italic">Connection.</span>
              </h2>
            </Reveal>

            {/* REPLACED STATIC LIST WITH 3D GLOBE WIDGET */}
            <Reveal delay={0.3} direction="right">
               <TimeGlobeWidget />
            </Reveal>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end space-y-12">
            
            {/* Main Action Cards */}
            <Reveal delay={0.6} direction="left">
               <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-400 mb-8 pl-2">Intake Portal</h3>
                  
                  {contactOptions.map((option, idx) => (
                    <motion.a 
                      key={idx} 
                      href={option.href}
                      target={option.href.startsWith('http') ? "_blank" : undefined}
                      rel={option.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        group flex items-center justify-between p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black
                        ${option.bgStyle} 
                        ${option.borderStyle} 
                        ${option.shadowStyle}
                      `}
                      style={{ 
                        '--brand-color': option.color 
                      } as React.CSSProperties}
                    >
                      <div className="flex items-center space-x-6">
                        {/* Bubble Icon */}
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 border border-transparent group-hover:border-[var(--brand-color)] shadow-sm transition-all duration-500 overflow-hidden">
                          {/* Shine Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-color)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                          
                          {/* Icon */}
                          <div className={`relative z-10 text-zinc-400 transition-all duration-500 transform group-hover:scale-115 ${option.textStyle} dark:${option.textStyle}`}>
                            {option.icon}
                          </div>
                        </div>
                        
                        <div>
                          <span className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1 font-sans">{option.label}</span>
                          <span className={`text-2xl font-serif italic text-zinc-900 dark:text-white transition-colors duration-300 break-all underline-offset-4 decoration-[var(--brand-color)] group-hover:underline ${option.textStyle}`}>
                            {option.title}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-[var(--brand-color)]`}>
                        <ArrowUpRight size={18} className={`text-zinc-400 transition-colors duration-500 ${option.textStyle}`} />
                      </div>
                    </motion.a>
                  ))}
               </div>
            </Reveal>

            {/* Aesthetic Copy Button */}
            <Reveal delay={0.7} direction="left">
                <div className="space-y-4">
                     <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-400 mb-8 pl-2">Paypal Address</h3>
                    <motion.button 
                        onClick={handleCopy}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-10 md:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/20 dark:hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-4 dark:focus:ring-offset-black"
                    >
                        {/* Background Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-20 mix-blend-overlay" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-left space-y-2">
                                <span className="flex items-center space-x-2 text-[9px] uppercase tracking-[0.3em] font-black text-zinc-400 group-hover:text-zinc-200 dark:group-hover:text-zinc-500 transition-colors font-sans">
                                    <PaypalLogo className="w-3 h-3" />
                                    <span>{copied ? "Address Copied" : "Copy Paypal Address"}</span>
                                </span>
                                <span className="block text-2xl md:text-3xl font-serif italic tracking-tight break-all">
                                    nyandikaedwin04@gmail.com
                                </span>
                            </div>
                            
                            <div className="w-16 h-16 rounded-full bg-white/10 dark:bg-zinc-900/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 border border-white/10 dark:border-zinc-900/10">
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                        >
                                            <Check size={24} className="text-emerald-400 dark:text-emerald-600" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                        >
                                            <Copy size={24} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </Reveal>

            {/* Support / Coffee Section */}
            <Reveal delay={0.8} direction="left">
                <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-400 mb-8 pl-2">Appreciation</h3>
                    <motion.a 
                        href="https://paypal.me/nyandikaedwin04" 
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-between p-8 bg-[#003087]/5 dark:bg-[#003087]/10 border border-[#003087]/10 dark:border-[#003087]/20 rounded-[2rem] hover:border-[#003087]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#003087]/10 focus:outline-none focus:ring-2 focus:ring-[#003087] focus:ring-offset-2 dark:focus:ring-offset-black"
                    >
                        <div className="flex items-center space-x-6">
                            {/* Bubble Icon */}
                            <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 border border-transparent group-hover:border-[#003087] shadow-sm transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#003087] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                                <div className="relative z-10 text-zinc-400 group-hover:text-[#003087] dark:group-hover:text-[#003087] transition-all duration-500 transform group-hover:scale-115">
                                    <PaypalLogo className="w-5 h-5" />
                                </div>
                            </div>
                            
                            <div>
                                <span className="block text-[9px] uppercase tracking-widest text-[#003087]/60 dark:text-[#003087]/80 font-bold mb-1 font-sans">Buy me a coffee</span>
                                <span className="text-2xl font-serif italic text-[#003087] dark:text-blue-100 group-hover:underline decoration-[#003087] underline-offset-4">Show Support</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-[#003087]/10 dark:border-[#003087]/30 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-[#003087] transition-all duration-500 text-[#003087] dark:text-blue-200">
                            <Coffee size={18} className="group-hover:scale-115 transition-transform duration-300" />
                        </div>
                    </motion.a>
                </div>
            </Reveal>

          </div>
        </div>

        <div className="pt-20 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center space-x-8">
            <div className="glass-3d-wrapper">
              <div className="glass-3d-logo w-14 h-14 flex items-center justify-center rounded-[2px] border-zinc-200 dark:border-zinc-900 shadow-none">
                 <div className="glass-3d-shine" />
                 <div className="glass-3d-content">
                    <span className="text-zinc-900 dark:text-white font-serif italic font-bold text-lg">EN</span>
                 </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-900 dark:text-white tracking-tighter font-sans">EN STUDIO</span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-700 font-bold mt-1 font-sans">Linguistic Precision Operations &copy; 2024</span>
            </div>
          </div>

          <div className="flex items-center space-x-12">
            <a 
              href="#" 
              onClick={handleTopScroll} 
              className="group flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all focus:outline-none focus:text-zinc-900 dark:focus:text-white focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800 rounded-lg px-3 py-2 -mx-3 -my-2 font-sans"
            >
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-full group-hover:-translate-y-2 transition-transform duration-500 bg-white dark:bg-zinc-900 group-hover:shadow-lg">
                <ChevronUp size={14} />
              </div>
              <span>Return to Apex</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;