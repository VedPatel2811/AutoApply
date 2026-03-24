import { useState } from 'react';
import { Check, RefreshCw } from 'lucide-react';

const JOB_SOURCES = [
  { id: 'linkedin', name: 'linkedin', active: true },
  { id: 'indeed', name: 'indeed', active: false },
  { id: 'zip_recruiter', name: 'zip_recruiter', active: true },
  { id: 'google', name: 'google', active: false },
  { id: 'glassdoor', name: 'glassdoor', active: false },
  { id: 'bayt', name: 'bayt', active: false },
  { id: 'naukri', name: 'naukri', active: false },
  { id: 'bdjobs', name: 'bdjobs', active: false },
];

export default function UserDashboard() {
  const [sources, setSources] = useState(JOB_SOURCES);

  const toggleSource = (id: string) => {
    setSources(sources.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-10 space-y-12 pb-24">
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
                  onClick={() => toggleSource(source.id)}
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
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">SEARCH_TERM</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  placeholder="e.g. Senior UX Designer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">LOCATION</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  placeholder="e.g. Remote, New York"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">COUNTRY_INDEED</label>
                <select className="w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all appearance-none cursor-pointer">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">RESULTS_WANTED</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  defaultValue="50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">HOURS_OLD</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  defaultValue="24"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-6 pt-4">
              <button className="text-[var(--on-surface-variant)] font-medium hover:text-[var(--on-surface)] transition-colors">
                Reset
              </button>
              <button className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] rounded-full px-8 py-3 font-semibold shadow-[var(--ambient-shadow)] hover:opacity-90 transition-opacity">
                Search Jobs
              </button>
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] text-sm font-medium hover:bg-[var(--surface-container-highest)] transition-colors">
            <RefreshCw className="w-4 h-4" />
            Live Data
          </button>
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
            {/* Skeleton Row */}
            <div className="grid grid-cols-6 gap-4 px-4 py-5 rounded-xl items-center border-b border-transparent bg-[var(--surface-container-lowest)]/50 animate-pulse">
              <div className="col-span-2"><div className="h-5 bg-[var(--surface-container-high)] rounded-md w-3/4"></div></div>
              <div><div className="h-5 bg-[var(--surface-container-high)] rounded-md w-1/2"></div></div>
              <div><div className="h-5 bg-[var(--surface-container-high)] rounded-md w-2/3"></div></div>
              <div><div className="h-6 w-16 bg-[var(--surface-container-high)] rounded-full"></div></div>
              <div><div className="h-5 bg-[var(--surface-container-high)] rounded-md w-1/3"></div></div>
              <div className="flex justify-end"><div className="h-9 w-20 bg-[var(--surface-container-high)] rounded-full"></div></div>
            </div>

            {/* Job 1 */}
            <div className="grid grid-cols-6 gap-4 px-4 py-5 rounded-xl items-center border-b border-[var(--outline-variant)]/10 hover:bg-[var(--surface-container-lowest)] transition-colors group">
              <div className="col-span-2">
                <div className="font-semibold text-[var(--on-surface)]">Senior Product Designer</div>
                <div className="text-xs text-[var(--on-surface-variant)] mt-1">Full-time • Remote Friendly</div>
              </div>
              <div className="text-[var(--on-surface-variant)]">InnovateTech Corp.</div>
              <div className="text-[var(--on-surface-variant)]">San Francisco, CA</div>
              <div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#E2DFFF]/20 text-[#3525CD] dark:bg-[var(--primary-container)]/30 dark:text-[var(--primary)]">
                  LinkedIn
                </span>
              </div>
              <div className="text-[var(--on-surface-variant)]">2h ago</div>
              <div className="flex justify-end">
                <button className="bg-[var(--surface-container-high)] text-[var(--on-surface)] rounded-full px-5 py-2 text-sm font-semibold group-hover:bg-[var(--surface-container-highest)] transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Job 2 */}
            <div className="grid grid-cols-6 gap-4 px-4 py-5 rounded-xl items-center border-b border-[var(--outline-variant)]/10 hover:bg-[var(--surface-container-lowest)] transition-colors group">
              <div className="col-span-2">
                <div className="font-semibold text-[var(--on-surface)]">Lead UI/UX Architect</div>
                <div className="text-xs text-[var(--on-surface-variant)] mt-1">Contract • Hybrid</div>
              </div>
              <div className="text-[var(--on-surface-variant)]">Nexus Design Lab</div>
              <div className="text-[var(--on-surface-variant)]">Austin, TX</div>
              <div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--surface-container-high)] text-[var(--on-surface)]">
                  Indeed
                </span>
              </div>
              <div className="text-[var(--on-surface-variant)]">5h ago</div>
              <div className="flex justify-end">
                <button className="bg-[var(--surface-container-high)] text-[var(--on-surface)] rounded-full px-5 py-2 text-sm font-semibold group-hover:bg-[var(--surface-container-highest)] transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-6 mt-4">
            <span className="text-sm text-[var(--on-surface-variant)]">Showing 2 of 24 results found</span>
            <div className="flex items-center gap-2">
               <button className="w-8 h-8 rounded-full bg-[var(--surface-container-lowest)] flex items-center justify-center border border-[var(--outline-variant)]/20 hover:bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]">
                 <span className="sr-only">Previous</span>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
               </button>
               <button className="w-8 h-8 rounded-full bg-[var(--surface-container-lowest)] flex items-center justify-center border border-[var(--outline-variant)]/20 hover:bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]">
                 <span className="sr-only">Next</span>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
