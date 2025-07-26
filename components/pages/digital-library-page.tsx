"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Library } from "lucide-react";
import { EbookCard } from "@/components/ebook-card";
import { EbookReaderModal } from "@/components/ebook-reader-modal";
import PdfViewer from "@/components/pdf-viewer";  // Menggunakan default import
import { Button } from "@/components/ui/button";  // Mengimpor Button
import type { Ebook } from "@/data/types";
import { supabase } from "@/lib/supabaseClient";

export default function DigitalLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBook, setSelectedBook] = useState<Ebook | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ref untuk modal agar kita bisa menangani klik di luar modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEbooks = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('ebooks').select('*');
        if (error) throw error;

        const formattedData = data.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          category: book.category,
          fileUrl: book.file_url,  // Pastikan menggunakan file_url dari Supabase
          totalPages: book.total_pages,  // Pastikan mapping dengan total_pages
          coverImageUrl: book.cover_image_url,  // Pastikan menggunakan cover_image_url
        }));

        setEbooks(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data e-book:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  const categories = ["all", "Calculus", "Algebra", "Number Theory", "General", "Olympiad"];

  const filteredBooks = useMemo(() => {
    return ebooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, ebooks]);

  const handleReadClick = (book: Ebook) => {
    setSelectedBook(book);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
    setTimeout(() => {
      setSelectedBook(null);
    }, 300);
  };

  // Menangani klik di luar modal untuk menutupnya
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseReader();
    }
  };

  // CSS untuk container dengan scroll horizontal
  const containerStyle: React.CSSProperties = {
    display: "flex",
    overflowX: "auto", // Scroll horizontal
    overflowY: "hidden", // Sembunyikan scroll vertikal
    whiteSpace: "nowrap", // Menghindari pembungkus elemen secara otomatis
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Library className="h-8 w-8 text-blue-600 dark:text-cyan-400 mr-3" />
            <h1 className="text-4xl font-bold">Digital Library</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of mathematical e-books and resources.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading books...</div>
        ) : (
          <div style={containerStyle}>
            {filteredBooks.map((book) => (
              <EbookCard key={book.id} book={book} onReadClick={handleReadClick} />
            ))}
          </div>
        )}

        {!isLoading && filteredBooks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <h3>No books found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        )}
      </div>

      {/* Menampilkan PdfViewer untuk buku yang dipilih */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}  // Menambahkan event listener klik di luar modal
        >
          <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4 rounded-lg max-w-2xl w-full shadow-lg border border-gray-300 dark:border-gray-700" ref={modalRef}>
            {/* Tombol Close dengan posisi absolute dan z-index tinggi */}
            <Button onClick={handleCloseReader} variant="outline" className="absolute top-4 right-4 z-10">
              Close
            </Button>
            <PdfViewer fileUrl={selectedBook.fileUrl} /> {/* Menampilkan PdfViewer */}
          </div>
        </div>
      )}
    </div>
  );
}
