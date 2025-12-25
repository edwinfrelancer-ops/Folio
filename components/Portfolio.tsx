import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Motion';
import { SAMPLES } from '../constants.tsx';
import { SampleProject } from '../types';
import { X, FileText, ArrowUpRight, RefreshCw, Lock, Unlock, Download, CheckCircle2, ShieldAlert } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [selected, setSelected] = useState<SampleProject | null>(null);
  const [samples, setSamples] = useState<SampleProject[]>(SAMPLES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Access Control State
  const [accessStatus, setAccessStatus] = useState<'locked' | 'requesting' | 'unlocked'>('locked');

  // Reset access status when a new project is selected
  useEffect(() => {
    if (selected) {
      setAccessStatus('locked');
    }
  }, [selected]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const shuffled = [...SAMPLES].sort(() => Math.random() - 0.5);
    setTimeout(() => {
      setSamples(shuffled);
      setIsRefreshing(false);
    }, 1500);
  };

  const handleRequestAccess = () => {
    if (accessStatus === 'unlocked') {
      if (selected) {
        const element = document.createElement("a");
        const file = new Blob([selected.fullContent], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        const filename = `${selected.title.replace(/\s+/g, '_')}_Transcript.txt`;
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
      return;
    }
    
    setAccessStatus('requesting');
    
    // Simulate server verification
    setTimeout(() => {
      setAccessStatus('unlocked');
    }, 2000);
  };

  // Helper to split content for preview vs hidden
  const getContentParts = (text: string) => {
    const parts = text.split('\n\n');
    const preview = parts.slice(0, 2);
    const hidden = parts.slice(2);
    return { preview, hidden };
  };

  return (
    <section id="work" className="py-32 px-6 md:px-24 bg-[#FDFDFB] dark:bg-[#0A0A0A] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-400 mb-6 block">The Library</span>
            <h2 className="text-6xl font-serif text-zinc-900 dark:text-zinc-50 leading-none italic">Archive Collections</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-start md:items-end gap-6">
              <p className="text-sm text-zinc-500 max-w-xs font-light leading-relaxed md:text-right">
                A curated selection of cross-industry documentation, illustrating precision across various linguistic environments.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-3 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-400">
                   <div className={`w-1.5 h-1.5 rounded-full ${isRefreshing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                   <span>{isRefreshing ? "Syncing Database..." : "System Active"}</span>
                </div>
                
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="group relative px-5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[8px] uppercase tracking-[0.2em] font-black overflow-hidden transition-all hover:border-zinc-900 dark:hover:border-white disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-zinc-900 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <div className="relative flex items-center gap-3 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors">
                     <RefreshCw size={10} className={isRefreshing ? "animate-spin" : ""} />
                     <span>Refresh Archive</span>
                  </div>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-zinc-200 dark:border-zinc-900 transition-all duration-500 ${isRefreshing ? 'opacity-50 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
          {samples.map((sample, idx) => (
            <Reveal key={sample.id} delay={idx * 0.05}>
              <motion.div 
                layoutId={`card-${sample.id}`}
                onClick={() => setSelected(sample)}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  zIndex: 20,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group cursor-pointer bg-white dark:bg-transparent border-r border-b border-zinc-200 dark:border-zinc-900 p-10 h-full flex flex-col transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 hover:shadow-2xl hover:shadow-zinc-900/10 dark:hover:shadow-white/5 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-16">
                  <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-800 tracking-tighter">[{sample.id}]</span>
                  <div className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-zinc-800">
                    <ArrowUpRight size={14} className="text-zinc-900 dark:text-white" />
                  </div>
                </div>
                
                <div className="space-y-4 mb-12">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black text-emerald-500 dark:text-emerald-400/60 block">{sample.category}</span>
                  <h3 className="text-3xl font-serif text-zinc-900 dark:text-zinc-50 italic group-hover:translate-x-2 transition-transform duration-500">{sample.title}</h3>
                </div>

                <div className="mt-auto pt-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-t border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-800 transition-colors">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[8px] text-zinc-300 font-light">Metric</span>
                    <span>{sample.accuracy}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-right">
                    <span className="text-[8px] text-zinc-300 font-light">Lead Time</span>
                    <span>{sample.turnaround}</span>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-1 h-0 bg-zinc-900 dark:bg-white transition-all duration-700 group-hover:h-full opacity-0 group-hover:opacity-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 dark:bg-black/98 backdrop-blur-xl"
              onClick={() => setSelected(null)}
            />
            <motion.div 
              layoutId={`card-${selected.id}`}
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.98 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white dark:bg-[#0C0C0C] border border-zinc-200 dark:border-zinc-900 shadow-2xl overflow-hidden flex flex-col rounded-[2px]"
            >
              <div className="p-8 md:p-12 border-b border-zinc-200 dark:border-zinc-900 flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900">
                    <FileText size={24} className="text-zinc-900 dark:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Archive Ref: {selected.id}</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-zinc-900 dark:text-zinc-50 italic">{selected.title}</h3>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-colors">
                  <X size={24} className="text-zinc-400" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-12 md:p-20 bg-[#FDFDFB] dark:bg-[#0A0A0A] relative">
                <div className="max-w-2xl mx-auto">
                   <div className="mb-12 flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-black text-zinc-300">
                     <span className="text-zinc-900 dark:text-white">Transcript Preview</span>
                     <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-900"></span>
                   </div>
                   
                   <div className="text-xl font-serif leading-relaxed text-zinc-600 dark:text-zinc-400 italic space-y-6">
                     {/* Preview Content */}
                     {getContentParts(selected.fullContent).preview.map((para, i) => (
                       <p key={i}>{para}</p>
                     ))}

                     {/* Hidden Content / Blur Effect */}
                     <div className="relative">
                        <motion.div
                          animate={{ 
                            filter: accessStatus === 'unlocked' ? 'blur(0px)' : 'blur(8px)',
                            opacity: accessStatus === 'unlocked' ? 1 : 0.3,
                            userSelect: accessStatus === 'unlocked' ? 'text' : 'none'
                          }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            {getContentParts(selected.fullContent).hidden.map((para, i) => (
                              <p key={i} className="mb-6">{para}</p>
                            ))}
                        </motion.div>

                        {/* Restricted Overlay */}
                        <AnimatePresence>
                          {accessStatus !== 'unlocked' && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-12"
                            >
                               <div className="flex flex-col items-center space-y-4 p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl">
                                  <ShieldAlert size={32} className="text-zinc-900 dark:text-white" />
                                  <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-900 dark:text-white mb-2">Restricted Access</p>
                                    <p className="text-xs text-zinc-500 font-mono">Sensitive archival material. Authorization required.</p>
                                  </div>
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                     </div>
                   </div>
                </div>
              </div>

              <div className="p-8 md:p-12 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 shrink-0 bg-white dark:bg-[#0C0C0C] relative z-20">
                <div className="flex space-x-12">
                   <div>
                     <p className="text-[9px] uppercase tracking-widest font-black text-zinc-400 mb-1">Authenticity Score</p>
                     <p className="text-2xl font-serif text-zinc-900 dark:text-white italic">{selected.accuracy}</p>
                   </div>
                   <div>
                     <p className="text-[9px] uppercase tracking-widest font-black text-zinc-400 mb-1">Expedited Lead Time</p>
                     <p className="text-2xl font-serif text-zinc-900 dark:text-white italic">{selected.turnaround}</p>
                   </div>
                </div>

                <button 
                  onClick={handleRequestAccess}
                  disabled={accessStatus === 'requesting'}
                  className={`relative min-w-[240px] px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-black rounded-[1px] transition-all duration-500 overflow-hidden group ${
                    accessStatus === 'unlocked' 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                  }`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {accessStatus === 'locked' && (
                      <>
                        <Lock size={14} />
                        <span>Request Full Access</span>
                      </>
                    )}
                    {accessStatus === 'requesting' && (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    )}
                    {accessStatus === 'unlocked' && (
                      <>
                        <Download size={14} />
                        <span>Download Transcript</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;