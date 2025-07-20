// Lokasi: data/quizzes/algebra-polynomials-01.ts

import type { Quiz } from '../types';

export const algebraPolynomialsQuiz: Quiz = {
  id: "algebra-polynomials-01",
  title: "Polynomial Operations",
  course: "Algebra Fundamentals",
  category: "Algebra",
  estimatedTime: 25,
  description: "Practice factoring, expanding, and solving polynomial equations.",
  difficulty: 2,
  completions: 2800,
  questionCount: 2,
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      question: "Factor $x^2 - 5x + 6$:",
      options: ["$(x-2)(x-3)$", "$(x-1)(x-6)$", "$(x+2)(x+3)$", "$(x-6)(x+1)$"],
      answer: "$(x-2)(x-3)$",
      explanation: "We need two numbers that multiply to 6 and add to -5. These numbers are -2 and -3.",
      points: 10,
    },
    {
        id: "q2",
        type: "fill_blank",
        question: "Expand the expression: $(x+4)^2$",
        answer: "x^2 + 8x + 16",
        explanation: "Using the formula (a+b)^2 = a^2 + 2ab + b^2, we get x^2 + 2(x)(4) + 4^2.",
        points: 10,
    }
  ],
};