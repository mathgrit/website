// Lokasi: app/lessons/[subjectId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubjectCoursesPage from '@/components/pages/subject-courses-page';
import { subjectsData } from '@/data/subjects-data';

interface SubjectPageProps {
  params: { subjectId: string; };
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  if (!subject) return { title: 'Subject Not Found' };
  return { title: `${subject.name} Courses - MathGrit` };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  if (!subject) {
    notFound();
  }
  return <SubjectCoursesPage subject={subject} />;
}