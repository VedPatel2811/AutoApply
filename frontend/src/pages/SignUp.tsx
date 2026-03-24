import { Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase } from 'lucide-react';

export default function SignUp() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--on-surface)]">Create an account</h2>
        <p className="text-[var(--on-surface-variant)] mt-2">Start automating your job search today</p>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
              First name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
              <input
                type="text"
                className="w-full fluid-input pl-10 py-3"
                placeholder="John"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
              Last name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
              <input
                type="text"
                className="w-full fluid-input pl-10 py-3"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

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
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
            Current Title
          </label>
          <div className="relative">
            <Briefcase className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
            <input
              type="text"
              className="w-full fluid-input pl-10 py-3"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
            <input
              type="password"
              className="w-full fluid-input pl-10 py-3"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="button" className="w-full fluid-btn-primary py-3 text-lg mt-4 shadow-[var(--ambient-shadow)]">
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-[var(--on-surface-variant)] mt-8">
        Already have an account?{' '}
        <Link to="/signin" className="text-[var(--primary)] font-medium hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
