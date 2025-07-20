// Lokasi: data/index.ts

import type { Contest } from './types';
import { imoProblems } from './imo-problems';
import { putnamProblems } from './putnam-problems';
import { aimeProblems } from './aime-problems';
import { osnProblems } from './osn-problems';

export const contestData: Contest[] = [
  {
    id: "imo-2023",
    name: "International Mathematical Olympiad",
    year: 2023,
    problemCount: 6,
    difficulty: "High School",
    description: "The most prestigious mathematics competition for high school students worldwide.",
    problems: imoProblems, // <-- Langsung gunakan data yang sudah dipisah
  },
  {
    id: "putnam-2022",
    name: "William Lowell Putnam Competition",
    year: 2022,
    problemCount: 12,
    difficulty: "Undergraduate",
    description: "The premier mathematics competition for undergraduate students in the United States and Canada.",
    problems: putnamProblems, // <-- Langsung gunakan data yang sudah dipisah
  },
  {
    id: "aime-2023",
    name: "American Invitational Mathematics Examination",
    year: 2023,
    problemCount: 15,
    difficulty: "High School",
    description: "A challenging mathematics competition for high school students in the United States.",
    problems: aimeProblems, // <-- Langsung gunakan data yang sudah dipisah
  },
  {
    id: "osn-2025",
    name: "Olimpiade Sains Nasional",
    year: 2025,
    problemCount: 20,
    difficulty: "High School",
    description: "A national mathematics competition for high school students in Indonesia.",
    problems: osnProblems, // <-- Langsung gunakan data yang sudah dipisah
  },
];