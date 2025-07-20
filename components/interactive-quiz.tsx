"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import LatexRenderer from "@/components/ui/latex-renderer"
import type { Quiz, QuizQuestion, QuizResults } from "@/data/types"

export default function InteractiveQuiz({
  quiz,
  onComplete,
  onClose, // <-- 1. Menerima prop 'onClose' dari induk
}: {
  quiz: Quiz
  onComplete: (results: QuizResults) => void
  onClose: () => void // <-- Definisikan tipe untuk prop baru
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [questionId: string]: string | number }>({})
  const [timeLeft, setTimeLeft] = useState(quiz.estimatedTime * 60)
  const [isPaused, setIsPaused] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [quizFinalResults, setQuizFinalResults] = useState<QuizResults | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>("")

  useEffect(() => {
    if (timeLeft > 0 && !isPaused && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isPaused, showResults])

  useEffect(() => {
    setSelectedAnswer(answers[quiz.questions[currentQuestion].id] || "")
  }, [currentQuestion, answers, quiz.questions])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string | number) => {
    setSelectedAnswer(value)
    const currentQuestionId = quiz.questions[currentQuestion].id
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    let score = 0
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (question.type === "multiple_choice") {
        if (question.options && question.options[Number(userAnswer)] === question.answer) {
          score += question.points
        }
      } else if (userAnswer?.toString().toLowerCase() === question.answer.toString().toLowerCase()) {
        score += question.points
      }
    })

    const results: QuizResults = {
      quizId: quiz.id,
      score: score,
      totalQuestions: quiz.questions.length,
    }

    setQuizFinalResults(results)
    setShowResults(true)
    onComplete(results)
  }

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => handleAnswerChange(parseInt(val))}>
            <div className="space-y-4">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    <LatexRenderer>{option}</LatexRenderer>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )
      case "fill_blank":
        return (
          <Input
            type="text"
            placeholder="Enter your answer..."
            value={selectedAnswer.toString()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="text-center font-mono"
          />
        )
      case "step_proof":
        return (
          <textarea
            placeholder="Write your proof step by step..."
            value={selectedAnswer.toString()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg resize-none font-mono text-sm dark:bg-gray-800 dark:border-gray-700"
          />
        )
      default: return null
    }
  }

  if (showResults && quizFinalResults) {
    const totalPossiblePoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)
    const percentage = totalPossiblePoints > 0 ? Math.round((quizFinalResults.score / totalPossiblePoints) * 100) : 0

    return (
      <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-cyan-400 mb-2">{percentage}%</div>
            <p className="text-gray-600 dark:text-gray-300">You scored {quizFinalResults.score} out of {totalPossiblePoints} possible points.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{formatTime(quiz.estimatedTime * 60 - timeLeft)}</div>
              <p className="text-sm text-green-700 dark:text-green-300">Time Spent</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{quizFinalResults.totalQuestions}/{quiz.questions.length}</div>
              <p className="text-sm text-blue-700 dark:text-blue-300">Questions Answered</p>
            </div>
          </div>
          <Button onClick={onClose} className="w-full"> {/* <-- 2. Menggunakan prop 'onClose' */}
            Back to Quizzes
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{quiz.course}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)}>{isPaused ? "Resume" : "Pause"}</Button>
              <div className={`flex items-center space-x-2 ${timeLeft < 60 ? "text-red-600" : "text-gray-600 dark:text-gray-300"}`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{question.points} points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <LatexRenderer>{question.question}</LatexRenderer>
              </div>
              {renderQuestion(question)}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? "bg-blue-600 text-white"
                      : answers[quiz.questions[index].id] !== undefined
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >{index + 1}</button>
              ))}
            </div>
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">Submit Quiz</Button>
            ) : (
              <Button onClick={nextQuestion}>Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}