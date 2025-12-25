import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Motion';
import { SKILLS } from '../constants.tsx';

const About: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="about" className="py-32 px-6 md:px-24 bg-white dark:bg-[#080808] transition-colors duration-500 relative border-y border-zinc-200 dark:border-zinc-900">
      <div className="absolute inset-0 vertical-grid pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-8">
            <Reveal>
              <div className="flex items-center space-x-4 mb-8">
                <span className="h-[1px] w-12 bg-zinc-900 dark:bg-white" />
                <span className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-900 dark:text-zinc-100">Genesis</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 dark:text-zinc-50 leading-[0.95] tracking-tight mb-16">
                Linguistic precision <br />
                meets <span className="italic font-light text-zinc-400 dark:text-zinc-600">technical rigor.</span>
              </h2>
            </Reveal>
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Philosophy</h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                    My practice is defined by the belief that transcription is not merely converting sound to text, but the <span className="text-zinc-900 dark:text-zinc-100 font-medium">preservation of intent</span>. In high-stakes environments, every syllable holds legal and historical weight.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Technicality</h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                    Specializing in high-complexity medical, legal, and academic archives. I leverage a custom workflow that combines extreme typing speed with multi-layered quality assurance to ensure <span className="text-zinc-900 dark:text-zinc-100 font-medium">absolute fidelity</span>.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-zinc-200 dark:border-zinc-900">
              {[
                { label: "WPM", value: "95+", sub: "Certified" },
                { label: "Accuracy", value: "99.9%", sub: "Verbatim" },
                { label: "Availability", value: "24/7", sub: "Global" },
                { label: "Uptime", value: "100%", sub: "Secure" }
              ].map((stat, i) => (
                <Reveal key={i} delay={0.4 + (i * 0.1)}>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-black text-zinc-400">{stat.label}</p>
                    <p className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 italic">{stat.value}</p>
                    <p className="text-[8px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600">{stat.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex items-center space-x-12 pt-12 border-t border-zinc-200 dark:border-zinc-900/50">
               <div className="hidden md:block">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-300">Core Capabilities</p>
               </div>
               <div className="flex space-x-8">
                  {SKILLS.map((skill, i) => (
                    <div 
                      key={i} 
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(i)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <motion.div 
                        whileHover={{ y: -6, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="p-4 rounded-xl glass-island border border-white/40 dark:border-zinc-800/50 shadow-sm cursor-help transition-all duration-300 hover:bg-white dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] hover:border-zinc-200 dark:hover:border-zinc-700"
                      >
                        {skill.icon}
                      </motion.div>

                      <AnimatePresence>
                        {hoveredSkill === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 z-[110] pointer-events-none"
                          >
                            <div className="glass-island p-6 rounded-2xl border border-white/50 dark:border-zinc-700/50 shadow-2xl backdrop-blur-2xl">
                              <h4 className="text-xs font-serif italic font-bold text-zinc-900 dark:text-white mb-2">{skill.title}</h4>
                              <p className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-light">{skill.description}</p>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/40 dark:border-t-zinc-800/50" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-32">
            <Reveal delay={0.6} direction="left">
              <div className="group relative aspect-[3/4] rounded-[2px] overflow-hidden grayscale contrast-125 border border-zinc-200 dark:border-zinc-900">
                <motion.img 
                  src="https://file-s3-assets.puter.com/2025/02/16/e0e03e05-27a3-4a1e-848e-289569202758.png" 
                  alt="Edwin Nyandika" 
                  className="w-full h-full object-cover opacity-90 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-zinc-900/10 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 p-8">
                   <p className="text-white text-[10px] tracking-[0.5em] font-black uppercase mb-2">Focus Mode</p>
                   <div className="h-px w-8 bg-white/30" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;