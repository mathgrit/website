"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface CourseProgress {
  [courseId: string]: number
}

interface ProgressContextType {
  progress: CourseProgress
  updateProgress: (courseId: string, progress: number) => void
  getProgress: (courseId: string) => number
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>({
    "calc-101": 65,
    "algebra-basics": 90,
    "geometry-intro": 45,
    "discrete-math": 30,
    "linear-algebra": 75,
    statistics: 20,
  })

  const updateProgress = (courseId: string, newProgress: number) => {
    setProgress((prev) => ({
      ...prev,
      [courseId]: newProgress,
    }))
  }

  const getProgress = (courseId: string) => {
    return progress[courseId] || 0
  }

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, getProgress }}>{children}</ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider")
  }
  return context
}
