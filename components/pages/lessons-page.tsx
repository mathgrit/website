"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Sigma, Variable, Compass, Puzzle, BarChart2, HelpCircle } from "lucide-react";
import type { Subject } from "@/data/types";

// Buat pemetaan dari nama string ke komponen ikon
const iconMap = {
  Sigma,
  Variable,
  Compass,
  Puzzle,
  BarChart2,
};

export default function LessonsPage({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mata Kuliah
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pilih satu mata kuliah untuk memulai atau melanjutkan perjalanan belajar Anda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => {
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || HelpCircle;
            
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/lessons/${subject.id}`} className="block h-full">
                  <Card className="h-full bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 hover:shadow-xl transition-all duration-300 group flex flex-col text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                        {subject.description}
                      </p>
                      <div className="flex items-center justify-center text-blue-600 dark:text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Lihat Kursus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}