import { Send, CheckCircle2, Clock, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Send,
  CheckCircle2,
  Clock,
};

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  iconName: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  iconName,
  color,
}) => {
  const Icon = iconMap[iconName] || Send;

  return (
    <div className="fluid-card p-6 border border-transparent">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-[var(--surface-container-high)] ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <p className="text-[var(--on-surface-variant)] text-sm uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-[var(--on-surface)]">
        {value}
      </p>
    </div>
  );
};
