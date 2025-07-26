"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Ebook } from "@/data/types";

interface EbookCardProps {
  book: Ebook;
  onReadClick: (book: Ebook) => void;
}

export function EbookCard({ book, onReadClick }: EbookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group w-full sm:w-[220px] md:w-[260px]">
      <div className="aspect-[2/3] bg-gray-100 dark:bg-gray-800">
        <img
          src={book.coverImageUrl}  // Pastikan ini menggunakan coverImageUrl
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex flex-col items-start">
        <h3 className="font-bold text-lg leading-tight truncate w-full">{book.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{book.author}</p>
        <Button onClick={() => onReadClick(book)} className="w-full mt-auto">
          Read Now
        </Button>
      </CardContent>
    </Card>
  );
}
