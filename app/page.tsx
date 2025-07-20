import type { Metadata } from 'next';
import HomePage from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: 'MathGrit - Immersive Math Learning',
  description: 'Master mathematics through interactive lessons, adaptive quizzes, and challenging contest problems.',
};

// File ini sekarang adalah Server Component yang menampilkan Client Component (HomePage)
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}