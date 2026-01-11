"use client";

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, Bookmark, Check } from 'lucide-react'; // Tambah Icon Bookmark & Check
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

// IMPOR TAMBAHAN
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/auth-context';

// Konfigurasi worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
}

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  const { user } = useAuth(); // Ambil data user yang sedang login

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [sliderValue, setSliderValue] = useState(1);

  // State untuk Bookmark
  const [isBookmarked, setIsBookmarked] = useState(false); // Indikator visual halaman tersimpan
  const [isSaving, setIsSaving] = useState(false);

  // Ambil nama file bersih (contoh: "Pre-Calculus.pdf" dari "/materials/Pre-Calculus.pdf")
  const fileName = fileUrl.split('/').pop() || "unknown-file";

  // 1. EFEK LOAD BOOKMARK DARI DATABASE
  useEffect(() => {
    async function loadBookmark() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('page_number')
          .eq('user_id', user.id)
          .eq('book_filename', fileName)
          .single();

        if (data && data.page_number) {
          // Jika ada data, set halaman dan slider
          setPageNumber(data.page_number);
          setSliderValue(data.page_number);
          console.log("Bookmark loaded:", data.page_number);
        }
      } catch (err) {
        console.error("Error loading bookmark:", err);
      }
    }

    loadBookmark();
  }, [user, fileName]); // Jalan saat user login atau ganti buku

  // 2. EFEK DEBOUNCE UNTUK SLIDER & NAVIGASI HALAMAN
  useEffect(() => {
    const handler = setTimeout(() => {
      setPageNumber(sliderValue);
    }, 200);

    return () => clearTimeout(handler);
  }, [sliderValue]);

  // 3. EFEK UNTUK CEK APAKAH HALAMAN INI "DISIMPAN" (Visual Feedback)
  useEffect(() => {
    // Reset status bookmark setiap ganti halaman (biar tombol balik jadi icon biasa)
    // Kecuali kita mau logic kompleks "apakah halaman ini yg tersimpan di DB?",
    // untuk sekarang kita buat simpel: Icon berubah jadi centang sebentar saat disimpan.
    if (isBookmarked) {
      const timer = setTimeout(() => setIsBookmarked(false), 2000); // Reset icon setelah 2 detik
      return () => clearTimeout(timer);
    }
  }, [pageNumber, isBookmarked]);


  // FUNGSI SIMPAN BOOKMARK
  async function handleBookmark() {
    if (!user) return alert("Silakan login untuk menyimpan bookmark.");
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('bookmarks')
        .upsert({ 
          user_id: user.id,
          book_filename: fileName,
          page_number: pageNumber
        }, { onConflict: 'user_id, book_filename' });

      if (error) throw error;
      
      setIsBookmarked(true); // Ubah icon jadi centang
    } catch (err) {
      console.error("Gagal menyimpan bookmark:", err);
      alert("Gagal menyimpan posisi halaman.");
    } finally {
      setIsSaving(false);
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    // Kita TIDAK me-reset pageNumber ke 1 di sini, 
    // karena useEffect loadBookmark mungkin sudah mengubahnya ke halaman terakhir.
  }

  function goToNextPage() {
    if (numPages && pageNumber < numPages) {
      setSliderValue(prev => prev + 1);
    }
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setSliderValue(prev => prev - 1);
    }
  }

  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.25));
  }
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  const progressPercentage = numPages ? (pageNumber / numPages) * 100 : 0;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-auto flex justify-center p-4 min-h-[600px] max-h-[70vh] border border-gray-300 dark:border-gray-700 relative"
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading PDF...</span>
            </div>
          }
          error={
            <div className="text-red-500 p-4">
              Failed to load PDF. Please check if the file exists.
            </div>
          }
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>

        {/* TOMBOL BOOKMARK MENGAMBANG (Floating Button) */}
        <div className="absolute top-4 right-4 z-10">
          <Button 
            onClick={handleBookmark} 
            variant="secondary" 
            size="icon"
            className="shadow-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Simpan posisi halaman ini"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isBookmarked ? (
              <Check className="h-5 w-5 text-green-600" /> // Tanda berhasil
            ) : (
              <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </Button>
        </div>
      </div>

      {numPages && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Button onClick={goToPreviousPage} disabled={pageNumber <= 1} variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex-grow flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Page {pageNumber} of {numPages}
              </span>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={zoomOut} variant="outline" size="icon" disabled={scale <= 0.25}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button onClick={zoomIn} variant="outline" size="icon" disabled={scale >= 2.0}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={goToNextPage} disabled={pageNumber >= numPages} >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 px-1 mt-4">
            <span className="text-sm font-medium">1</span>
            <Slider
              min={1}
              max={numPages}
              step={1}
              value={[sliderValue]}
              onValueChange={handleSliderChange}
              className="flex-1"
              style={{ maxWidth: '90%' }}
            />
            <span className="text-sm font-medium">{numPages}</span>
          </div>
        </div>
      )}
    </div>
  );
}