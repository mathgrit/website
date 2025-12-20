// Lokasi: app/lessons/[subjectId]/[courseId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EnhancedLessonContentPage from '@/components/pages/enhanced-lesson-content-page';
import { subjectsData } from '@/data/subjects-data';

interface LessonPageProps {
  params: Promise<{
    subjectId: string;
    courseId: string;
  }>;
}

export async function generateMetadata(props: LessonPageProps): Promise<Metadata> {
  const params = await props.params;
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  const course = subject?.courses.find((c) => c.id === params.courseId);
  
  if (!course) return { title: 'Lesson Not Found' };
  return { title: `${course.title} - MathGrit` };
}

export default async function LessonPage(props: LessonPageProps) {
  const params = await props.params;
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  const course = subject?.courses.find((c) => c.id === params.courseId);

  if (!course) {
    notFound();
  }

  return <EnhancedLessonContentPage course={course} />;
}