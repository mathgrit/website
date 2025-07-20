// Lokasi: data/courses/discrete.ts

import type { Course } from '../types';
import { numberTheoryCourses } from './number-theory'; // Impor data baru

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
  // Gabungkan kursus Teori Bilangan ke dalam array ini
  ...numberTheoryCourses,
];