
import { Badge } from './Badge';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  source: string;
  datePosted: string;
  type?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  source,
  datePosted,
  type = 'Full-time',
}) => {
  return (
    <div className="grid grid-cols-6 gap-4 px-4 py-5 rounded-xl items-center border-b border-[var(--outline-variant)]/10 hover:bg-[var(--surface-container-lowest)] transition-colors group">
      <div className="col-span-2">
        <div className="font-semibold text-[var(--on-surface)]">{title}</div>
        <div className="text-xs text-[var(--on-surface-variant)] mt-1">{type}</div>
      </div>
      <div className="text-[var(--on-surface-variant)]">{company}</div>
      <div className="text-[var(--on-surface-variant)]">{location}</div>
      <div>
        <Badge variant={source.toLowerCase() === 'linkedin' ? 'primary' : 'neutral'}>
          {source}
        </Badge>
      </div>
      <div className="text-[var(--on-surface-variant)]">{datePosted}</div>
      <div className="flex justify-end">
        <button className="bg-[var(--surface-container-high)] text-[var(--on-surface)] rounded-full px-5 py-2 text-sm font-semibold group-hover:bg-[var(--surface-container-highest)] transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
};
