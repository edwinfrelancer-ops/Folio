import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, MessageSquarePlus, CheckCircle2, PenTool, Send } from 'lucide-react';

interface LeaveReviewProps {
  activeSection: string;
}

const LeaveReview: React.FC<LeaveReviewProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    review: ''
  });

  // Logic: Do not show on 'hero' tab. 
  // Also hidden if the modal is open (to prevent button overlap).
  const isVisible = activeSection !== 'hero';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setFormData({ name: '', role: '', review: '' });
        setRating(0);
      }, 2000);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[150] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] border border-white/20 dark:border-zinc-800/20 cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <MessageSquarePlus size={24} className="group-hover:scale-110 transition-transform duration-300" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-[10px] uppercase tracking-widest font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
              Submit Review
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-100/90 dark:bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#FDFDFB] dark:bg-[#0C0C0C] border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-[2px] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white/50 dark:bg-zinc-900/50">
                <div className="flex items-center space-x-3">
                  <PenTool size={16} className="text-zinc-400" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-900 dark:text-white">New Testimony Entry</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 md:p-12 relative">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-3xl font-serif italic text-zinc-900 dark:text-white">Transmission Received.</h3>
                    <p className="text-sm text-zinc-500 max-w-xs">Your review has been archived successfully. Thank you for your feedback.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Star Rating System */}
                    <div className="flex flex-col items-center space-y-4 mb-8">
                      <span className="text-[9px] uppercase tracking-widest font-black text-zinc-400">Quality Assessment</span>
                      <div className="flex space-x-2" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star 
                              size={28} 
                              fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                              className={`transition-colors duration-200 ${
                                (hoverRating || rating) >= star 
                                  ? 'text-zinc-900 dark:text-white' 
                                  : 'text-zinc-300 dark:text-zinc-800'
                              }`} 
                              strokeWidth={1.5}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-serif italic text-zinc-500 h-4">
                        {hoverRating === 5 ? "Exceptional Fidelity" : 
                         hoverRating === 4 ? "High Standard" : 
                         hoverRating === 3 ? "Satisfactory" : 
                         hoverRating > 0 ? "Needs Improvement" : ""}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Identity</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Full Name"
                          className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-serif italic"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Affiliation</label>
                        <input 
                          type="text" 
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          placeholder="Role / Organization"
                          className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-serif italic"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Statement</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.review}
                        onChange={(e) => setFormData({...formData, review: e.target.value})}
                        placeholder="Detail your experience with the archival process..."
                        className="w-full bg-zinc-50 dark:bg-zinc-900/30 p-4 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 resize-none rounded-[2px] leading-relaxed"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting' || rating === 0}
                      className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[10px] uppercase tracking-[0.25em] font-black flex items-center justify-center gap-3 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Encrypting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit to Archive</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeaveReview;