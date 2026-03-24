
import { ArrowUpRight } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { StatCard } from '../components/ui/StatCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function Dashboard() {
  const { stats, recentApplications } = useAppSelector(state => state.dashboard);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative rounded-3xl bg-[var(--surface-container-low)] p-8 overflow-hidden">
        {/* Abstract background blur */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--on-surface)]">
            Welcome back, John
          </h1>
          <p className="text-[var(--on-surface-variant)] mt-2 max-w-lg">
            Your automated concierge has been working while you were away. 
            You have 3 new matching roles ready to review.
          </p>
        </div>
        
        <div className="relative z-10 flex gap-4 w-full md:w-auto">
          <Button variant="secondary" className="w-full md:w-auto">Review Matches</Button>
          <Button variant="primary" className="w-full md:w-auto shadow-[var(--ambient-shadow)]">Start AutoApply</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            iconName={stat.iconName}
            color={stat.color}
          />
        ))}
      </div>

      {/* Fluid Data Table */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-[var(--on-surface)] mb-4 px-2">Recent Applications</h3>
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
            <div>Company</div>
            <div>Role</div>
            <div>Status</div>
            <div className="text-right">Applied On</div>
          </div>
          
          <div className="space-y-2 mt-2">
            {recentApplications.map((app, i) => (
              <div 
                key={i} 
                className="grid grid-cols-4 gap-4 px-4 py-4 rounded-xl items-center hover:bg-[var(--surface-container-lowest)] transition-colors cursor-pointer group"
              >
                <div className="font-semibold text-[var(--on-surface)] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center font-bold text-[var(--primary)] text-xs">
                    {app.company[0]}
                  </div>
                  {app.company}
                </div>
                <div className="text-[var(--on-surface-variant)] group-hover:text-[var(--primary)] transition-colors">
                  {app.role}
                </div>
                <div>
                  <Badge 
                    variant={
                      app.status === 'Applied' ? 'primary' : 
                      app.status === 'Interview' ? 'success' : 
                      'danger'
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
                <div className="text-right text-[var(--on-surface-variant)] flex items-center justify-end gap-2">
                  {app.date}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
