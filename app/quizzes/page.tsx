// Lokasi: app/quizzes/page.tsx

import type { Metadata } from 'next';
import QuizzesPage from "@/components/pages/quizzes-page";

// Metadata untuk judul tab browser
export const metadata: Metadata = {
  title: 'Practice Quizzes',
};

// Fungsi ini adalah Server Component yang HANYA menampilkan Client Component (QuizzesPage)
export default function QuizzesRoute() {
  return <QuizzesPage />;
}