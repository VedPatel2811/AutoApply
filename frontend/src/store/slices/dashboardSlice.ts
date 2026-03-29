import { createSlice } from '@reduxjs/toolkit';

export interface Application {
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Rejected';
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  iconName: 'Send' | 'CheckCircle2' | 'Clock';
  color: string;
}

interface DashboardState {
  stats: Stat[];
  recentApplications: Application[];
}

const initialState: DashboardState = {
  stats: [
    { label: 'Applications Sent', value: '1,452', change: '+12%', iconName: 'Send', color: 'text-blue-500' },
    { label: 'Interviews Scheduled', value: '18', change: '+2', iconName: 'CheckCircle2', color: 'text-green-500' },
    { label: 'Time Saved', value: '124 hrs', change: 'This month', iconName: 'Clock', color: 'text-purple-500' },
  ],
  recentApplications: [
    { company: 'Google', role: 'Senior Software Engineer', status: 'Applied', date: '2h ago' },
    { company: 'Stripe', role: 'Fullstack Developer', status: 'Interview', date: '1d ago' },
    { company: 'Linear', role: 'Product Engineer', status: 'Applied', date: '2d ago' },
    { company: 'Vercel', role: 'Software Engineer', status: 'Rejected', date: '3d ago' },
  ]
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {}
});

export default dashboardSlice.reducer;
