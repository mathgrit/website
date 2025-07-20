"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bookmark,
  BookmarkCheck,
  Star,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import MathExpression from "./math-expression"
import type { Problem } from "./problem-data"

interface EnhancedProblemViewerProps {
  problem: Problem
  onBookmark: (problemId: string) => void
  onRate: (problemId: string, rating: number) => void
  isBookmarked: boolean
  userRating?: number
}

export default function EnhancedProblemViewer({
  problem,
  onBookmark,
  onRate,
  isBookmarked,
  userRating,
}: EnhancedProblemViewerProps) {
  const [activeTab, setActiveTab] = useState("problem")
  const [solutionRevealed, setSolutionRevealed] = useState(false)
  const [solutionStep, setSolutionStep] = useState(0)

  const solutionSteps = problem.solution.split("\\\\").filter((step) => step.trim())

  const renderDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(difficulty)
            ? "text-yellow-400 fill-current"
            : i < difficulty
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ))
  }

  const renderUserRating = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button key={i} onClick={() => onRate(problem.id, i + 1)} className="focus:outline-none">
        <Star
          className={`h-4 w-4 transition-colors ${
            userRating && i < userRating
              ? "text-blue-500 fill-current"
              : "text-gray-300 dark:text-gray-600 hover:text-blue-400"
          }`}
        />
      </button>
    ))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm">
            <TabsTrigger value="problem">Problem</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBookmark(problem.id)}
              className={isBookmarked ? "bg-blue-50 dark:bg-blue-900/20" : ""}
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-blue-600" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Problem Tab */}
        <TabsContent value="problem" className="space-y-6">
          <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
            <CardContent className="p-8">
              {/* Problem Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {problem.contest} - Problem {problem.problemNumber}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Difficulty:</span>
                      {renderDifficultyStars(problem.difficulty)}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        ({problem.difficulty.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {problem.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="prose dark:prose-invert max-w-none">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <MathExpression math={problem.statement} display={false} />
                </div>
              </div>

              {/* User Rating */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#415a77]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rate this problem:</span>
                    <div className="flex items-center space-x-1 mt-1">{renderUserRating()}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful (23)
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Not Helpful (2)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Solution Tab */}
        <TabsContent value="solution" className="space-y-6">
          <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
            <CardContent className="p-8">
              {!solutionRevealed ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Solution Available</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Try solving the problem first, then reveal the solution to check your work.
                    </p>
                  </div>
                  <Button
                    onClick={() => setSolutionRevealed(true)}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                  >
                    Reveal Solution
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Step-by-Step Solution</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Step {solutionStep + 1} of {solutionSteps.length}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSolutionStep(Math.max(0, solutionStep - 1))}
                        disabled={solutionStep === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSolutionStep(Math.min(solutionSteps.length - 1, solutionStep + 1))}
                        disabled={solutionStep === solutionSteps.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={solutionStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500"
                    >
                      <MathExpression math={solutionSteps[solutionStep]} display={true} className="text-center" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress Indicator */}
                  <div className="flex justify-center space-x-2">
                    {solutionSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSolutionStep(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === solutionStep
                            ? "bg-blue-500"
                            : index < solutionStep
                              ? "bg-green-500"
                              : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSolutionRevealed(false)
                        setSolutionStep(0)
                      }}
                    >
                      Hide Solution
                    </Button>
                    <Button
                      onClick={() => setSolutionStep(solutionSteps.length - 1)}
                      disabled={solutionStep === solutionSteps.length - 1}
                    >
                      Show All Steps
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discussion Tab */}
        <TabsContent value="discussion" className="space-y-6">
          <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
            <CardContent className="p-8">
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Discussion Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Community discussions and alternative solutions will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
