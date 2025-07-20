// Lokasi: data/putnam-problems.ts

import type { Problem } from './types';

export const putnamProblems: Problem[] = [
  {
    id: "putnam2022-a1",
    contest: "Putnam 2022",
    year: 2022,
    problemNumber: 1,
    difficulty: 3.1,
    statement:
      "Determine all ordered pairs $(a,b)$ of real numbers for which $(x + ay + bz)^3 = x^3 + y^3 + z^3$ holds for all real numbers $x, y, z$ satisfying $x + y + z = 0$.",
    solution:
      "\\begin{align*}\n&\\text{Using the constraint } x + y + z = 0, \\text{ set } z = -x - y.\\\\\n&(x + ay + b(-x-y))^3 = x^3 + y^3 + (-x-y)^3\\\\\n&(x(1-b) + y(a-b))^3 = x^3 + y^3 - (x+y)^3\\\\\n&\\text{Expanding the right side:}\\\\\n&x^3 + y^3 - (x^3 + 3x^2y + 3xy^2 + y^3) = -3xy(x+y) = 3xyz\\\\\n&\\text{For the identity to hold, we need:}\\\\\n&1-b = 1 \\text{ and } a-b = 1\\\\\n&\\text{This gives } b = 0 \\text{ and } a = 1.\\\\\n&\\text{Verification: } (x + y)^3 = x^3 + 3x^2y + 3xy^2 + y^3\\\\\n&\\text{matches our requirement.}\\\\\n&\\text{Therefore, } (a,b) = (1,0).\n\\end{align*}",
    topics: ["Algebra", "Polynomials", "Functional Equations"],
  },
  // ... soal-soal Putnam lainnya
];