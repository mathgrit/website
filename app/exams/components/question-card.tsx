"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import LatexRenderer from "@/components/ui/latex-renderer"
import type { QuizQuestion as Question } from "@/data/types"

interface QuestionCardProps {
  question: Question
  questionNumber: number
  answer: string
  onAnswerChange: (answer: string) => void
}

export function QuestionCard({ question, questionNumber, answer, onAnswerChange }: QuestionCardProps) {
  return (
    <Card className="w-full bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {questionNumber}</span>
          <span className="text-sm font-normal text-muted-foreground">({question.points} points)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <LatexRenderer>{question.question}</LatexRenderer>
        </div>

        {question.type === "multiple_choice" && question.options && (
          <RadioGroup value={answer} onValueChange={onAnswerChange}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50">
                <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
                <Label htmlFor={`q${question.id}-${index}`} className="flex-1 cursor-pointer text-base">
                  <LatexRenderer>{option}</LatexRenderer>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "fill_blank" && (
          <div className="space-y-2">
            <Label htmlFor={`answer-${question.id}`}>Your Answer:</Label>
            <Input
              id={`answer-${question.id}`}
              value={answer || ""}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Enter your answer..."
              className="text-base"
            />
          </div>
        )}

        {question.type === "step_proof" && (
          <div className="space-y-2">
            <Label htmlFor={`essay-${question.id}`}>Your Solution:</Label>
            <Textarea
              id={`essay-${question.id}`}
              value={answer || ""}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Show your work and explain your solution..."
              rows={8}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}