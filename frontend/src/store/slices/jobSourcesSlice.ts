import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface JobSource {
  id: string;
  name: string;
  active: boolean;
  comingSoon?: boolean;
}

export interface JobSourcesState {
  sources: JobSource[];
}

const initialState: JobSourcesState = {
  sources: [
    { id: 'linkedin',      name: 'linkedin',      active: true  },
    { id: 'indeed',        name: 'indeed',        active: false },
    { id: 'zip_recruiter', name: 'zip_recruiter', active: false, comingSoon: true },
    { id: 'google',        name: 'google',        active: false, comingSoon: true },
    { id: 'glassdoor',     name: 'glassdoor',     active: false, comingSoon: true },
    { id: 'bayt',          name: 'bayt',          active: false, comingSoon: true },
    { id: 'naukri',        name: 'naukri',        active: false, comingSoon: true },
    { id: 'bdjobs',        name: 'bdjobs',        active: false, comingSoon: true },
  ]
};

const jobSourcesSlice = createSlice({
  name: 'jobSources',
  initialState,
  reducers: {
    toggleSource: (state, action: PayloadAction<string>) => {
      const source = state.sources.find(s => s.id === action.payload);
      if (source && !source.comingSoon) {
        source.active = !source.active;
      }
    }
  }
});

export const { toggleSource } = jobSourcesSlice.actions;
export default jobSourcesSlice.reducer;
