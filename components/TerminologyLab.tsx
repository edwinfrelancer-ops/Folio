import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Motion';
import { Search, CornerDownLeft, BookOpen, Layers, History, Sparkles, Activity, Info, AlertTriangle, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    puter: any;
  }
}

const LinguisticLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white dark:text-zinc-900" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 8.5C7.5 8.5 9 10 12 10C15 10 16.5 8.5 16.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 15.5C7.5 15.5 9 14 12 14C15 14 16.5 15.5 16.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

const TerminologyLab: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ definition: string; context: string; tip: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const analyzeTerm = async (e?: React.FormEvent, termOverride?: string) => {
    if (e) e.preventDefault();
    const termToAnalyze = termOverride || input;
    if (!termToAnalyze.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!window.puter) {
        throw new Error("Puter.js not initialized. Please verify internet connection.");
      }

      const systemPrompt = "You are a senior linguistic consultant for a high-end transcription archive. Provide a precise definition, industry context, and a 'Transcriptionist's Tip' on how to handle this word. Keep it professional, concise, and editorial. You must output strictly valid JSON (no markdown formatting) with the following keys: definition, context, tip.";
      
      const response = await window.puter.ai.chat([
        { role: "system", content: systemPrompt },
        { role: "user", content: `Provide a linguistic analysis for the term: "${termToAnalyze}"` }
      ]);

      // Handle various response shapes from Puter.js/LLM
      let content = typeof response === 'string' ? response : response?.message?.content || response?.text || "";
      
      if (!content) throw new Error("No analysis generated");

      // Sanitize Markdown code blocks if present
      content = content.replace(/```json\n?|```/g, '').trim();

      const parsedData = JSON.parse(content);
      setResult(parsedData);
      
      if (!history.includes(termToAnalyze)) {
        setHistory(prev => [termToAnalyze, ...prev].slice(0, 5));
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError("Analysis failed. Unable to synthesize term data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lab" className="py-32 px-6 md:px-24 bg-[#FDFDFB] dark:bg-[#080808] transition-colors duration-500 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-zinc-100 dark:bg-zinc-900/40 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-zinc-50 dark:bg-zinc-800/20 rounded-full blur-[100px] -z-10 opacity-40" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
          <Reveal>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-1.5 bg-zinc-900 dark:bg-white rounded-[2px] shadow-lg">
                <LinguisticLogo />
              </div>
              <span className="text-[9px] uppercase tracking-[0.6em] font-black text-zinc-900 dark:text-white">Linguistic Core</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 dark:text-zinc-50 leading-none italic tracking-tighter">Terminology <br />Lab</h2>
          </Reveal>
          
          <Reveal delay={0.2} direction="left">
             <div className="text-right hidden md:block">
                <p className="text-[9px] font-mono text-zinc-400 mb-3 uppercase tracking-widest">Spectral Process Sequence</p>
                <div className="flex justify-end space-x-1">
                  {[...Array(18)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [3, 12, 3], opacity: [0.1, 0.8, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                      className="w-px bg-zinc-900 dark:bg-zinc-500 rounded-full"
                    />
                  ))}
                </div>
             </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal delay={0.3}>
              <div className="relative">
                {/* Frosted Glass Input Panel */}
                <div className="relative group rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl transition-all duration-500" />
                  
                  {/* Processing State Glow Animation */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent dark:via-emerald-400/5" />
                         <motion.div 
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-12"
                         />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`absolute inset-0 border rounded-3xl pointer-events-none transition-colors duration-500 ${loading ? 'border-emerald-500/20 dark:border-emerald-400/20' : 'border-white/60 dark:border-white/10'}`} />
                  
                  <div className="relative p-8 md:p-12 z-10">
                    <form onSubmit={analyzeTerm} className="space-y-10">
                      <div className="w-full relative">
                        <label className="text-[8px] uppercase tracking-[0.4em] font-black text-zinc-400 mb-4 block">Term Intake</label>
                        <input 
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          readOnly={loading}
                          placeholder="Enter specialized jargon..."
                          className={`w-full bg-transparent text-2xl md:text-4xl font-serif italic focus:outline-none border-b pb-4 transition-all duration-500 ${
                            loading 
                            ? 'text-zinc-400 dark:text-zinc-600 border-emerald-500/30 cursor-wait placeholder:text-zinc-200 dark:placeholder:text-zinc-800' 
                            : 'text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700'
                          }`}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          disabled={loading || !input.trim()}
                          className="group relative px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full text-[10px] uppercase tracking-[0.25em] font-black flex items-center justify-center gap-4 shadow-2xl hover:shadow-zinc-900/20 dark:hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:pointer-events-none overflow-hidden border border-transparent hover:border-zinc-700 dark:hover:border-zinc-200"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-black/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                          
                          {loading ? (
                             <div className="flex items-center gap-3">
                               <div className="w-3 h-3 border-2 border-white/30 dark:border-zinc-900/30 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                               <span>Processing Signal</span>
                             </div>
                          ) : (
                             <>
                               <span className="relative z-10">Execute Analysis</span>
                               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                             </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 min-h-[300px]">
              <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 flex items-center space-x-3 text-red-600 dark:text-red-400"
                    >
                        <AlertTriangle size={16} />
                        <span className="text-[10px] font-mono">{error}</span>
                    </motion.div>
                )}

                {loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 space-y-6"
                  >
                    <div className="relative w-48 h-[1px] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900 to-transparent dark:via-white"
                      />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-300 dark:text-zinc-600 animate-pulse">Synthesizing Context</span>
                  </motion.div>
                )}

                {result && !loading && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="rounded-3xl overflow-hidden relative shadow-2xl"
                  >
                    {/* Results Container Background */}
                    <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl z-0" />
                    <div className="absolute inset-0 border border-white/50 dark:border-white/5 rounded-3xl z-10 pointer-events-none" />
                    
                    <div className="relative z-20 p-8 md:p-10 grid gap-8">
                       <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-zinc-400">
                            <BookOpen size={16} className="text-zinc-900 dark:text-white" />
                            <span className="text-[9px] uppercase tracking-[0.4em] font-black">Definition</span>
                          </div>
                          <h3 className="text-2xl md:text-4xl font-serif italic text-zinc-900 dark:text-zinc-50 leading-tight">
                            "{result.definition}"
                          </h3>
                       </div>

                       <div className="h-px w-full bg-zinc-100 dark:bg-white/5" />

                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <div className="flex items-center space-x-2 text-zinc-400">
                                <Layers size={14} />
                                <span className="text-[8px] uppercase tracking-[0.3em] font-black">Context</span>
                             </div>
                             <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                               {result.context}
                             </p>
                          </div>

                          <div className="space-y-3">
                             <div className="flex items-center space-x-2 text-zinc-900 dark:text-white">
                                <Activity size={14} />
                                <span className="text-[8px] uppercase tracking-[0.3em] font-black">Tip</span>
                             </div>
                             <div className="p-4 bg-zinc-50 dark:bg-white/5 rounded-xl border border-zinc-100 dark:border-white/5">
                               <p className="text-sm text-zinc-700 dark:text-zinc-200 font-medium italic">
                                 {result.tip}
                               </p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal delay={0.5}>
              <div className="bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl p-8 rounded-3xl border border-white/60 dark:border-white/5 shadow-lg relative overflow-hidden">
                <div className="flex items-center space-x-3 mb-8 text-zinc-400">
                  <History size={14} />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black">Recent Queries</span>
                </div>
                
                <div className="space-y-3">
                  {history.length === 0 ? (
                    <div className="py-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                      <p className="text-[9px] text-zinc-400 uppercase tracking-widest">No intake recorded</p>
                    </div>
                  ) : (
                    history.map((term, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => {
                          setInput(term);
                          analyzeTerm(undefined, term);
                        }}
                        className="w-full flex justify-between items-center group text-left p-4 bg-white/20 dark:bg-zinc-900/40 backdrop-blur-md hover:bg-white/50 dark:hover:bg-zinc-800/50 rounded-xl border border-white/40 dark:border-white/10 hover:border-white/80 dark:hover:border-white/20 shadow-sm hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-500 relative overflow-hidden"
                      >
                         {/* Hover Shine Effect */}
                         <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex items-center space-x-4 relative z-10">
                           <div className="w-8 h-8 rounded-full bg-white/40 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors border border-white/20 dark:border-white/5 shadow-inner">
                              <Sparkles size={12} />
                           </div>
                           <span className="text-sm font-serif italic text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors capitalize">{term}</span>
                        </div>
                        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                           <CornerDownLeft size={14} className="text-zinc-900 dark:text-white" />
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminologyLab;