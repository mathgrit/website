// Lokasi: data/quizzes/calculus-limits-01.ts

import type { Quiz } from '../types';

export const calculusLimitsQuiz: Quiz = {
  id: "calculus-limits-01",
  title: "Limits Fundamentals",
  course: "Calculus I",
  category: "Calculus",
  estimatedTime: 30,
  description: "Test your understanding of limits, continuity, and basic limit laws.",
  difficulty: 3,
  completions: 1250,
  questionCount: 4,
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      question: "What is $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?",
      options: ["0", "1", "$\\infty$", "Undefined"],
      answer: "1",
      explanation: "This is a fundamental trigonometric limit often proven using the Squeeze Theorem.",
      points: 10,
    },
    {
        id: "q2",
        type: "fill_blank",
        question: "Evaluate the limit: $\\lim_{x \\to 3} (2x^2 - 4x + 1)$",
        answer: "7",
        explanation: "Since this is a polynomial function, we can use direct substitution: 2(3)^2 - 4(3) + 1 = 18 - 12 + 1 = 7.",
        points: 10,
    },
    {
        id: "q3",
        type: "multiple_choice",
        question: "What is $\\lim_{x \\to \\infty} \\frac{3x^2 - 2}{5x^2 + 4x}$?",
        options: ["0", "3/5", "$\\infty$", "Undefined"],
        answer: "3/5",
        explanation: "For rational functions where the degree of the numerator and denominator are the same, the limit is the ratio of the leading coefficients.",
        points: 15,
    },
    {
        id: "q4",
        type: "fill_blank",
        question: "Find the limit: $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$",
        answer: "4",
        explanation: "Factor the numerator to (x-2)(x+2), cancel the (x-2) term, and substitute x=2 into (x+2) to get 4.",
        points: 15,
    }
  ],
};