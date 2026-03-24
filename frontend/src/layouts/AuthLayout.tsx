import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--surface-container-low)]">
      {/* Left side, branding / abstract visual */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] rounded-br-[48px]">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-[var(--on-primary)]/20 flex items-center justify-center">
              <span className="font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">AutoApply</h1>
          </div>
          <h2 className="text-5xl font-bold leading-tight max-w-md mt-24">
            The Invisible Concierge
          </h2>
          <p className="text-lg mt-6 opacity-80 max-w-sm">
            Automating your job search with a high-end, silent partner. Fluid, effortless, capable.
          </p>
        </div>
      </div>

      {/* Right side, forms */}
      <div className="flex items-center justify-center p-8 bg-[var(--surface)]">
        <div className="w-full max-w-md fluid-card p-8 bg-opacity-80 backdrop-blur-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
