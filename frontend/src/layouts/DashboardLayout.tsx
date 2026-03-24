import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { LayoutDashboard, Users, Settings, Moon, Sun, Bell, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Applications', href: '/applications', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] flex">
      {/* Sidebar - surface_container_low relative to surface main content */}
      <aside className="w-64 bg-[var(--surface-container-low)] border-r border-[var(--outline-variant)]/20 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-[var(--on-surface)]">AutoApply</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[var(--surface-container-highest)] text-[var(--primary)] font-medium shadow-sm'
                    : 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[var(--primary)]' : 'opacity-70'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-[var(--outline-variant)]/20">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-[var(--error)] hover:bg-[var(--error-container)] transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-[var(--outline-variant)]/20 bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-[var(--on-surface)]">
            {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
          </h2>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--primary)] rounded-full"></span>
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 pb-24 flex-1">
          <div className="max-w-6xl mx-auto space-y-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
