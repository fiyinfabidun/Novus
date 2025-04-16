'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: { 
      y: [0, -10, 0], 
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-20">
      <motion.div 
        className="flex space-x-3" 
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="w-3 h-3 bg-indigo-600 rounded-full"
          variants={dotVariants}
        />
        <motion.div
          className="w-3 h-3 bg-indigo-600 rounded-full"
          variants={dotVariants}
        />
        <motion.div
          className="w-3 h-3 bg-indigo-600 rounded-full"
          variants={dotVariants}
        />
      </motion.div>
    </div>
  );
}