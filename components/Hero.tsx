import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Motion';
import { Activity } from 'lucide-react';

// Audio Visualizer Component
const AudioBars = () => (
  <div className="flex items-end gap-[3px] h-6">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          height: [6, 20 + Math.random() * 10, 6],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 1 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.05
        }}
        className="w-[2px] bg-emerald-400/80 rounded-t-[1px]"
      />
    ))}
  </div>
);

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); 
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const titleVariant = {
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const titleTransition = (delay: number) => ({
    duration: 1.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Weighty, cinematic lift
  });

  const words = [
    { text: "Capturing", type: "primary", delay: 0.3 },
    { text: "the", type: "secondary", delay: 0.45 },
    { text: "Weight", type: "primary", delay: 0.6 },
    { text: "of", type: "italic", delay: 0.75 },
    { text: "Words.", type: "italic", delay: 0.9 }
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 lg:px-32 pt-32 pb-32 bg-[#FDFDFB] dark:bg-[#080808] transition-colors duration-700 overflow-hidden">
      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 vertical-grid pointer-events-none opacity-[0.03] dark:opacity-[0.07]" />
      
      {/* Background Decor 1 (Right) - Moves Down */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/4 -right-40 w-[800px] h-[800px] bg-zinc-100 dark:bg-zinc-900/40 rounded-full blur-[160px] -z-10" 
      />

      {/* Background Decor 2 (Left) - Moves Up (Parallax Depth) */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-zinc-50 dark:bg-zinc-800/30 rounded-full blur-[140px] -z-10" 
      />

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Typography */}
          <div className="lg:col-span-7 relative z-20">
            
            <div className="relative mb-20">
              <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-serif italic font-medium leading-[0.85] tracking-tighter text-zinc-950 dark:text-zinc-50 flex flex-wrap">
                {words.map((word, i) => (
                  <div key={i} className="overflow-hidden inline-flex mr-[0.25em]">
                    <motion.span 
                      className={`block ${
                        word.type === 'secondary' ? 'text-zinc-200 dark:text-zinc-800 not-italic font-normal' : 
                        word.type === 'italic' ? 'italic font-light' : ''
                      }`}
                      variants={titleVariant}
                      initial="initial"
                      animate="animate"
                      transition={titleTransition(word.delay)}
                    >
                      {word.text}
                    </motion.span>
                  </div>
                ))}
              </h1>
            </div>

            <Reveal delay={1.2} distance={20}>
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light leading-[1.6] max-w-2xl text-balance">
                High-fidelity transcription for critical interaction. Preserving every <span className="text-zinc-950 dark:text-zinc-100 font-medium italic serif">syllable</span> with surgical precision.
              </p>
            </Reveal>
            
            <div className="flex flex-wrap gap-8 mt-16">
              <Reveal delay={1.6} distance={20}>
                <motion.div 
                  role="button"
                  onClick={() => handleScroll('work')}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] uppercase tracking-[0.4em] font-black rounded-[2px] shadow-2xl transition-all inline-block text-center cursor-pointer select-none"
                >
                  Enter Library
                </motion.div>
              </Reveal>
              <Reveal delay={1.8} distance={20}>
                <motion.div 
                  role="button"
                  onClick={() => handleScroll('resume')}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl text-[10px] uppercase tracking-[0.4em] font-black rounded-[2px] transition-all inline-block text-center cursor-pointer select-none"
                >
                  Archive Dossier
                </motion.div>
              </Reveal>
            </div>
          </div>
          
          {/* Right Column: Cinematic Portrait */}
          <div className="lg:col-span-5 hidden lg:block relative h-full min-h-[600px] perspective-[1000px]">
             
             {/* Decorative Background Elements */}
             <Reveal delay={1.8} className="absolute top-12 -right-12 w-[80%] h-[90%] border border-zinc-200 dark:border-white/5 rounded-[1px] -z-10 opacity-60" />
             <Reveal delay={1.9} className="absolute -bottom-6 -left-6 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 -z-10" />

             <Reveal delay={1.6} className="relative h-full w-full">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full aspect-[3/4] rounded-[4px] overflow-hidden shadow-2xl shadow-zinc-900/10 dark:shadow-black/40 group border border-white/10 bg-zinc-100 dark:bg-zinc-900"
                >
                   {/* Reveal Mask */}
                   <motion.div 
                     initial={{ y: "0%" }}
                     animate={{ y: "100%" }}
                     transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 1.2 }}
                     className="absolute inset-0 bg-[#FDFDFB] dark:bg-[#080808] z-40 pointer-events-none"
                   />
                   
                   {/* Main Image Layer */}
                   <motion.div className="relative w-full h-full overflow-hidden">
                       <motion.img 
                         initial={{ scale: 1.2, filter: "grayscale(100%) contrast(1.1)" }}
                         animate={{ scale: 1.05, filter: "grayscale(10%) contrast(1.05)" }}
                         whileHover={{ scale: 1, filter: "grayscale(0%) contrast(1)" }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         src="Edu.png"
                         alt="Edwin Nyandika" 
                         className="w-full h-full object-cover"
                       />
                       
                       {/* Scanline Effect - Digital Archive Feel */}
                       <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay opacity-30" />
                       
                       {/* Vignette & Gradient */}
                       <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-80 z-20" />
                   </motion.div>

                   {/* Floating Glass UI - Top Right */}
                   <div className="absolute top-6 right-6 z-30">
                      <div className="glass-island px-3 py-1.5 rounded-full flex items-center gap-3 border border-white/10 bg-black/20 backdrop-blur-md">
                         <div className="flex gap-1">
                           <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                           <span className="w-1 h-1 rounded-full bg-white/20" />
                           <span className="w-1 h-1 rounded-full bg-white/20" />
                         </div>
                         <span className="text-[8px] font-mono text-white/90 uppercase tracking-widest">Rec_Mode</span>
                      </div>
                   </div>

                   {/* Info Block - Bottom Left */}
                   <div className="absolute bottom-8 left-8 right-8 z-30">
                      <div className="flex justify-between items-end">
                         <div className="overflow-hidden space-y-2">
                            <motion.div 
                              initial={{ y: "100%" }}
                              animate={{ y: 0 }}
                              transition={{ delay: 2, duration: 0.8 }}
                              className="flex items-center gap-2 mb-2"
                            >
                               <div className="px-2 py-0.5 bg-white text-black text-[8px] font-black uppercase tracking-widest rounded-[1px]">
                                  Expert
                               </div>
                               <span className="text-[9px] font-mono text-white/60">ID: 8821-EN</span>
                            </motion.div>

                            <motion.h3 
                              initial={{ y: "100%" }}
                              animate={{ y: 0 }}
                              transition={{ delay: 2.1, duration: 0.8 }}
                              className="text-4xl font-serif italic text-white"
                            >
                              Edwin Nyandika
                            </motion.h3>

                            <motion.p
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: 2.3, duration: 1 }}
                               className="text-xs text-zinc-300 font-light max-w-[200px] leading-relaxed"
                            >
                               Precision transcription for legal, medical, and academic archives.
                            </motion.p>
                         </div>
                         
                         {/* Audio Visualizer */}
                         <motion.div 
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }}
                           transition={{ delay: 2.5 }}
                           className="pb-1"
                         >
                           <AudioBars />
                         </motion.div>
                      </div>
                   </div>
                   
                   {/* Animated Border Line */}
                   <div className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-500 z-30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                </motion.div>
             </Reveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-24 pointer-events-none z-0">
        <Reveal delay={2.2} direction="up" distance={10}>
          <div className="flex flex-col space-y-6">
             <div className="h-24 w-px bg-zinc-200 dark:bg-zinc-800" />
             <span className="text-[9px] uppercase tracking-[1em] font-black text-zinc-300 dark:text-zinc-700 rotate-90 origin-left translate-x-2.5 whitespace-nowrap">Explore Archive</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;