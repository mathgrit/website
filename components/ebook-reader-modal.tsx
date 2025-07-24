"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
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

  // PERUBAHAN: Gunakan useEffect untuk me-reset halaman saat buku berubah
  useEffect(() => {
    if (book) {
      setCurrentPage(1); // Selalu mulai dari halaman 1 saat buku baru dipilih
    }
  }, [book]);

  if (!book) return null;

  // PERUBAHAN: Beri nilai default 1 jika totalPages tidak ada
  const totalPages = book.totalPages || 1;

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
          <DialogTitle>{book.title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex-grow bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-gray-500">E-book content for page {currentPage} will be displayed here.</p>
        </div>

        <DialogFooter className="p-2 border-t flex items-center justify-between">
          <Button onClick={goToPrevPage} disabled={currentPage === 1} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages} variant="outline">
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}