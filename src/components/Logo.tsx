import React from 'react';
import { Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 group">
      <motion.div
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#2E7D32] shadow-lg shadow-[#2E7D32]/20"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Sprout className="h-6 w-6 text-white" />
        <motion.div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-[#A5D6A7] rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tighter text-[#2E7D32] leading-none">
          BAZAAR
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#A5D6A7] leading-none mt-1">
          E TAZA
        </span>
      </div>
    </div>
  );
}
