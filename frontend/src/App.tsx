import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import UserLayout from './layouts/UserLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Normal User Dashboard at root path */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="applied-jobs" element={<div className="text-[var(--on-surface-variant)] text-center mt-20">Applied Jobs Coming Soon</div>} />
            <Route path="profile" element={<div className="text-[var(--on-surface-variant)] text-center mt-20">Profile Coming Soon</div>} />
          </Route>
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<div className="text-[var(--on-surface-variant)] text-center mt-20">Applications Feature Coming Soon</div>} />
            <Route path="settings" element={<div className="text-[var(--on-surface-variant)] text-center mt-20">Settings Feature Coming Soon</div>} />
          </Route>
          
          {/* Auth pages kept but not required to access dashboard */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
