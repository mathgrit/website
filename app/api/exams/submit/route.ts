// app/api/exams/submit/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { examId, score, totalPoints, answers } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase.from('exam_results').insert([
    {
      user_id: session.user.id,
      exam_id: examId,
      score,
      total_points: totalPoints,
      answers,
    },
  ]);

  if (error) {
    console.error('Error saving exam results:', error);
    return NextResponse.json({ error: 'Failed to save results' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Exam results saved successfully' });
}