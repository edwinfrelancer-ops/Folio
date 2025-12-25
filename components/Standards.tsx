
import React from 'react';
import { Reveal } from './Motion';
import { WORKFLOW, SKILLS } from '../constants.tsx';
import { ShieldCheck, Target, Zap, ChevronRight } from 'lucide-react';

const Standards: React.FC = () => {
  return (
    <section id="standards" className="py-32 px-6 md:px-24 bg-white dark:bg-[#0C0C0C] text-zinc-900 dark:text-zinc-50 overflow-hidden relative border-b border-zinc-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-24">
          <Reveal>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-400">04 / Protocol</span>
              <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic leading-[0.85] tracking-tighter">Operational <br />Rigour.</h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-16">
            <Reveal delay={0.2}>
              <p className="text-xl font-light leading-relaxed text-zinc-500 max-w-xs">
                My workflow is built on a foundation of absolute confidentiality and architectural clarity.
              </p>
            </Reveal>

            <div className="space-y-12">
              {SKILLS.map((skill, i) => (
                <Reveal key={i} delay={0.3 + (i * 0.1)}>
                  <div className="group space-y-4">
                    <div className="flex items-center space-x-3 text-zinc-300 dark:text-zinc-700 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                      {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 18 })}
                      <span className="text-[10px] uppercase tracking-widest font-black">Core Pillar</span>
                    </div>
                    <h4 className="text-2xl font-serif italic text-zinc-900 dark:text-white">{skill.title}</h4>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-xs">
                      {skill.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.5}>
              <div className="relative p-12 md:p-20 bg-[#FDFDFB] dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 rounded-[2px] overflow-hidden">
                <div className="absolute top-10 right-10 text-[10px] font-mono text-zinc-200 dark:text-zinc-800 select-none">
                  SYSTEM_ID: ARCH-772
                </div>
                
                <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-400 mb-16 pb-8 border-b border-zinc-200 dark:border-zinc-800">Operational Lifecycle</h3>
                
                <div className="space-y-0">
                  {WORKFLOW.map((step, i) => (
                    <div key={i} className="group py-12 border-b border-zinc-200 dark:border-zinc-800 last:border-0 flex gap-12 items-start transition-all duration-500 hover:px-6">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700 mb-2">P-0{i+1}</span>
                        <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-3xl font-serif italic text-zinc-900 dark:text-white group-hover:translate-x-4 transition-transform duration-700">{step.title}</h4>
                          <ChevronRight size={18} className="text-zinc-200 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        <p className="text-sm text-zinc-500 font-light max-w-md leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 flex flex-wrap gap-12 items-center justify-center">
                  {[
                    { icon: <ShieldCheck size={16} />, label: "End-to-End Encryption" },
                    { icon: <Target size={16} />, label: "Bespoke Human QA" },
                    { icon: <Zap size={16} />, label: "4-Hour Fast-Track" }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3 text-zinc-300">
                      {feat.icon}
                      <span className="text-[9px] uppercase tracking-widest font-black">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Standards;
