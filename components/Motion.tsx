
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface RevealProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  distance = 30,
  ...props 
}) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.21, 0.45, 0.32, 0.9] 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  
  return (
    <div className="flex flex-wrap overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: delay + (i * 0.05), 
            ease: "easeOut" 
          }}
          className="mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
