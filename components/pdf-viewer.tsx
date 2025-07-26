"use client";

import { useState, useEffect } from 'react'; // <-- 1. Impor useEffect
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

// Konfigurasi worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
}

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [sliderValue, setSliderValue] = useState(1); // <-- 2. State baru untuk slider

  // <-- 3. Efek untuk debounce
  useEffect(() => {
    // Set timer untuk mengubah halaman setelah 200ms tidak ada perubahan
    const handler = setTimeout(() => {
      setPageNumber(sliderValue);
    }, 200);

    // Bersihkan timer setiap kali sliderValue berubah
    return () => {
      clearTimeout(handler);
    };
  }, [sliderValue]); // Efek ini hanya berjalan saat sliderValue berubah

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setSliderValue(1);
  }

  function goToNextPage() {
    if (numPages && pageNumber < numPages) {
      setPageNumber(prev => prev + 1);
      setSliderValue(prev => prev + 1);
    }
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
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
    setSliderValue(value[0]); // <-- 4. Hanya perbarui sliderValue, bukan pageNumber
  };

  const progressPercentage = numPages ? (pageNumber / numPages) * 100 : 0;

  return (
    <div className="w-full max-w-xl mx-auto"> {/* Mengatur lebar modal lebih kecil */}
      <div 
        className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-auto flex justify-center p-4 min-h-[600px] max-h-[70vh] border border-gray-300 dark:border-gray-700"
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
          {/* Komponen Page masih menggunakan pageNumber yang sudah di-debounce */}
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
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
          
          {/* Slider dengan ukuran yang lebih proporsional */}
          <div className="flex items-center gap-4 px-1 mt-4">
            <span className="text-sm font-medium">1</span>
            <Slider
              min={1}
              max={numPages}
              step={1}
              value={[sliderValue]} // <-- 5. Slider dikontrol oleh sliderValue
              onValueChange={handleSliderChange}
              className="flex-1"  // Mengatur lebar slider agar lebih kecil dan responsif
              style={{ maxWidth: '90%' }}  // Pastikan slider tidak terlalu besar dan responsif
            />
            <span className="text-sm font-medium">{numPages}</span>
          </div>
        </div>
      )}
    </div>
  );
}
