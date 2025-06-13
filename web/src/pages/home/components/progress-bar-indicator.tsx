import { motion } from 'motion/react'

export function ProgressBarIndicator() {
  return (
    <motion.div
      className="bg-blue-base absolute top-0 left-0 h-1 w-1/4"
      animate={{
        left: ['0%', '100%'],
      }}
      transition={{
        duration: 0.7,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  )
}
