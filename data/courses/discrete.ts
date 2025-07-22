// Lokasi: data/courses/discrete.ts

import type { Course } from '../types';

export const discreteCourses: Course[] = [
  {
    id: "discrete-math",
    title: "Discrete Mathematics",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Advanced",
    duration: "25h",
    topic: "Discrete",
    description: "Dive into combinatorics, graph theory, and mathematical logic.",
    rating: 4.6,
    students: 6400,
  },
  {
    id: "logic-sets",
    title: "Logika dan Himpunan",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Beginner",
    duration: "10h",
    topic: "Discrete",
    description: "Pelajari dasar-dasar logika proposisional, teori himpunan, dan relasi fungsi.",
    rating: 4.7,
    students: 8100,
  },
  {
    id: "nt-101",
    title: "Pengantar Teori Bilangan",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Beginner",
    duration: "12h",
    topic: "Discrete",
    description: "Jelajahi properti bilangan, bilangan bulat, termasuk keterbagian, bilangan prima, dan kongruensi.",
    rating: 4.7,
    students: 7800,
  }
];