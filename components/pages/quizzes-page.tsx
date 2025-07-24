"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Clock, Star, Play, Trophy, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import InteractiveQuiz from "@/components/interactive-quiz"
import { quizDatabase } from "@/components/quiz-data"
import type { Quiz, QuizResults } from '@/data/types'

// PERUBAHAN: Impor hook dan client Supabase
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabaseClient"

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [timedMode, setTimedMode] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [isClient, setIsClient] = useState(false)

  // --- PERUBAHAN BARU ---
  const { user } = useAuth()
  const [quizHistory, setQuizHistory] = useState<Set<string>>(new Set())
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)

  useEffect(() => {
    // Fungsi untuk mengambil riwayat pengerjaan kuis dari database
    const fetchQuizHistory = async () => {
      if (!user) {
        setIsLoadingHistory(false)
        return
      }
      
      setIsLoadingHistory(true)
      try {
        const { data, error } = await supabase
          .from('exam_results')
          .select('quiz_id')
          .eq('user_id', user.id)

        if (error) throw error;
        
        if (data) {
          // Simpan ID kuis yang sudah dikerjakan ke dalam Set untuk pencarian cepat
          setQuizHistory(new Set(data.map(item => item.quiz_id)))
        }
      } catch (error) {
        console.error("Gagal mengambil riwayat kuis:", error)
      } finally {
        setIsLoadingHistory(false)
      }
    }

    fetchQuizHistory()
  }, [user])
  // --------------------

  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = ["All", "Algebra", "Discrete", "Calculus", "Analysis", "Applied", "Geometry"]
  const quizzes: Quiz[] = quizDatabase

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || quiz.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const renderStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < difficulty ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
  }

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
  }

  const handleQuizComplete = (results: QuizResults) => {
    console.log("Quiz completed:", results)
    // Setelah kuis selesai, perbarui riwayat agar tombol langsung nonaktif
    setQuizHistory(prev => new Set(prev).add(results.quizId))
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Practice Quizzes</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Test your knowledge with adaptive quizzes that adjust to your skill level.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Timed Mode</span>
              <Switch checked={timedMode} onCheckedChange={setTimedMode} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 py-2">Category:</span>
            {categories.map((category) => (
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)} className="text-xs">
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Quiz Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.map((quiz, index) => {
            // --- PERUBAHAN: Cek apakah kuis sudah pernah dikerjakan ---
            const hasTakenQuiz = quizHistory.has(quiz.id);

            return (
              <motion.div key={quiz.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }}>
                <Card className="h-full bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {quiz.category}
                      </Badge>
                      <div className="flex items-center">{renderStars(quiz.difficulty)}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">From: {quiz.course}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">{quiz.description}</p>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center"><Play className="h-4 w-4 mr-1" />{quiz.questionCount} questions</div>
                      <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />~{quiz.estimatedTime} min</div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Trophy className="h-4 w-4 mr-1" />
                        {(quiz.completions ?? 0).toLocaleString()} completed
                      </div>
                    </div>
                    {/* --- PERUBAHAN: Logika pada tombol --- */}
                    <Button
                      onClick={() => startQuiz(quiz)}
                      disabled={hasTakenQuiz || isLoadingHistory}
                      className="w-full mt-auto bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 group-hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:bg-gray-400"
                    >
                      {isLoadingHistory ? 'Loading...' : hasTakenQuiz ? "Sudah Dikerjakan" : "Start Quiz"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {isClient && (
        <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
            {selectedQuiz && (
              <InteractiveQuiz
                quiz={selectedQuiz}
                onComplete={handleQuizComplete}
                onClose={() => setSelectedQuiz(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}