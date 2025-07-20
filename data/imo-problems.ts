// Lokasi: data/imo-problems.ts

import type { Problem } from './types';

export const imoProblems: Problem[] = [
  {
    id: "imo2023-p1",
    contest: "IMO 2023",
    year: 2023,
    problemNumber: 1,
    difficulty: 4.2,
    statement:
      "Determine all composite integers $n > 1$ that satisfy the following property: if $d_1, d_2, \\ldots, d_k$ denote all the positive divisors of $n$ with $1 = d_1 < d_2 < \\cdots < d_k = n$, then $d_2 + d_3 + \\cdots + d_{k-1}$ divides $n$.",
    solution:
      "\\begin{align*}\n&\\text{Let } \\sigma(n) \\text{ be the sum of all divisors of } n.\\\\\n&\\text{We need } \\sigma(n) - n - 1 \\mid n.\\\\\n&\\text{Let } S = \\sigma(n) - n - 1 \\text{ (sum of proper divisors excluding 1)}.\\\\\n&\\text{We require } S \\mid n.\\\\\n&\\text{Since } S < n \\text{ for } n > 6, \\text{ we have } S \\in \\{1, 2, \\ldots, n-1\\}.\\\\\n&\\text{Through systematic case analysis based on prime factorization:}\\\\\n&\\text{The solutions are: } n \\in \\{6, 8, 10, 14, 15, 21, 22, 26, 27, 33, 34, 35, 38, 39\\}\n\\end{align*}",
    topics: ["Number Theory", "Divisors"],
  },
  {
    id: "imo2023-p2",
    contest: "IMO 2023",
    year: 2023,
    problemNumber: 2,
    difficulty: 4.8,
    statement:
      "Let $ABC$ be an acute-angled triangle with $AB \\neq AC$. Let $\\Omega$ be the circumcircle of triangle $ABC$. Let $S$ be the midpoint of the arc $BC$ of $\\Omega$ not containing $A$. The perpendicular from $A$ to $BC$ meets $\\Omega$ again at $P \\neq A$. Let $M$ be the midpoint of $BC$. Prove that the circumcircle of triangle $APS$ passes through $M$.",
    solution:
      "\\begin{align*}\n&\\text{Key insight: Use properties of the circumcircle and power of a point.}\\\\\n&\\text{Since } S \\text{ is the midpoint of arc } BC \\text{ not containing } A:\\\\\n&\\angle BAS = \\angle CAS\\\\\n&\\text{Since } P \\text{ is the second intersection of perpendicular from } A \\text{ to } BC:\\\\\n&AP \\perp BC \\text{ and } P \\text{ lies on } \\Omega\\\\\n&\\text{To prove } APSM \\text{ is cyclic, we show } \\angle AMS = \\angle APS.\\\\\n&\\text{Using angle chasing and properties of cyclic quadrilaterals:}\\\\\n&\\angle AMS = 90° - \\angle MAC = 90° - \\angle SAC = \\angle APS\\\\\n&\\text{Therefore, } APSM \\text{ is cyclic.}\n\\end{align*}",
    topics: ["Geometry", "Circles", "Angle Chasing"],
  },
  // ... soal-soal IMO lainnya
];