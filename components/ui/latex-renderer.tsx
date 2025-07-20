// Lokasi file: components/ui/latex-renderer.tsx

"use client";

import React from 'react';
import { InlineMath } from 'react-katex';

type LatexRendererProps = {
  children: string;
};

const LatexRenderer: React.FC<LatexRendererProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  // PERUBAHAN: Regex diubah untuk mencari dolar tunggal ($...$)
  const regex = /(\$.*?\$)/g; 
  const parts = children.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // PERUBAHAN: Hilangkan hanya satu dolar dari awal dan akhir
          const math = part.slice(1, -1); 
          return <InlineMath key={index} math={math} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

export default LatexRenderer;