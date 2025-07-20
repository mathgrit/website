// Lokasi: data/subjects-data.ts

import type { Subject } from './types';

// Impor data kursus dari file-file yang sudah dipisah
import { calculusCourses } from './courses/calculus';
import { algebraCourses } from './courses/algebra';
import { geometryCourses } from './courses/geometry';
import { discreteCourses } from './courses/discrete'; // Pastikan ini mengimpor dari discrete.ts
import { appliedCourses } from './courses/applied';

export const subjectsData: Subject[] = [
  {
    id: "calculus",
    name: "Kalkulus",
    description: "Pelajari dasar-dasar kalkulus, mulai dari limit, turunan, hingga integral.",
    icon: "Sigma",
    courses: calculusCourses,
  },
  {
    id: "algebra",
    name: "Aljabar",
    description: "Kuatkan fondasi Anda dalam konsep aljabar, dari dasar hingga tingkat lanjut.",
    icon: "Variable",
    courses: algebraCourses,
  },
  {
    id: "geometry",
    name: "Geometri",
    description: "Jelajahi keindahan pembuktian geometris dan penalaran spasial.",
    icon: "Compass",
    courses: geometryCourses,
  },
  {
    id: "discrete",
    name: "Matematika Diskrit",
    description: "Selami dunia kombinatorika, teori graf, dan logika matematika.",
    icon: "Puzzle",
    courses: discreteCourses, // File ini sekarang berisi kedua kursus
  },
  {
    id: "applied",
    name: "Matematika Terapan",
    description: "Pelajari aplikasi matematika di dunia nyata, seperti statistika dan probabilitas.",
    icon: "BarChart2",
    courses: appliedCourses,
  },
];