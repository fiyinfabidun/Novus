'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-20">
      <motion.div
        className="w-12 h-12 border-4 border-blue-400 rounded-full"
        animate={{
          borderTopColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
          rotate: 360
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}