import React from 'react';
import { Reveal } from './Motion';
import { Download, FileText, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

const Resume: React.FC = () => {
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const cvContent = `EDWIN NYANDIKA
Precision Transcriptionist
Nairobi HQ • Global Operations
edwinfrelancer@gmail.com
+254 718 616 917

PROFILE
Lead Archival Transcriptionist specializing in critical documentation and linguistic fidelity. 
Focused on preserving intent with surgical precision.

SPECIALIZATION
- Legal Depositions
- Clinical Rounds
- Academic Research
- Board Directives
- Media Archives

EXPERIENCE
Lead Archival Freelancer (2023 — Present)
Overseeing high-fidelity documentation pipelines for multi-national agencies. 
Architected a custom QA loop achieving 99.8% semantic accuracy.

Transcription Intern (2022 — 2023)
Mastered the art of verbatim legal drafting under senior forensic transcribers. 
Optimized turnaround cycles by 15% through workflow automation.

EDUCATION
Transcription Certification (Grad. 2022)
Specialization in Medical and Legal Standards

METRICS
WPM: 95+ (Certified)
Accuracy: 99.9% (Verbatim)
Availability: 24/7 Global

Visit the portfolio for full interactive dossier.`;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Edwin_Nyandika_CV.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="resume" className="py-40 px-6 md:px-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-500 overflow-hidden border-b border-zinc-200 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
          <Reveal>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-900 dark:text-white">Credentials</span>
              <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <h2 className="text-7xl md:text-9xl font-serif italic leading-none tracking-tighter">Manifesto.</h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="flex flex-col items-start space-y-6 pt-12">
               <a 
                 href="#" 
                 onClick={handleDownload}
                 className="group flex items-center space-x-6 text-[11px] uppercase tracking-[0.4em] font-black text-zinc-900 dark:text-white"
               >
                 <span>Download Full Dossier</span>
                 <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-950 transition-all duration-500">
                   <Download size={16} />
                 </div>
               </a>
               <a 
                 href="#" 
                 onClick={handleDownload}
                 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
               >
                 Curriculum Vitae v2.4
               </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative p-12 md:p-24 bg-[#FDFDFB] dark:bg-[#0C0C0C] border border-zinc-200 dark:border-zinc-900 rounded-[1px] shadow-sm">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
            <h3 className="text-[120px] font-serif font-black tracking-tighter leading-none italic">NYANDIKA</h3>
          </div>

          <div className="relative grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-24">
              <section>
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-900 dark:text-white mb-10 pb-4 border-b border-zinc-200 dark:border-zinc-800">Identify</h4>
                <div className="space-y-6">
                  <h1 className="text-4xl font-serif italic text-zinc-900 dark:text-white">Edwin Nyandika</h1>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">
                    Lead Archival Transcriptionist specializing in critical documentation and linguistic fidelity.
                  </p>
                  <div className="pt-6 space-y-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                    <div className="flex items-center space-x-3"><MapPin size={12} /> <span>Nairobi HQ • Global Operations</span></div>
                    <div className="flex items-center space-x-3"><Mail size={12} /> <span>edwinfrelancer@gmail.com</span></div>
                    <div className="flex items-center space-x-3"><Phone size={12} /> <span>+254 718 616 917</span></div>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-900 dark:text-white mb-10 pb-4 border-b border-zinc-200 dark:border-zinc-800">Specialization</h4>
                <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 font-light">
                  {["Legal Depositions", "Clinical Rounds", "Academic Research", "Board Directives", "Media Archives"].map((item, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-default">
                      <span>{item}</span>
                      <div className="h-px flex-1 mx-4 bg-zinc-50 dark:bg-zinc-900 group-hover:bg-zinc-200 transition-colors" />
                      <span className="text-[9px] font-mono text-zinc-300">0{i+1}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-8 space-y-32">
              <section>
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-900 dark:text-white mb-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">Chronicle</h4>
                <div className="space-y-20">
                  <div className="relative group">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
                      <h5 className="text-2xl font-serif italic text-zinc-900 dark:text-white group-hover:translate-x-2 transition-transform duration-500">Lead Archival Freelancer</h5>
                      <span className="text-[10px] font-mono text-zinc-400">2023 — PRES.</span>
                    </div>
                    <p className="text-lg text-zinc-500 font-light leading-relaxed mb-8">
                      Overseeing high-fidelity documentation pipelines for multi-national agencies. Architected a custom QA loop achieving 99.8% semantic accuracy.
                    </p>
                    <div className="flex flex-wrap gap-3">
                       {["Vim", "Sync", "Legal", "Med"].map(tag => (
                         <span key={tag} className="px-3 py-1 bg-zinc-50 dark:bg-zinc-900 text-[8px] uppercase tracking-widest font-black text-zinc-400 rounded-full">{tag}</span>
                       ))}
                    </div>
                  </div>

                  <div className="relative group opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
                      <h5 className="text-2xl font-serif italic text-zinc-900 dark:text-white group-hover:translate-x-2 transition-transform duration-500">Transcription Intern</h5>
                      <span className="text-[10px] font-mono text-zinc-400">2022 — 2023</span>
                    </div>
                    <p className="text-lg text-zinc-500 font-light leading-relaxed">
                      Mastered the art of verbatim legal drafting under senior forensic transcribers. Optimized turnaround cycles by 15% through workflow automation.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-900 dark:text-white mb-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">Formation</h4>
                <div className="flex justify-between items-center group">
                  <div>
                    <h5 className="text-2xl font-serif italic text-zinc-900 dark:text-white">Transcription Certification</h5>
                    <p className="text-sm text-zinc-500 font-light mt-2">Specialization in Medical and Legal Standards</p>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">GRAD. 2022</span>
                </div>
              </section>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Resume;