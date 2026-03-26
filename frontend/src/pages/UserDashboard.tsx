
import { Check, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleSource } from '../store/slices/jobSourcesSlice';
import { fetchJobs } from '../store/slices/jobResultsSlice';
import { 
  setSearchTerm, 
  setLocation, 
  setCountry, 
  setResultsWanted, 
  setHoursOld, 
  resetSearch 
} from '../store/slices/jobSearchSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { JobCard } from '../components/ui/JobCard';

export default function UserDashboard() {
  const dispatch = useAppDispatch();
  const sources = useAppSelector(state => state.jobSources.sources);
  const searchParams = useAppSelector(state => state.jobSearch);
  const { jobs, total, loading, error } = useAppSelector(state => state.jobResults);

  const handleSearch = () => {
    const activeSources = sources.filter(s => s.active).map(s => s.name);
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
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight text-[var(--on-surface)] mb-4">
          AutoApply
        </h1>
        <p className="text-xl text-[var(--on-surface-variant)]">
          Automate your job search. Set your parameters once, let the Invisible Concierge handle the rest.
        </p>
      </div>

      {/* Search Parameters Card */}
      <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8 border border-[var(--outline-variant)]/10 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          
          {/* Left Col: Job Sources */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)] mb-2">JOB SOURCES</h3>
            <div className="grid grid-cols-2 gap-3">
              {sources.map(source => (
                <button
                  key={source.id}
                  onClick={() => dispatch(toggleSource(source.id))}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    source.active 
                    ? 'bg-[var(--primary-container)] text-[var(--on-primary-container)] shadow-[var(--ambient-shadow)]' 
                    : 'bg-[var(--surface-container)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${source.active ? 'bg-[var(--on-primary-container)] text-[var(--primary-container)]' : 'bg-[var(--surface-dim)]'}`}>
                    {source.active && <Check className="w-3 h-3 text-[var(--primary-container)]" />}
                  </div>
                  {source.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Col: Parameters */}
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
              <Button variant="ghost" onClick={() => dispatch(resetSearch())}>
                Reset
              </Button>
              <Button variant="primary" className="px-8 py-3" onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search Jobs'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Search Results Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--on-surface)]">
            Real-time Search Results
          </h2>
          <Button variant="secondary" size="sm" className="gap-2 rounded-full">
            <RefreshCw className="w-4 h-4" />
            Live Data
          </Button>
        </div>

        <div className="w-full relative">
          <div className="grid grid-cols-6 gap-4 px-4 py-3 text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)] border-b border-[var(--outline-variant)]/20 mb-2">
            <div className="col-span-2">JOB TITLE</div>
            <div>COMPANY</div>
            <div>LOCATION</div>
            <div>SOURCE</div>
            <div>DATE POSTED</div>
            <div className="text-right">ACTION</div>
          </div>
          
          <div className="space-y-1">
            {error && <p className="px-4 py-3 text-sm text-red-500">{error}</p>}
            {jobs.map(job => (
              <JobCard
                key={job.id}
                title={job.title}
                type={[
                  job.job_type ?? 'Full-time',
                  job.is_remote ? 'Remote' : null,
                ].filter(Boolean).join(' • ')}
                company={job.company}
                location={job.location}
                source={job.site}
                datePosted={job.date_posted ?? ''}
              />
            ))}
          </div>

          <div className="flex items-center justify-between px-4 py-6 mt-4">
            <span className="text-sm text-[var(--on-surface-variant)]">Showing {jobs.length} of {total} results found</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="w-8 h-8 px-0 rounded-full flex items-center justify-center">
                <span className="sr-only">Previous</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </Button>
              <Button variant="outline" size="sm" className="w-8 h-8 px-0 rounded-full flex items-center justify-center">
                <span className="sr-only">Next</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
