'use client';

import React, { useState } from 'react';
import { Download, Quote, Check } from 'lucide-react';

interface PublicationItemProps {
  title: string;
  type: string;
  source: string;
  authors: string;
  pdfUrl?: string;
  bibtex: string;
}

export const PublicationItem: React.FC<PublicationItemProps> = ({
  title,
  type,
  source,
  authors,
  pdfUrl = '#',
  bibtex,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCite = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group border-b border-outline-variant py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-container-low transition-colors px-4 rounded-sm">
      <div className="max-w-2xl">
        <span className={`font-label-caps text-[11px] px-2.5 py-0.5 mb-2 inline-block font-semibold rounded-sm ${
          type === 'JOURNAL ARTICLE'
            ? 'text-secondary-container bg-primary'
            : 'text-on-secondary-container bg-secondary-container'
        }`}>
          {type}
        </span>
        <h4 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
          {title}
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
          {source}
        </p>
        <p className="font-label-caps text-[12px] text-outline mt-1.5 font-medium tracking-wide">
          {authors}
        </p>
      </div>
      <div className="flex gap-3 shrink-0 self-start md:self-center">
        <a
          href={pdfUrl}
          className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-label-caps text-label-caps rounded-sm hover:bg-primary hover:text-white active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
        <button
          onClick={handleCite}
          className={`flex items-center gap-2 px-4 py-2 border font-label-caps text-label-caps rounded-sm active:scale-95 transition-all ${
            copied
              ? 'border-secondary bg-secondary text-white'
              : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied BibTeX
            </>
          ) : (
            <>
              <Quote className="w-4 h-4" />
              Cite
            </>
          )}
        </button>
      </div>
    </div>
  );
};
