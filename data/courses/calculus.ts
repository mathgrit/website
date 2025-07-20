import type { Course } from '../types';

export const calculusCourses: Course[] = [
  {
    id: "calc-101",
    title: "Calculus I: Limits and Derivatives",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermediate",
    duration: "15h",
    topic: "Calculus",
    description: "Master the fundamentals of calculus including limits, continuity, and derivatives.",
    rating: 4.8,
    students: 12500,
    videoPlaylist: "PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
    materials: [
      { name: "Limits Worksheet", type: "pdf", url: "/materials/limits-worksheet.pdf" },
      { name: "Derivative Rules Cheat Sheet", type: "pdf", url: "/materials/derivative-rules.pdf" },
      { name: "Practice Problems", type: "pdf", url: "/materials/calc-practice.pdf" },
    ],
          slides: [
              // --- Slide 1 ---
              {
                content: `
            \\chapter{Introduction to Limits}
            \\section{Definition of Limits}
            In this section, we explore the concept of limits, which forms the foundation of calculus. A limit describes the behavior of a function as its input approaches a particular value. For example, consider the function $f(x) = x^2$. As $x$ gets closer to 2, $f(x)$ gets closer to 4.
            `
              },
              // --- Slide 2 ---
              {
                content: `
            \\section{The Limit Formula}
            The limit of $f(x)$ as $x$ approaches $a$ is written as:
            $\\lim_{x \\to a} f(x) = L$
            This expression means that the value of $f(x)$ gets arbitrarily close to $L$ as $x$ gets closer and closer to $a$.
            `
              },
      ],

  interactiveExamples: [
      {
        title: "Evaluating Limits",
        description: "Learn to evaluate limits step by step using algebraic manipulation.",
        initialExpression: "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}",
        steps: [
          { expression: "\\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x - 2}", explanation: "Factor the numerator: x² - 4 = (x-2)(x+2)" },
          { expression: "\\lim_{x \\to 2} (x+2)", explanation: "Cancel the common factor (x-2)." },
          { expression: "2 + 2 = 4", explanation: "Substitute x = 2 into the simplified expression." },
        ],
      },
      {
        title: "Derivative Using Definition",
        description: "Calculate derivatives using the limit definition.",
        initialExpression: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
        steps: [
          { expression: "f'(x) = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h}", explanation: "For f(x) = x², substitute into the definition." },
          { expression: "f'(x) = \\lim_{h \\to 0} \\frac{x^2 + 2xh + h^2 - x^2}{h}", explanation: "Expand (x+h)²." },
          { expression: "f'(x) = \\lim_{h \\to 0} \\frac{2xh + h^2}{h}", explanation: "Simplify by canceling x² terms." },
          { expression: "f'(x) = \\lim_{h \\to 0} (2x + h) = 2x", explanation: "Factor out h and evaluate the limit." },
        ],
      },
    ],
    keyFormulas: [
      {
        title: "Fundamental Limits",
        formulas: [
          "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
          "\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e",
          "\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1",
        ],
      },
      {
        title: "Derivative Rules",
        formulas: [
          "\\frac{d}{dx}[x^n] = nx^{n-1}",
          "\\frac{d}{dx}[e^x] = e^x",
          "\\frac{d}{dx}[\\ln x] = \\frac{1}{x}",
          "\\frac{d}{dx}[\\sin x] = \\cos x",
        ],
      },
    ],
  },
];