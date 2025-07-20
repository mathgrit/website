// Lokasi file: app/problems/page.tsx

import ProblemsPage from "@/components/pages/problems-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Problem', // Ini sekarang akan bekerja
};


export default function ProblemsRoute() {
  return (
  <>
    <ProblemsPage />
  </>
  );
}
