// Lokasi file: components/quiz-data.tsx

import type { Quiz } from '@/data/types';
import { calculusLimitsQuiz } from '@/data/quizzes/calculus-limits-01';
import { algebraPolynomialsQuiz } from '@/data/quizzes/algebra-polynomials-01';
import { ospQuiz } from '@/data/quizzes/osp-quiz-01';

// Gabungkan semua kuis dari file terpisah ke dalam satu array
export const quizDatabase: Quiz[] = [
  calculusLimitsQuiz,
  algebraPolynomialsQuiz,
  ospQuiz,
];