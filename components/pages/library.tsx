"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText } from "lucide-react";
import PdfViewer from "@/components/pdf-viewer";
import { libraryMaterials } from "@/data/library";

export default function LibraryPage() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

  const MaterialCard = ({
    material,
  }: {
    material: { name: string; url: string; topic?: string; image?: string };
  }) => (
    <Card
       className="min-w-[350px] bg-white/80 dark:bg-[#1b263b]/80 backdrop-blur-sm border-gray-200 dark:border-[#415a77]/30 hover:shadow-xl transition-all duration-300 group cursor-pointer"
        onClick={() => setSelectedPdfUrl(material.url)}
    >
      <CardHeader>
        <div className="flex items-center space-x-4">
          {material.image && (
            <img
              src={material.image}
              alt="icon"
              className="h-24 w-24 md:h-28 md:w-28 lg:h-36 lg:w-36 object-contain"
            />
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base md:text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                {material.name}
            </CardTitle>
            <CardDescription className="truncate">
              {material.topic}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Library E-Book</h1>
        {selectedPdfUrl ? (
          <div>
            <Button
              onClick={() => setSelectedPdfUrl(null)}
              variant="outline"
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
            <PdfViewer fileUrl={selectedPdfUrl} />
          </div>
        ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {libraryMaterials.map((material, idx) => (
            <MaterialCard key={idx} material={material} />
             ))}
        </div>
        )}
      </div>
    </div>
  );
}
