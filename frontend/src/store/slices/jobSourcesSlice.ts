import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface JobSource {
  id: string;
  name: string;
  active: boolean;
}

interface JobSourcesState {
  sources: JobSource[];
}

const initialState: JobSourcesState = {
  sources: [
    { id: 'linkedin', name: 'linkedin', active: true },
    { id: 'indeed', name: 'indeed', active: false },
    { id: 'zip_recruiter', name: 'zip_recruiter', active: true },
    { id: 'google', name: 'google', active: false },
    { id: 'glassdoor', name: 'glassdoor', active: false },
    { id: 'bayt', name: 'bayt', active: false },
    { id: 'naukri', name: 'naukri', active: false },
    { id: 'bdjobs', name: 'bdjobs', active: false },
  ]
};

const jobSourcesSlice = createSlice({
  name: 'jobSources',
  initialState,
  reducers: {
    toggleSource: (state, action: PayloadAction<string>) => {
      const source = state.sources.find(s => s.id === action.payload);
      if (source) {
        source.active = !source.active;
      }
    }
  }
});

export const { toggleSource } = jobSourcesSlice.actions;
export default jobSourcesSlice.reducer;
