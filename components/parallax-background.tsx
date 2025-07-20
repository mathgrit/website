"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const mathSymbols = ["∫", "∑", "Δ", "∞", "π", "∂", "√", "∇", "α", "β", "γ", "θ", "λ", "μ", "σ", "φ"]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 dark:from-blue-900/40 dark:to-purple-900/40" />

      {/* Grid Layer */}
      <motion.div
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Floating Math Symbols */}
      {mathSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/20 dark:text-cyan-400/30 font-bold select-none"
          style={{
            left: `${(index * 7 + 10) % 90}%`,
            top: `${(index * 11 + 15) % 80}%`,
            fontSize: `${Math.random() * 2 + 1}rem`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Equation Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
        <div className="text-6xl md:text-8xl font-mono text-blue-600 dark:text-cyan-400 transform rotate-12">
          ∫₋∞^∞ e^(-x²) dx = √π
        </div>
      </div>
    </div>
  )
}
