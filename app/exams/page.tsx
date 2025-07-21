// app/exams/page.tsx
"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuestionCard } from "./components/question-card"
import { ExamTimer } from "./components/exam-timer"
import { ExamNavigation } from "./components/exam-navigation"
import { ExamStartPage } from "./components/exam-start-page"
import { ExamResultsPage } from "./components/exam-results-page" // <-- Impor komponen baru
import { advancedMathExam } from "@/data/exams/advanced-math-exam-01"
import type { QuizQuestion as Question } from "@/data/types";

export default function MathExamPage() {
  const [examState, setExamState] = useState<"not-started" | "in-progress" | "finished">("not-started");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = useMemo(() => advancedMathExam, []);
  const totalPoints = useMemo(() => questions.reduce((sum, q) => sum + q.points, 0), [questions]);
  const examDuration = 90; // 90 menit

  const handleAnswerChange = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleQuestionChange = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleStartExam = () => {
    setExamState("in-progress");
  };
  
  const calculateScore = useCallback(() => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (!userAnswer) return;
      if (userAnswer.trim().toLowerCase() === question.answer?.toString().trim().toLowerCase()) {
        score += question.points;
      }
    });
    return score;
  }, [answers, questions]);

  const handleSubmit = useCallback(async () => {
    const finalScore = calculateScore();

    try {
      await fetch('/api/exams/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: 'advanced-math-exam-01',
          score: finalScore,
          totalPoints,
          answers,
        }),
      });
    } catch (error) {
      console.error('Error submitting exam:', error);
    } finally {
      setExamState("finished");
    }
  }, [answers, calculateScore, totalPoints]);

  if (examState === "not-started") {
    return (
      <ExamStartPage
        examTitle="Advanced Mathematics Exam"
        examDuration={examDuration}
        totalQuestions={questions.length}
        onStartExam={handleStartExam}
      />
    );
  }

  if (examState === "finished") {
    return (
      <ExamResultsPage
        score={calculateScore()}
        totalPoints={totalPoints}
        questions={questions}
        userAnswers={answers}
        onRestart={() => window.location.reload()}
      />
    );
  }

  const answeredCount = Object.keys(answers).filter(key => answers[key]?.trim() !== "").length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0d1b2a] dark:to-[#1b263b] p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">Advanced Mathematics Exam</CardTitle>
                  <p className="text-muted-foreground mt-1">Answer all questions to the best of your ability</p>
                </div>
                <ExamTimer duration={examDuration} onTimeUp={handleSubmit} />
              </div >
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Progress: {answeredCount} of {questions.length} answered
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionCard
                  question={questions[currentQuestion]}
                  questionNumber={currentQuestion + 1}
                  answer={answers[questions[currentQuestion].id] || ""}
                  onAnswerChange={(answer) => handleAnswerChange(questions[currentQuestion].id, answer)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24 bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <ExamNavigation
                  currentQuestion={currentQuestion}
                  totalQuestions={questions.length}
                  answers={answers}
                  questions={questions}
                  onQuestionChange={handleQuestionChange}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}