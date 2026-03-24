import { ArrowUpRight, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Applications Sent', value: '1,452', change: '+12%', icon: Send, color: 'text-blue-500' },
    { label: 'Interviews Scheduled', value: '18', change: '+2', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Time Saved', value: '124 hrs', change: 'This month', icon: Clock, color: 'text-purple-500' },
  ];

  const recentApplications = [
    { company: 'Google', role: 'Senior Frontend Engineer', status: 'Applied', date: '2h ago' },
    { company: 'Stripe', role: 'Fullstack Developer', status: 'Interview', date: '1d ago' },
    { company: 'Linear', role: 'Product Engineer', status: 'Applied', date: '2d ago' },
    { company: 'Vercel', role: 'Software Engineer', status: 'Rejected', date: '3d ago' },
  ];

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
          <button className="fluid-btn-secondary w-full md:w-auto">Review Matches</button>
          <button className="fluid-btn-primary w-full md:w-auto shadow-[var(--ambient-shadow)]">Start AutoApply</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="fluid-card p-6 border border-transparent">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-[var(--surface-container-high)] ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-[var(--on-surface-variant)] text-sm uppercase tracking-wider font-semibold mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-[var(--on-surface)]">
              {stat.value}
            </p>
          </div>
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
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    app.status === 'Applied' ? 'bg-blue-500/10 text-blue-500' :
                    app.status === 'Interview' ? 'bg-green-500/10 text-green-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {app.status}
                  </span>
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
