import type { Metadata } from 'next';
import LessonsPage from "@/components/pages/lessons-page";
import { subjectsData } from '@/data/subjects-data';

export const metadata: Metadata = {
  title: 'Pelajaran',
};

export default function LessonsRoute() {
  return <LessonsPage subjects={subjectsData} />;
}