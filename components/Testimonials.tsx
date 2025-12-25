import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Motion';
import { TESTIMONIALS } from '../constants.tsx';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 px-6 md:px-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-500 border-b border-zinc-200 dark:border-zinc-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-20">
          <Reveal>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-400">03 / Endorsements</span>
              <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <h2 className="text-6xl font-serif italic text-zinc-900 dark:text-zinc-50 leading-none">Client Testimony</h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={t.id} delay={idx * 0.1} distance={20}>
              <div className="group p-10 md:p-14 bg-[#FDFDFB] dark:bg-[#0D0D0D] border border-zinc-200 dark:border-zinc-900 rounded-[2px] h-full flex flex-col relative transition-all duration-700 hover:shadow-2xl hover:shadow-zinc-900/5 dark:hover:shadow-white/5">
                <div className="absolute top-10 right-10 text-zinc-100 dark:text-zinc-800 pointer-events-none group-hover:text-zinc-200 dark:group-hover:text-zinc-700 transition-colors">
                  <Quote size={40} />
                </div>
                
                <div className="flex space-x-1 mb-10">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      fill={i < t.rating ? "currentColor" : "none"} 
                      className={i < t.rating ? "text-zinc-900 dark:text-zinc-400" : "text-zinc-200 dark:text-zinc-800"} 
                    />
                  ))}
                </div>

                <blockquote className="flex-1 mb-12">
                  <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-zinc-600 dark:text-zinc-300">
                    "{t.content}"
                  </p>
                </blockquote>

                <div className="pt-10 border-t border-zinc-50 dark:border-zinc-800/50 flex flex-col space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 dark:text-white">{t.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-medium text-zinc-400">
                    {t.role} <span className="mx-2 text-zinc-200 dark:text-zinc-800">/</span> {t.organization}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-24 text-center">
           <p className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-300 dark:text-zinc-700 mb-8">Verified Archive Records</p>
           <div className="flex justify-center items-center space-x-12 opacity-30 grayscale contrast-150 invert dark:invert-0">
              <span className="text-xs font-black tracking-tighter italic">Vanguard.</span>
              <span className="text-xs font-black tracking-tighter italic">Sterling & Co.</span>
              <span className="text-xs font-black tracking-tighter italic">Global Health.</span>
              <span className="text-xs font-black tracking-tighter italic">Heritage Uni.</span>
           </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;