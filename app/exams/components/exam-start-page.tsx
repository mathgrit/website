"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Clock, ListChecks } from "lucide-react"

interface ExamStartPageProps {
  examTitle: string;
  examDuration: number;
  totalQuestions: number;
  onStartExam: () => void;
}

export function ExamStartPage({ examTitle, examDuration, totalQuestions, onStartExam }: ExamStartPageProps) {
  const rules = [
    {
      icon: Clock,
      text: `Anda memiliki waktu ${examDuration} menit untuk menyelesaikan ujian.`,
    },
    {
      icon: ListChecks,
      text: `Ujian ini terdiri dari ${totalQuestions} soal. Pastikan Anda menjawab semuanya.`,
    },
    {
      icon: ShieldCheck,
      text: "Setelah Anda menekan 'Mulai Ujian', waktu akan berjalan dan tidak bisa dijeda.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0d1b2a] dark:to-[#1b263b] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">{examTitle}</CardTitle>
            <CardDescription className="text-lg">Harap baca instruksi di bawah ini dengan saksama.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <rule.icon className="h-6 w-6 flex-shrink-0 text-blue-500 dark:text-cyan-400 mt-1" />
                  <p className="text-muted-foreground">{rule.text}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={onStartExam}
              size="lg"
              className="w-full text-lg py-6"
            >
              Mulai Ujian
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}