"use client";

import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Ebook } from "@/data/types";

interface EbookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Ebook | null;
}

export function EbookReaderModal({ isOpen, onClose, book }: EbookReaderModalProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (book) {
      setCurrentPage(1);
    }
  }, [book]);

  if (!book) return null;

  const totalPages = book.totalPages || 1;

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl w-full p-0 bg-transparent" // Memperkecil modal
      >
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
          <DialogTitle>{book.title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        {/* Menampilkan konten eBook di dalam iframe */}
        <div className="flex-grow bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          {book.fileUrl ? (
            <iframe
              src={`${book.fileUrl}#page=${currentPage}`}  // Ensure this is a read-only file URL
              width="100%"
              height="100%"
              className="border-none"
              title="Ebook Viewer"
            />
          ) : (
            <p className="text-gray-500">E-book file not available.</p>
          )}
        </div>

        {/* Dialog Footer untuk navigasi halaman */}
        <DialogFooter className="p-2 border-t flex items-center justify-between space-x-4 mt-2">
          {/* Tombol Previous */}
          <Button 
            onClick={goToPrevPage} 
            disabled={currentPage === 1} 
            variant="outline"
            className="transform -translate-y-1"
          >
            <ChevronLeft className="h-2 w-2 mr-2" />
            Previous
          </Button>
          <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
          {/* Tombol Next */}
          <Button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages} 
            variant="outline"
            className="transform -translate-y-1"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
