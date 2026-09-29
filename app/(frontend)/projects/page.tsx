'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, User, BookOpen, ExternalLink, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const publication = {
    title:
      'Software-Defined Networks for Optical Networks Using Flexible Orchestration: Advances, Challenges, and Opportunities',
    authors:
      'Dr. Eliel Keelson, Dr. Andrew Agbemenu, Prof. Eric Tchao, Kenneth Nsafoa-Yeboah, Bright Yeboah-Akowuah, Benjamin Kommey, Mohammad Monirujjaman Khan',
    date: 'Aug 2026',
    year: '2026',
    authorKeys: ['keelson', 'agbemenu', 'tchao'],
    abstract:
      'Optical networks offer a wide range of benefits to the telecommunication sector worldwide with their provision of higher bandwidth, which leads to faster data speed, longer transmission distance, and flexible software-defined orchestration...',
    image: '/research-img.png',
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Check if current single card matches active filters
  const matchesSearch =
    !searchQuery ||
    publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    publication.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
    publication.abstract.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesYear = !selectedYear || publication.year === selectedYear;
  const matchesAuthor =
    !selectedAuthor || publication.authorKeys.includes(selectedAuthor);

  const isVisible = matchesSearch && matchesYear && matchesAuthor;

  return (
    <>
      <Navbar />

      {/* Hero Banner with Dark Ambient Lab Background */}
      <section className="relative bg-black text-white overflow-hidden min-h-[360px] lg:min-h-[420px] flex items-center">
        {/* Background lab photo positioned on right and faded seamlessly into black */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="relative w-full lg:w-3/5 h-full">
            <img
              src="/rf-lab2.jpg"
              alt="Research Laboratory"
              className="w-full h-full object-cover object-center brightness-90 contrast-105"
            />
            {/* Multi-layer gradient overlays for smooth dark blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 lg:via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-container-max mx-auto px-6 lg:px-12 py-16 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white mb-5 leading-tight font-sans">
              Project Publications
            </h1>
            <p className="text-base sm:text-2xl text-slate-300 leading-relaxed font-medium">
              Explore our projects that contribute to knowledge and innovation across various domains and disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Two-Column Layout */}
      <main className="max-w-container-max mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Search & Filters Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3.5">
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
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
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
                      <option value="keelson">Dr. Eliel Keelson</option>
                      <option value="tchao">Prof. Eric Tchao</option>
                      <option value="agbemenu">Dr. Andrew Agbemenu</option>
                      <option value="nunoo">Dr. Henry Nunoo-Mensah</option>
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
          <section className="lg:col-span-8 xl:col-span-8.5 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
                Projects
              </h2>
              <span className="text-xs font-mono text-slate-500">
                {isVisible ? '01 PROJECT' : '00 PROJECTS'}
              </span>
            </div>

            {/* Single Publication Card */}
            {isVisible ? (
              <article className="bg-white border-2 border-primary rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Card Image preview with research-img.png */}
                  <div className="w-full md:w-48 h-36 shrink-0 bg-slate-50 rounded border border-slate-200 p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={publication.image}
                      alt={publication.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-primary hover:text-primary-container hover:underline cursor-pointer leading-snug mb-2 transition-colors">
                        {publication.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 mb-2 leading-relaxed">
                        {publication.authors}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{publication.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {publication.abstract}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/projects/${publication.title.toLowerCase().replace(/ /g, '-')}`}
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
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <p className="text-slate-500 text-sm">No projects match your filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('');
                    setSelectedAuthor('');
                  }}
                  className="mt-3 text-xs font-semibold text-primary hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination / Load Archive */}
            <div className="pt-6 flex justify-center">
              <button className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors flex items-center gap-2">
                <span>Load Archive (2018—2021)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}