// app/exams/components/exam-results-page.tsx
"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, BookOpen, ChevronsDown, ChevronsUp, AlertTriangle } from "lucide-react";
import LatexRenderer from "@/components/ui/latex-renderer";
import type { QuizQuestion as Question } from "@/data/types";

interface ExamResultsPageProps {
  score: number;
  totalPoints: number;
  questions: Question[];
  userAnswers: Record<string, string>;
  onRestart: () => void;
}

// Komponen internal untuk menampilkan tinjauan per soal
function ReviewCard({ question, userAnswer }: { question: Question; userAnswer: string }) {
  const isCorrect = userAnswer?.trim().toLowerCase() === question.answer?.toString().trim().toLowerCase();
  
  return (
    <Card className={`overflow-hidden ${isCorrect ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700'}`}>
      <CardHeader className={`flex flex-row items-center justify-between p-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
        <CardTitle className="text-base font-medium">
          {isCorrect ? (
            <span className="flex items-center text-green-700 dark:text-green-300"><CheckCircle className="h-5 w-5 mr-2" />Benar</span>
          ) : (
            <span className="flex items-center text-red-700 dark:text-red-300"><XCircle className="h-5 w-5 mr-2" />Salah</span>
          )}
        </CardTitle>
        <span className="text-sm font-normal text-muted-foreground">({question.points} points)</span>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-base">
          <LatexRenderer>{question.question}</LatexRenderer>
        </div>
        <div className="text-sm space-y-2">
          <p><strong className="font-semibold">Jawaban Anda:</strong> <LatexRenderer>{userAnswer || "Tidak dijawab"}</LatexRenderer></p>
        </div>
        
        {/* LOGIKA BARU DI SINI */}
        {isCorrect ? (
          // Jika benar, tampilkan pembahasan
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
              <p className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Pembahasan:</p>
              <LatexRenderer>{question.explanation}</LatexRenderer>
          </div>
        ) : (
          // Jika salah, tampilkan pesan ini
          <div className="p-3 flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-300">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p>Kunci jawaban dan pembahasan hanya tersedia untuk jawaban yang benar. Coba lagi lain kali untuk mempelajarinya!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Komponen utama halaman hasil
export function ExamResultsPage({ score, totalPoints, questions, userAnswers, onRestart }: ExamResultsPageProps) {
  const [isReviewing, setIsReviewing] = useState(false);
  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
        <Card className="shadow-lg bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm">
          <CardHeader className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold">Ujian Selesai!</CardTitle>
            <CardDescription className="text-xl text-muted-foreground">Skor Anda: {score} dari {totalPoints} poin</CardDescription>
            <div className="text-6xl font-bold text-blue-600 dark:text-cyan-400 mt-4">{percentage}%</div>
            <Badge variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"} className="mt-2">
              {percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Button onClick={() => setIsReviewing(!isReviewing)} size="lg" variant="outline" className="w-full">
              {isReviewing ? <ChevronsUp className="mr-2 h-4 w-4" /> : <ChevronsDown className="mr-2 h-4 w-4" />}
              {isReviewing ? "Tutup Tinjauan" : "Tinjau Jawaban"}
            </Button>
            <Button onClick={onRestart} size="lg" className="w-full">
              Coba Ujian Lain
            </Button>
          </CardContent>
        </Card>
        
        {isReviewing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
            {questions.map((question) => (
              <ReviewCard key={question.id} question={question} userAnswer={userAnswers[question.id]} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}