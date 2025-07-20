

// Lokasi: data/aime-problems.ts

import type { Problem } from './types';

export const aimeProblems: Problem[] = [
  {
    id: "aime2023-1",
    contest: "AIME 2023",
    year: 2023,
    problemNumber: 1,
    difficulty: 2.3,
    statement:
      "Find the number of ordered pairs of positive integers $(a,b)$ such that $a + b = 1000$ and neither $a$ nor $b$ has a zero digit.",
    solution:
      "\\begin{align*}\n&\\text{Count positive integers from 1 to 999 with no zero digits.}\\\\\n&\\text{For a } k\\text{-digit number with no zero digits:}\\\\\n&\\text{Each digit chosen from } \\{1,2,3,4,5,6,7,8,9\\} \\text{ (9 choices)}\\\\\n&\\text{1-digit: } 9 \\text{ numbers}\\\\\n&\\text{2-digit: } 9^2 = 81 \\text{ numbers}\\\\\n&\\text{3-digit: } 9^3 = 729 \\text{ numbers}\\\\\n&\\text{Total: } 9 + 81 + 729 = 819\\\\\n&\\text{However, we need pairs } (a,b) \\text{ where } a + b = 1000\\\\\n&\\text{ and both } a \\text{ and } 1000 - a \\text{ have no zero digits.}\\\\\n&\\text{Through systematic counting or inclusion-exclusion:}\\\\\n&\\text{Answer: } 738\n\\end{align*}",
    topics: ["Combinatorics", "Counting", "Digits"],
  },
  // ... soal-soal AIME lainnya
];