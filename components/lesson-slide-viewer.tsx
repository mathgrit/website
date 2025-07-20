"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import LatexContentRenderer from '@/components/ui/latex-content-renderer'; // Impor parser baru
import type { Slide } from '@/data/types';

interface LessonSlideViewerProps {
  slides: Slide[];
}

export default function LessonSlideViewer({ slides }: LessonSlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const progressPercentage = slides.length > 0 ? ((currentSlide + 1) / slides.length) * 100 : 0;
  const slide = slides[currentSlide];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm">
        <CardContent className="p-8 min-h-[550px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              {/* Gunakan komponen parser baru di sini */}
              <LatexContentRenderer text={slide.content} />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex items-center justify-between gap-4">
        <Button onClick={goToPreviousSlide} disabled={currentSlide === 0} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="flex-grow flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Slide {currentSlide + 1} of {slides.length}
            </span>
            <Progress value={progressPercentage} className="h-2" />
        </div>
        <Button onClick={goToNextSlide} disabled={currentSlide === slides.length - 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}