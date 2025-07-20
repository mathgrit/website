// Lokasi: data/courses/number-theory.ts

import type { Course } from '../types';

export const numberTheoryCourses: Course[] = [
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
    
    // Mengganti 'slides' dengan 'pdfUrl' untuk menampilkan file PDF
    pdfUrl: "/materials/Teori Bilangan WM.pdf",
  },
];