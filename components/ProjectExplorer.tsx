'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, BookOpen, ChevronDown } from 'lucide-react';

/** A project flattened for display and client-side filtering. */
export interface ProjectSummary {
  id: number;
  title: string;
  slug: string;
  authors: string;
  /** Slugified author names, so the dropdown can match without substring hacks. */
  authorKeys: string[];
  /** Pre-formatted on the server ("Aug 2026") to keep both renders identical. */
  date: string;
  year: string;
  excerpt: string;
  /** Title + authors + body, lowercased, for the search box to match against. */
  searchText: string;
  image: string | null;
}

interface ProjectExplorerProps {
  projects: ProjectSummary[];
  years: string[];
  authors: { key: string; label: string }[];
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  projects,
  years,
  authors,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  // Filtering is live as the fields change; the button below is just the
  // affordance for anyone who expects to submit the form.
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const visible = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter(
      (project) =>
        (!query || project.searchText.includes(query)) &&
        (!selectedYear || project.year === selectedYear) &&
        (!selectedAuthor || project.authorKeys.includes(selectedAuthor)),
    );
  }, [projects, searchQuery, selectedYear, selectedAuthor]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSelectedAuthor('');
  };

  return (
    <main className="max-w-container-max mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Column: Search & Filters Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-[#f9fafb] border border-outline-variant rounded-lg p-6 shadow-sm sticky top-28">
            <form className="space-y-6" onSubmit={handleFilterSubmit}>
              {/* Search Box */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2 font-sans">
                  <Search className="w-4 h-4 text-slate-700" />
                  <span>Search</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search publications..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2 font-sans">
                  <Calendar className="w-4 h-4 text-slate-700" />
                  <span>Year</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer pr-10"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-slate-500" />
                </div>
              </div>

              {/* Authors Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2 font-sans">
                  <User className="w-4 h-4 text-slate-700" />
                  <span>Authors</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer pr-10"
                  >
                    <option value="">All Authors</option>
                    {authors.map((author) => (
                      <option key={author.key} value={author.key}>
                        {author.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-slate-500" />
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#0a0f1d] hover:bg-black text-white text-sm font-semibold rounded shadow transition-colors flex items-center justify-center gap-2"
              >
                <span>Apply Filters</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Right Column: Research Publications List */}
        <section className="lg:col-span-8 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
              Projects
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {String(visible.length).padStart(2, '0')}{' '}
              {visible.length === 1 ? 'PROJECT' : 'PROJECTS'}
            </span>
          </div>

          {visible.length > 0 ? (
            visible.map((project) => (
              <article
                key={project.id}
                className="bg-white border-2 border-primary rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Card Image preview */}
                  <div className="w-full md:w-48 h-36 shrink-0 bg-slate-50 rounded border border-slate-200 p-2 flex items-center justify-center overflow-hidden">
                    {project.image && (
                      /* eslint-disable-next-line @next/next/no-img-element -- object-contain on an unknown aspect ratio; next/image needs fixed dimensions */
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-lg lg:text-xl font-bold text-primary hover:text-primary-container hover:underline leading-snug mb-2 transition-colors block"
                      >
                        {project.title}
                      </Link>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 mb-2 leading-relaxed">
                        {project.authors}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{project.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {project.excerpt}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-primary bg-primary/5 border border-primary/20 hover:bg-primary hover:text-white transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Full Project</span>
                        <span className="text-xs">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm">
                {projects.length === 0
                  ? 'No projects have been published yet.'
                  : 'No projects match your filter criteria.'}
              </p>
              {projects.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-xs font-semibold text-primary hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </section>

      </div>
    </main>
  );
};
