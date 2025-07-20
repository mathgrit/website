// Lokasi: app/lessons/[subjectId]/[courseId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EnhancedLessonContentPage from '@/components/pages/enhanced-lesson-content-page';
import { subjectsData } from '@/data/subjects-data';

interface LessonPageProps {
  params: {
    subjectId: string;
    courseId: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  const course = subject?.courses.find((c) => c.id === params.courseId);
  if (!course) return { title: 'Lesson Not Found' };
  return { title: `${course.title} - MathGrit` };
}

export default function LessonPage({ params }: LessonPageProps) {
  const subject = subjectsData.find((s) => s.id === params.subjectId);
  const course = subject?.courses.find((c) => c.id === params.courseId);

  if (!course) {
    notFound();
  }

  return <EnhancedLessonContentPage course={course} />;
}