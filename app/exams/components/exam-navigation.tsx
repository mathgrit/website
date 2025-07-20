"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { QuizQuestion as Question } from "@/data/types";

interface ExamNavigationProps {
  currentQuestion: number
  totalQuestions: number
  answers: Record<string, string>
  questions: Array<Question>
  onQuestionChange: (questionIndex: number) => void
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
}

export function ExamNavigation({
  currentQuestion,
  totalQuestions,
  answers,
  questions,
  onQuestionChange,
  onPrevious,
  onNext,
  onSubmit,
}: ExamNavigationProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const answeredCount = Object.keys(answers).filter(key => answers[key]?.trim() !== "").length;

  return (
    <div className="space-y-4">
      {/* Question Grid */}
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isAnswered = answers[question.id]?.trim() !== "" && answers[question.id] !== undefined;
          const isCurrent = index === currentQuestion

          return (
            <Button
              key={question.id}
              variant={isCurrent ? "default" : isAnswered ? "secondary" : "outline"}
              size="sm"
              onClick={() => onQuestionChange(index)}
              className={`h-10 w-10 p-0 transition-all duration-200 ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""} ${
                isAnswered && !isCurrent ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200" : ""
              }`}
            >
              {index + 1}
            </Button>
          )
        })}
      </div>

      {/* Progress */}
      <div className="text-center text-sm text-muted-foreground">
        {answeredCount} of {totalQuestions} questions answered
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t dark:border-gray-700">
        <Button variant="outline" onClick={onPrevious} disabled={currentQuestion === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Exam
          </Button>
        ) : (
          <Button onClick={onNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}