import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ValentineCardProps {
  animationComplete: boolean;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ animationComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const messages = [
    "You are the CSS to my HTML — everything makes sense when you're here.",
    "You turn my bugs into features.",
    "Our connection has zero latency.",
    "You refactor my chaos into clarity.",
    "In a world of variables, you're my constant.",
    "You're the missing semicolon to my code.",
    "My love for you is like a stack overflow — it just keeps growing.",
  ];

  // Rotate through messages
  useEffect(() => {
    if (!animationComplete) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [animationComplete, messages.length]);

  if (!animationComplete) return null;

  return (
    <div className="valentine-card-container">
      <motion.div 
        className="valentine-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h1 className="title">Happy Valentine's Day</h1>
        <p className="subtitle">
          celebrating connection, kindness, and the beautiful code that brings hearts together
        </p>
        
        <div className="divider" />
        
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            className="message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {messages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ValentineCard;
