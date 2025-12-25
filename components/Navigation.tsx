import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('About');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['about', 'work', 'testimonials', 'standards', 'lab', 'resume', 'contact'];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                // Map IDs to Label names
                let label = id.charAt(0).toUpperCase() + id.slice(1);
                if (id === 'testimonials') label = 'Voices';
                
                setActiveSection(prev => prev !== label ? label : prev);
                break; // Exit optimization
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
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Voices', href: '#testimonials' },
    { label: 'Standards', href: '#standards' },
    { label: 'Lab', href: '#lab' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pointer-events-auto flex items-center gap-6">
      {/* Desktop Navigation Tabs */}
      <nav className="hidden md:flex items-center">
        <div className="bg-white/60 dark:bg-black/60 backdrop-blur-xl p-2 rounded-full border border-white/40 dark:border-white/10 shadow-2xl flex items-center relative transition-all duration-300 hover:bg-white/80 dark:hover:bg-black/80 ring-1 ring-zinc-900/5 dark:ring-white/10">
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.label;
              const isHovered = hoveredTab === item.label;
              // Only render the pill if this item is hovered, OR if it's active and NO item is currently hovered.
              const showPill = isHovered || (isActive && !hoveredTab);

              return (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHoveredTab(item.label)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 rounded-full z-10 flex items-center justify-center cursor-pointer ${
                    isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                  }`}
                >
                  <AnimatePresence>
                    {showPill && (
                      <motion.div 
                        layoutId="nav-pill"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`absolute inset-0 rounded-full -z-10 ${
                          isActive 
                          ? 'bg-white dark:bg-zinc-800 shadow-md border border-zinc-100 dark:border-zinc-700' 
                          : 'bg-zinc-100/50 dark:bg-white/5'
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className={`relative z-20 ${isActive ? 'translate-y-px' : ''}`}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
          
          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-4" />

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </nav>

      {/* Action CTA (Desktop) */}
      <motion.button 
        onClick={(e) => handleNavClick(e, '#contact')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex items-center space-x-3 px-8 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full shadow-2xl transition-all group overflow-hidden relative border border-transparent dark:border-zinc-200 hover:shadow-zinc-500/20 dark:hover:shadow-white/20 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-black relative z-10">Archive Intake</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform relative z-10" />
      </motion.button>

      {/* Mobile Trigger */}
      <div className="md:hidden flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 flex items-center justify-center bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-full border border-white/40 dark:border-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="w-12 h-12 flex items-center justify-center bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full shadow-xl cursor-pointer"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:hidden"
          >
            <div className="absolute inset-0 bg-zinc-100/80 dark:bg-black/90 backdrop-blur-2xl transition-all duration-500" onClick={() => setMobileMenuOpen(false)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-[#FDFDFB] to-[#F2F2F0] dark:from-[#1A1A1A] dark:to-[#050505] p-6 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] border border-white/40 dark:border-white/5 overflow-hidden ring-1 ring-black/5 dark:ring-white/5 perspective-1000"
            >
              <div className="flex justify-between items-center mb-8 px-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                  Archive Navigator
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all border border-zinc-200 dark:border-zinc-700 shadow-[0_2px_5px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer active:scale-95"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item, i) => {
                   const isActive = activeSection === item.label;
                   const isLast = i === navItems.length - 1;
                   
                   return (
                    <motion.div
                        key={item.label}
                        onClick={(e) => handleNavClick(e, item.href)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`
                            group flex items-center justify-between px-5 py-4 rounded-2xl transition-all cursor-pointer relative overflow-hidden select-none
                            ${isLast ? 'col-span-2' : ''}
                            ${isActive 
                            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)] dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] translate-y-[-2px]' 
                            : 'bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200/50 dark:border-zinc-700/30 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_8px_-1px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-inner'}
                        `}
                    >
                        {/* 3D Surface shine for inactive items */}
                        {!isActive && (
                           <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 pointer-events-none" />
                        )}
                        
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold z-10 ${isActive ? '' : 'drop-shadow-[0_1px_0_rgba(255,255,255,1)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'}`}>
                            {item.label}
                        </span>
                        
                        {isActive ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950 animate-pulse z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:shadow-none" />
                        ) : (
                             <ArrowRight size={10} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 transition-colors drop-shadow-[0_1px_0_rgba(255,255,255,1)] dark:drop-shadow-none" />
                        )}
                    </motion.div>
                   );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-200/50 dark:border-zinc-800">
                 <motion.button
                   onClick={(e) => handleNavClick(e, '#contact')}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="relative w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)] overflow-hidden cursor-pointer group"
                 >
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                   <div className="flex items-center justify-center space-x-3 relative z-10">
                     <span>Initiate Intake</span>
                     <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                   </div>
                 </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;