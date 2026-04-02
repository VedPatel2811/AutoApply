import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Job {
  id: string;
  site: string;
  job_url: string;
  job_url_direct: string | null;
  title: string;
  company: string;
  location: string;
  date_posted: string | null;
  job_type: string | null;
  is_remote: boolean;
  description: string | null;
}

interface JobResultsState {
  jobs: Job[];
  total: number;
  loading: boolean;
  error: string | null;
  searched: boolean;
}

const initialState: JobResultsState = {
  jobs: [],
  total: 0,
  loading: false,
  error: null,
  searched: false,
};

export const fetchJobs = createAsyncThunk(
  'jobResults/fetch',
  async (payload: {
    site_name: string[];
    search_term: string;
    location: string;
    results_wanted: number;
    hours_old: number;
    country_indeed: string;
  }) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/jobs/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json() as Promise<{ total_jobs: number; jobs: Job[] }>;
  }
);

const jobResultsSlice = createSlice({
  name: 'jobResults',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searched = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.total = action.payload.total_jobs;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default jobResultsSlice.reducer;
