import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { Moon, Sun, User as UserIcon } from 'lucide-react';

export default function UserLayout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-[var(--outline-variant)]/20 bg-[var(--surface)] sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-bold text-xl tracking-tight text-[var(--on-surface)]">AutoApply</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-[var(--primary)] border-b-2 border-[var(--primary)] py-5">
              Dashboard
            </Link>
            <Link to="/applied-jobs" className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors py-5">
              Applied Jobs
            </Link>
            <Link to="/profile" className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors py-5">
              Profile
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] rounded-full transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className="w-px h-6 bg-[var(--outline-variant)]/30 mx-2"></div>
          
          <Link to="/signin" className="text-sm font-medium text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] px-2">
            Sign In
          </Link>
          <Link to="/signup" className="text-sm font-medium bg-[var(--surface-container-high)] text-[var(--primary)] hover:bg-[var(--surface-container-highest)] px-4 py-2 rounded-full transition-colors">
            Sign Up
          </Link>
          <button className="text-sm font-medium text-[var(--on-primary)] bg-[var(--primary-container)] px-4 py-2 rounded-full shadow-[var(--ambient-shadow)] hover:opacity-90 transition-opacity">
            Upgrade
          </button>
          
          <div className="w-8 h-8 rounded-full bg-orange-200 ml-2 overflow-hidden flex items-center justify-center border border-[var(--outline-variant)]/20">
             <UserIcon className="w-4 h-4 text-orange-600" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[var(--outline-variant)]/20 bg-[var(--surface-container-lowest)] py-6 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-[var(--on-surface-variant)] font-semibold tracking-wider uppercase">
          <p>© 2024 AUTOAPPLY. THE INVISIBLE CONCIERGE.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--on-surface)] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[var(--on-surface)] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[var(--on-surface)] transition-colors">SUPPORT</a>
            <a href="#" className="hover:text-[var(--on-surface)] transition-colors">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
