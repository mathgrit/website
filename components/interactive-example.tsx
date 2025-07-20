"use client"

import { useState } from "react"
import { Play, RotateCcw, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MathExpression from "./math-expression"

interface InteractiveExampleProps {
  title: string
  description: string
  initialExpression: string
  steps: Array<{
    expression: string
    explanation: string
  }>
}

export default function InteractiveExample({ title, description, initialExpression, steps }: InteractiveExampleProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userExpression, setUserExpression] = useState(initialExpression)
  const [isComplete, setIsComplete] = useState(false)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setUserExpression(steps[currentStep + 1].expression)
    } else {
      setIsComplete(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setUserExpression(initialExpression)
    setIsComplete(false)
  }

  const evaluateExpression = (expr: string) => {
    // Simple expression evaluator for demo
    try {
      // Replace common math symbols for evaluation
      const jsExpr = expr
        .replace(/\\sin/g, "Math.sin")
        .replace(/\\cos/g, "Math.cos")
        .replace(/\\pi/g, "Math.PI")
        .replace(/\^/g, "**")

      // This is a simplified evaluator - in production, use a proper math parser
      return eval(jsExpr)
    } catch {
      return "Invalid expression"
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {isComplete && <CheckCircle className="h-5 w-5 text-green-500" />}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Expression */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-400">
                Result: {evaluateExpression(userExpression)}
              </span>
            </div>
            <MathExpression
              math={userExpression}
              display={true}
              editable={true}
              onEdit={setUserExpression}
              className="text-center"
            />
          </div>

          {/* Current Step Explanation */}
          {currentStep < steps.length && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">{steps[currentStep].explanation}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={reset} size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              {!isComplete && (
                <Button onClick={nextStep} size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Next Step
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
