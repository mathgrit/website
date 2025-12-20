// Lokasi: app/lessons/[subjectId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubjectCoursesPage from '@/components/pages/subject-courses-page';
import { subjectsData } from '@/data/subjects-data';

interface SubjectPageProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata(props: SubjectPageProps): Promise<Metadata> {
  const params = await props.params;
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  
  if (!subject) return { title: 'Subject Not Found' };
  return { title: `${subject.name} Courses - MathGrit` };
}

export default async function SubjectPage(props: SubjectPageProps) {
  const params = await props.params;
  const subject = subjectsData.find((s) => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  return <SubjectCoursesPage subject={subject} />;
}