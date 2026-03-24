import { Link } from 'react-router-dom';
import { Mail, Lock, Code, Globe } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--on-surface)]">Welcome back</h2>
        <p className="text-[var(--on-surface-variant)] mt-2">Sign in to your AutoApply account</p>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center gap-3 fluid-btn-secondary py-3">
          <Globe className="w-5 h-5" />
          Sign in with Google
        </button>
        <button className="w-full flex items-center justify-center gap-3 fluid-btn-secondary py-3">
          <Code className="w-5 h-5" />
          Sign in with GitHub
        </button>
      </div>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--outline-variant)]/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)]">Or continue with</span>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
            <input
              type="email"
              className="w-full fluid-input pl-10 py-3"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
              Password
            </label>
            <a href="#" className="text-sm text-[var(--primary)] hover:underline">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
            <input
              type="password"
              className="w-full fluid-input pl-10 py-3"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="button" className="w-full fluid-btn-primary py-3 text-lg mt-2 shadow-[var(--ambient-shadow)]">
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-[var(--on-surface-variant)] mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[var(--primary)] font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
