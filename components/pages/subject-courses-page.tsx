"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Clock, Star, Play, BookOpen, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useProgress } from "@/contexts/progress-context"
import type { Course, Subject } from "@/data/types"

// Komponen menerima 'subject' sebagai prop
export default function SubjectCoursesPage({ subject }: { subject: Subject }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("All")
  const [selectedDuration, setSelectedDuration] = useState<string>("All")
  const { getProgress } = useProgress()

  const courses = subject.courses;

  const levels = ["All", "Beginner", "Intermediate", "Advanced"]
  const durations = ["All", "<10h", "10-20h", ">20h"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "All" || course.difficulty === selectedLevel
    
    let matchesDuration = true
    if (selectedDuration !== "All") {
      const duration = Number.parseInt(course.duration)
      if (selectedDuration === "<10h") matchesDuration = duration < 10
      else if (selectedDuration === "10-20h") matchesDuration = duration >= 10 && duration <= 20
      else if (selectedDuration === ">20h") matchesDuration = duration > 20
    }

    return matchesSearch && matchesLevel && matchesDuration
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <Link href="/lessons" className="inline-flex items-center text-blue-600 dark:text-cyan-400 hover:underline mb-4">
             <ChevronLeft className="h-4 w-4 mr-1" />
             Back to All Subjects
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{subject.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subject.description}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8 flex flex-col gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                    placeholder="Search courses in this subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm"
                />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level:</span>
                    {levels.map((level) => (
                        <Button key={level} variant={selectedLevel === level ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(level)} className="text-xs">{level}</Button>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                    {durations.map((duration) => (
                        <Button key={duration} variant={selectedDuration === duration ? "default" : "outline"} size="sm" onClick={() => setSelectedDuration(duration)} className="text-xs">{duration}</Button>
                    ))}
                </div>
            </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ y: -5 }}>
              <Link href={`/lessons/${subject.id}/${course.id}`}>
                <Card className="h-full bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-4 right-4"><Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-yellow-400"><Star className="h-4 w-4 fill-current" /><span className="ml-1 text-sm font-medium">{course.rating}</span></div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm"><Clock className="h-4 w-4 mr-1" />{course.duration}</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm"><BookOpen className="h-4 w-4 mr-1" />{course.students.toLocaleString()} students</div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Progress</span>
                                <span className="text-gray-900 dark:text-white font-medium">{getProgress(course.id)}%</span>
                            </div>
                            <Progress value={getProgress(course.id)} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">No courses found matching your criteria.</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}