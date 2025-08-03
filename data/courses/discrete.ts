// Lokasi: data/courses/discrete.ts

import type { Course } from '../types';
// Kita tidak lagi memerlukan impor numberTheoryCourses karena datanya langsung di sini

export const discreteCourses: Course[] = [
  {
    id: "discrete-math",
    title: "Discrete Mathematics",
    thumbnail: "/diskrit.svg?height=300&width=300",
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
    thumbnail: "/sets.png?height=200&width=300",
    difficulty: "Beginner",
    duration: "10h",
    topic: "Discrete",
    description: "Pelajari dasar-dasar logika proposisional, teori himpunan, dan relasi fungsi.",
    rating: 4.7,
    students: 8100,

    materials: [
      { 
        name: "Logika dan Himpunan", 
        type: "pdf", 
        url: "/materials/Syamsul Bahri-Logika dan Himpunan.pdf" 
      },
    
      { 
        name: "Logika Matematika dan Himpunan", 
        type: "pdf", 
        url: "/materials/Logika Matematika Himpunan.pdf" 
      },

      { 
        name: "Logika Matematika", 
        type: "pdf", 
        url: "/materials/Buku Logika Matematika.pdf" 
      },
    ],
  },
  // --- PERUBAHAN PADA MATA KULIAH TEORI BILANGAN ---
  {
    id: "nt-101",
    title: "Pengantar Teori Bilangan",
    thumbnail: "/terbil.png?height=200&width=300",
    difficulty: "Beginner",
    duration: "12h",
    topic: "Discrete",
    description: "Jelajahi properti bilangan, bilangan bulat, termasuk keterbagian, bilangan prima, dan kongruensi.",
    rating: 4.7,
    students: 7800,
    
    // Mengganti 'pdfUrl' dengan array 'materials'
    materials: [
      { 
        name: "Buku Teori Bilangan", 
        type: "pdf", 
        url: "/materials/Teori Bilangan WM.pdf" 
      },
      // Anda bisa menambahkan buku lain di sini di masa depan
      // { 
      //   name: "Buku Latihan Soal", 
      //   type: "pdf", 
      //   url: "/materials/buku-latihan.pdf" 
      // },
    ],
  },
];