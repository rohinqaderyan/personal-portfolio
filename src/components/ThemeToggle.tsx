'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { m as motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="focus-ring relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative h-5 w-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 rotate-0 scale-100 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-90 scale-0' : ''
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-0 scale-100' : ''
          }`}
        />
      </div>
    </motion.button>
  )
}
