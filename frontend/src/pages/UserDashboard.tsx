import { useState } from 'react';
import { Check, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleSource } from '../store/slices/jobSourcesSlice';
import type { JobSource } from '../store/slices/jobSourcesSlice';
import { fetchJobs } from '../store/slices/jobResultsSlice';
import {
  setSearchTerm,
  setLocation,
  setCountry,
  setResultsWanted,
  setHoursOld,
  resetSearch,
} from '../store/slices/jobSearchSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { JobCard, COL_WIDTHS } from '../components/ui/JobCard';

const HEADERS: { label: string; width: string; align?: 'right' }[] = [
  { label: 'JOB TITLE',   width: COL_WIDTHS.title },
  { label: 'COMPANY',     width: COL_WIDTHS.company },
  { label: 'LOCATION',    width: COL_WIDTHS.location },
  { label: 'SOURCE',      width: COL_WIDTHS.source },
  { label: 'DATE POSTED', width: COL_WIDTHS.datePosted },
  { label: 'ACTION',      width: COL_WIDTHS.action, align: 'right' },
];

function SkeletonRow() {
  return (
    <div className="flex items-center px-4 py-4 border-b border-[var(--outline-variant)]/10">
      <div style={{ width: COL_WIDTHS.title }} className="pr-4 space-y-2">
        <div className="h-3.5 w-3/4 rounded-full bg-[var(--surface-container-high)] animate-pulse" />
        <div className="h-2.5 w-1/2 rounded-full bg-[var(--surface-container)] animate-pulse" />
      </div>
      <div style={{ width: COL_WIDTHS.company }} className="pr-4">
        <div className="h-3 w-4/5 rounded-full bg-[var(--surface-container-high)] animate-pulse" />
      </div>
      <div style={{ width: COL_WIDTHS.location }} className="pr-4">
        <div className="h-3 w-3/4 rounded-full bg-[var(--surface-container-high)] animate-pulse" />
      </div>
      <div style={{ width: COL_WIDTHS.source }} className="pr-4">
        <div className="h-5 w-16 rounded-full bg-[var(--surface-container-high)] animate-pulse" />
      </div>
      <div style={{ width: COL_WIDTHS.datePosted }} className="pr-4">
        <div className="h-3 w-2/3 rounded-full bg-[var(--surface-container-high)] animate-pulse" />
      </div>
      <div style={{ width: COL_WIDTHS.action }} className="flex justify-end">
        <div className="h-7 w-16 rounded-full bg-[var(--surface-container-high)] animate-pulse" />
      </div>
    </div>
  );
}

const PAGE_SIZE = 7;

export default function UserDashboard() {
  const dispatch = useAppDispatch();
  const sources = useAppSelector((state: { jobSources: { sources: JobSource[] } }) => state.jobSources.sources);
  const searchParams = useAppSelector(state => state.jobSearch);
  const { jobs, total, loading, error, searched } = useAppSelector(state => state.jobResults);

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(jobs.length / PAGE_SIZE);
  const visibleJobs = jobs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const handleSearch = () => {
    setPage(0);
    const activeSources = sources.filter((s: JobSource) => s.active).map((s: JobSource) => s.name);
    dispatch(fetchJobs({
      site_name: activeSources,
      search_term: searchParams.searchTerm,
      location: searchParams.location,
      results_wanted: Number(searchParams.resultsWanted),
      hours_old: Number(searchParams.hoursOld),
      country_indeed: searchParams.country,
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-10 space-y-12 pb-24 animate-in fade-in duration-500">

      {/* Hero */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight text-[var(--on-surface)] mb-4">AutoApply</h1>
        <p className="text-xl text-[var(--on-surface-variant)]">
          Automate your job search. Set your parameters once, let the Invisible Concierge handle the rest.
        </p>
      </div>

      {/* Search Parameters Card */}
      <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8 border border-[var(--outline-variant)]/10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Job Sources */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">Job Sources</h3>
            <div className="grid grid-cols-2 gap-3">
              {sources.map((source: JobSource) => (
                <div key={source.id} className="relative group/src">
                  <button
                    onClick={() => !source.comingSoon && dispatch(toggleSource(source.id))}
                    disabled={source.comingSoon}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                      source.comingSoon
                        ? 'bg-[var(--surface-container)] text-[var(--on-surface-variant)]/30 opacity-40 cursor-not-allowed'
                        : source.active
                          ? 'bg-[var(--primary-container)] text-[var(--on-primary-container)] shadow-[var(--ambient-shadow)]'
                          : 'bg-[var(--surface-container)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      source.comingSoon ? 'bg-[var(--surface-dim)]' : source.active ? 'bg-[var(--on-primary-container)] text-[var(--primary-container)]' : 'bg-[var(--surface-dim)]'
                    }`}>
                      {source.active && !source.comingSoon && <Check className="w-3 h-3 text-[var(--primary-container)]" />}
                    </div>
                    {source.name}
                  </button>
                  {source.comingSoon && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-container-highest)] text-[var(--on-surface)] whitespace-nowrap opacity-0 group-hover/src:opacity-100 transition-opacity shadow-md">
                      Coming Soon
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div className="md:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="SEARCH_TERM"
                placeholder="e.g. Senior UX Designer"
                value={searchParams.searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <Input
                label="LOCATION"
                placeholder="e.g. Remote, New York"
                value={searchParams.location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                label="COUNTRY_INDEED"
                value={searchParams.country}
                onChange={(e) => dispatch(setCountry(e.target.value))}
                options={[
                  { label: 'United States', value: 'United States' },
                  { label: 'Canada', value: 'Canada' },
                  { label: 'United Kingdom', value: 'United Kingdom' },
                ]}
              />
              <Input
                label="RESULTS_WANTED"
                value={searchParams.resultsWanted}
                onChange={(e) => dispatch(setResultsWanted(e.target.value))}
              />
              <Input
                label="HOURS_OLD"
                value={searchParams.hoursOld}
                onChange={(e) => dispatch(setHoursOld(e.target.value))}
              />
            </div>
            <div className="flex justify-end items-center gap-6 pt-4">
              <Button variant="ghost" onClick={() => dispatch(resetSearch())}>Reset</Button>
              <Button variant="primary" className="px-8 py-3" onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search Jobs'}
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Results — only shown after first search */}
      {searched && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--on-surface)]">
              Real-time Search Results
            </h2>
            <Button variant="secondary" size="sm" className="gap-2 rounded-full">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Fetching...' : 'Live Data'}
            </Button>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-[var(--outline-variant)]/15 bg-[var(--surface-container-lowest)]">

            {/* Table Header */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--outline-variant)]/20 bg-[var(--surface-container-low)]">
              {HEADERS.map((col) => (
                <div
                  key={col.label}
                  style={{ width: col.width }}
                  className={`text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)] pr-4 ${col.align === 'right' ? 'text-right' : ''}`}
                >
                  {col.label}
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-6 text-sm text-red-500">{error}</div>
            )}

            {/* Skeleton rows while loading */}
            {loading && Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)}

            {/* Job rows */}
            {!loading && visibleJobs.map(job => (
              <JobCard
                key={job.id}
                title={job.title}
                type={[job.job_type ?? 'Full-time', job.is_remote ? 'Remote' : null].filter(Boolean).join(' • ')}
                company={job.company}
                location={job.location}
                source={job.site}
                datePosted={job.date_posted ?? ''}
              />
            ))}

            {/* Empty state */}
            {!loading && !error && jobs.length === 0 && (
              <div className="px-4 py-12 text-center text-sm text-[var(--on-surface-variant)]">
                No jobs found. Try adjusting your search parameters.
              </div>
            )}

            {/* Footer */}
            {!loading && jobs.length > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-[var(--outline-variant)]/10">
                <span className="text-sm text-[var(--on-surface-variant)]">
                  Showing {page * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE + PAGE_SIZE, jobs.length)} of {total} results
                </span>
                {jobs.length > PAGE_SIZE && (
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--outline-variant)] text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      disabled={page === 0}
                      onClick={() => setPage(p => p - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[var(--on-surface-variant)]">{page + 1} / {totalPages}</span>
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--outline-variant)] text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      disabled={page === totalPages - 1}
                      onClick={() => setPage(p => p + 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
