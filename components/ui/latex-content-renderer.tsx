"use client";

import React from 'react';
import { InlineMath } from 'react-katex';

// Tipe untuk bagian teks yang sudah diparsing
type ParsedPart = {
  type: 'text' | 'math' | 'bold' | 'italic';
  content: string;
};

// Fungsi untuk mem-parsing teks biasa (inline)
const parseInlineText = (line: string): React.ReactNode[] => {
  // Regex untuk menemukan math ($...$), bold (\\textbf{...}), atau italic (\\textit{...})
  const regex = /(\$.*?\$)|(\\textbf\{.*?\})|(\\textit\{.*?\})/g;
  const parts = line.split(regex).filter(part => part);

  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={index} math={part.slice(1, -1)} />;
    }
    if (part.startsWith('\\textbf{')) {
      return <strong key={index}>{part.substring(8, part.length - 1)}</strong>;
    }
    if (part.startsWith('\\textit{')) {
      return <em key={index}>{part.substring(8, part.length - 1)}</em>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};


// Komponen utama
export default function LatexContentRenderer({ text }: { text: string }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let isItemize = false;
  let items: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('\\begin{itemize}')) {
      isItemize = true;
      return;
    }
    if (trimmedLine.startsWith('\\end{itemize}')) {
      if (isItemize) {
        elements.push(<ul key={`ul-${index}`} className="list-disc pl-8 my-4 space-y-2">{items}</ul>);
        items = []; // Reset items
        isItemize = false;
      }
      return;
    }
    if (isItemize && trimmedLine.startsWith('\\item')) {
      const itemContent = trimmedLine.substring(5).trim();
      items.push(<li key={`li-${index}`}>{parseInlineText(itemContent)}</li>);
      return;
    }
    if (isItemize) return; // Abaikan baris kosong di dalam itemize

    if (trimmedLine.startsWith('\\chapter{')) {
      const content = trimmedLine.substring(9, trimmedLine.length - 1);
      elements.push(<h1 key={index} className="text-3xl font-bold mt-6 mb-4 border-b pb-2">{parseInlineText(content)}</h1>);
      return;
    }

    if (trimmedLine.startsWith('\\section{')) {
      const content = trimmedLine.substring(9, trimmedLine.length - 1);
      elements.push(<h2 key={index} className="text-2xl font-semibold mt-4 mb-3">{parseInlineText(content)}</h2>);
      return;
    }

    if(trimmedLine) {
        elements.push(
            <p key={index} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 my-4">
                {parseInlineText(trimmedLine)}
            </p>
        );
    }
  });

  return <div>{elements}</div>;
}