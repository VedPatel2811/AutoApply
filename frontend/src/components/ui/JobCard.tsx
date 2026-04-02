import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from './Badge';

export interface JobCardProps {
  title: string;
  company: string;
  location: string;
  source: string;
  datePosted: string;
  type?: string;
  jobUrl?: string;
  description?: string;
}

export const COL_WIDTHS = {
  title:      '25%',
  company:    '18%',
  location:   '18%',
  source:     '12%',
  datePosted: '15%',
  action:     '12%',
};

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  source,
  datePosted,
  type = 'Full-time',
  jobUrl,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-[var(--outline-variant)]/10">
      <div
        className="flex items-center px-4 py-4 hover:bg-[var(--surface-container-low)] transition-colors group cursor-pointer"
        style={{ minWidth: 0 }}
        onClick={() => description && setExpanded(e => !e)}
      >
        <div style={{ width: COL_WIDTHS.title }} className="pr-4 min-w-0">
          <div className="font-semibold text-sm text-[var(--on-surface)] truncate">{title}</div>
          <div className="text-xs text-[var(--on-surface-variant)] mt-0.5 truncate">{type}</div>
        </div>
        <div style={{ width: COL_WIDTHS.company }} className="pr-4 min-w-0 text-sm text-[var(--on-surface-variant)] truncate">
          {company}
        </div>
        <div style={{ width: COL_WIDTHS.location }} className="pr-4 min-w-0 text-sm text-[var(--on-surface-variant)] truncate">
          {location}
        </div>
        <div style={{ width: COL_WIDTHS.source }} className="pr-4 min-w-0">
          <Badge variant={source.toLowerCase() === 'linkedin' ? 'primary' : 'neutral'}>
            {source}
          </Badge>
        </div>
        <div style={{ width: COL_WIDTHS.datePosted }} className="pr-4 min-w-0 text-sm text-[var(--on-surface-variant)] truncate">
          {datePosted}
        </div>
        <div style={{ width: COL_WIDTHS.action }} className="flex justify-end items-center gap-2 flex-shrink-0">
          {description && (
            <ChevronDown
              className={`w-4 h-4 text-[var(--on-surface-variant)] transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          )}
          <a
            href={jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className={`bg-[var(--surface-container-high)] text-[var(--on-surface)] rounded-full px-4 py-1.5 text-sm font-semibold group-hover:bg-[var(--surface-container-highest)] transition-colors whitespace-nowrap ${
              !jobUrl ? 'opacity-40 pointer-events-none' : ''
            }`}
          >
            Apply
          </a>
        </div>
      </div>

      {expanded && description && (
        <div className="px-6 pb-5 pt-1 bg-[var(--surface-container-low)]">
          <p className="text-sm text-[var(--on-surface-variant)] whitespace-pre-line leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};
