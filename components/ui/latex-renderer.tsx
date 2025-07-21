// components/ui/latex-renderer.tsx
"use client";

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

type LatexRendererProps = {
  children: string;
};

const LatexRenderer: React.FC<LatexRendererProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  // Regex untuk menemukan $$...$$ (blok) atau $...$ (inline)
  const regex = /(\$\$[\s\S]*?\$\$|\$.*?\$)/g;
  const parts = children.split(regex);

  return (
    <span className="leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Render sebagai blok matematika (baris baru, rata tengah)
          const math = part.slice(2, -2);
          return (
            <div key={index} className="my-4 text-center w-full">
              <BlockMath math={math} />
            </div>
          );
        }
        if (part.startsWith('$') && part.endsWith('$')) {
          // Render sebagai matematika inline (dalam baris)
          const math = part.slice(1, -1);
          return <InlineMath key={index} math={math} />;
        }
        // Render sebagai teks biasa
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default LatexRenderer;