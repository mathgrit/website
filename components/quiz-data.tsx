// Lokasi file: components/quiz-data.ts

// Kita akan pindahkan interface ini ke data/types.ts nanti
export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "fill_blank" | "step_proof";
  question: string;
  options?: string[];
  answer: string | number;
  explanation: string;
  points: number;
}

// PERUBAHAN: Interface disesuaikan dengan kebutuhan komponen
export interface Quiz {
  id: string;
  title: string;
  course: string;
  category: string;
  questionCount: number; // Ditambahkan
  estimatedTime: number; // Menggantikan 'duration'
  difficulty: number;    // Ditambahkan (skala 1-5)
  description: string;
  completions: number;   // Ditambahkan
  questions: QuizQuestion[];
}

export const quizDatabase: Quiz[] = [
  {
    id: "calculus-limits-01",
    title: "Limits Fundamentals",
    course: "Calculus I",
    category: "Calculus",
    estimatedTime: 30,
    description: "Test your understanding of limits, continuity, and basic limit laws.",
    // PERUBAHAN: Menambahkan data yang hilang
    difficulty: 3, // Nilai placeholder, bisa Anda sesuaikan
    completions: 1250, // Nilai placeholder
    questionCount: 4, // Dihitung dari jumlah soal
    questions: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "What is $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?",
        options: ["0", "1", "$\\infty$", "Undefined"],
        answer: 1,
        explanation: "This is a fundamental trigonometric limit...",
        points: 10,
      },
      // ...soal lainnya
    ],
  },
  {
    id: "algebra-polynomials-01",
    title: "Polynomial Operations",
    course: "Algebra Fundamentals",
    category: "Algebra",
    estimatedTime: 25,
    description: "Practice factoring, expanding, and solving polynomial equations.",
    // PERUBAHAN: Menambahkan data yang hilang
    difficulty: 2, // Nilai placeholder, bisa Anda sesuaikan
    completions: 2800, // Nilai placeholder
    questionCount: 2, // Dihitung dari jumlah soal
    questions: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Factor $x^2 - 5x + 6$:",
        options: ["$(x-2)(x-3)$", "$(x-1)(x-6)$", "$(x+2)(x+3)$", "$(x-6)(x+1)$"],
        answer: 0,
        explanation: "We need two numbers that multiply to 6 and add to -5...",
        points: 10,
      },
      // ...soal lainnya
    ],
  },
];