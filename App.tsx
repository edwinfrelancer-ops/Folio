import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Standards from './components/Standards';
import TerminologyLab from './components/TerminologyLab';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import LeaveReview from './components/LeaveReview';
import { Reveal } from './components/Motion';
import { Layers, Info, Activity, Database, Hash, Command, Shield, FileText, Mail, Quote } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSectionId, setActiveSectionId] = useState('hero');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['hero', 'about', 'work', 'testimonials', 'standards', 'lab', 'resume', 'contact'];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 300 && rect.bottom >= 300) {
                setActiveSectionId(id);
                break; // Exit once we find the active section
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const sidebarItems = [
    { id: 'hero', icon: <Database size={18} />, label: 'Archive Index' },
    { id: 'about', icon: <Info size={18} />, label: 'Origins' },
    { id: 'work', icon: <Layers size={18} />, label: 'Case Library' },
    { id: 'testimonials', icon: <Quote size={18} />, label: 'Testimony' },
    { id: 'standards', icon: <Shield size={18} />, label: 'Protocols' },
    { id: 'lab', icon: <Command size={18} />, label: 'Term Lab' },
    { id: 'resume', icon: <FileText size={18} />, label: 'Dossier' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Comm Link' },
  ];

  return (
    <div className="relative min-h-screen selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950 transition-colors duration-700 font-sans overflow-x-hidden">
      {/* Figma-style Noise Layer */}
      <div className="fixed inset-0 noise-bg z-[999] pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />
      
      {/* Global Interface Shell Bezel */}
      <div className="fixed inset-0 border-[12px] border-white dark:border-[#080808] z-[90] pointer-events-none transition-colors duration-500" />
      
      {/* Main Persistent Header */}
      <header className="fixed top-3 left-3 right-3 z-[100] px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center space-x-6 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex items-center space-x-4 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-3xl pr-6 pl-2 py-2 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-2xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-zinc-900/60"
          >
            <div className="glass-3d-wrapper">
              <div className="glass-3d-logo w-10 h-10 flex items-center justify-center rounded-xl">
                <div className="glass-3d-shine" />
                <div className="glass-3d-content">
                  <span className="font-serif italic font-bold text-zinc-900 dark:text-white text-sm">EN</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-900 dark:text-white leading-none">EN STUDIO</span>
            </div>
          </motion.div>
        </div>

        <Navigation theme={theme} toggleTheme={toggleTheme} />
      </header>

      {/* LEFT SIDEBAR: Archive Explorer */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[90] hidden 2xl:flex flex-col items-center pointer-events-none">
        <Reveal direction="right" delay={0.5}>
          <div className="pointer-events-auto bg-white/40 dark:bg-zinc-900/20 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/5 rounded-full py-8 px-4 shadow-2xl flex flex-col items-center gap-6 relative overflow-visible">
            {/* Ambient Glow behind the bar */}
            <div className="absolute inset-0 bg-white/5 dark:bg-white/1 rounded-full blur-xl -z-10" />

            {sidebarItems.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <div key={item.id} className="relative group flex items-center">
                   {/* Label Tooltip - Appearing on Right */}
                   <div className={`absolute left-full ml-6 px-4 py-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-[9px] uppercase tracking-[0.2em] font-black rounded-[4px] shadow-xl border border-zinc-100 dark:border-zinc-800 transition-all duration-300 transform origin-left z-50 ${isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-90 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100'}`}>
                      {item.label}
                      <div className="absolute top-1/2 -translate-y-1/2 right-full border-r-[6px] border-r-white dark:border-r-zinc-900 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                   </div>

                   <motion.div
                     role="button"
                     onClick={() => scrollToSection(item.id)}
                     whileHover={{ scale: 1.15 }}
                     whileTap={{ scale: 0.95 }}
                     className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 group cursor-pointer ${
                       isActive 
                       ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.3)]' 
                       : 'bg-transparent text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-800/40'
                     }`}
                   >
                     {item.icon}
                   </motion.div>
                   
                   {/* Active line indicator on the left side of the pill */}
                   {isActive && (
                      <motion.div 
                        layoutId="sidebar-active-indicator"
                        className="absolute -left-[19px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-zinc-900 dark:bg-white rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                   )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* RIGHT SIDEBAR: Metadata Inspector */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[95] hidden 2xl:flex flex-col space-y-12 pointer-events-none">
        <Reveal direction="left" delay={0.7}>
          <div className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-2xl w-56 space-y-8 pointer-events-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 opacity-40">
                <Activity size={12} />
                <span className="text-[8px] uppercase tracking-widest font-black text-zinc-900 dark:text-white">Properties</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] uppercase tracking-widest text-zinc-400 font-bold">Sec_ID</span>
                  <span className="text-[9px] font-mono text-zinc-900 dark:text-white">{activeSectionId.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[7px] uppercase tracking-widest text-zinc-400 font-bold">Fidelity</span>
                  <span className="text-[9px] font-mono text-zinc-900 dark:text-white">99.9%</span>
                </div>
              </div>
            </div>
            
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800/50" />
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3 opacity-40">
                <Hash size={12} />
                <span className="text-[8px] uppercase tracking-widest font-black text-zinc-900 dark:text-white">Context</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className="h-full bg-zinc-900 dark:bg-white"
                  />
                </div>
                <span className="text-[7px] uppercase tracking-widest text-zinc-400 font-bold">Archive Depth</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll Progress Bar (Figma Blue accent) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-900 dark:bg-white z-[110] origin-left"
        style={{ scaleX }}
      />
      
      {/* Review Floating Action Button */}
      <LeaveReview activeSection={activeSectionId} />

      <main className="relative z-10">
        <section id="hero"><Hero /></section>
        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-900/50" />
        
        <section id="about"><About /></section>
        <section id="work"><Portfolio /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="standards"><Standards /></section>
        <section id="lab"><TerminologyLab /></section>
        <section id="resume"><Resume /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
};

export default App;