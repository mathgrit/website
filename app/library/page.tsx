// Lokasi: app/library/page.tsx

import type { Metadata } from 'next';
import DigitalLibraryPage from '@/components/pages/digital-library-page';

export const metadata: Metadata = {
  title: 'Digital Library - MathGrit',
};

export default function LibraryRoute() {
  return <DigitalLibraryPage />;
}