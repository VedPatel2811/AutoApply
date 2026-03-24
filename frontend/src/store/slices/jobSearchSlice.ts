import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface JobSearchState {
  searchTerm: string;
  location: string;
  country: string;
  resultsWanted: string;
  hoursOld: string;
}

const initialState: JobSearchState = {
  searchTerm: '',
  location: '',
  country: 'United States',
  resultsWanted: '50',
  hoursOld: '24'
};

const jobSearchSlice = createSlice({
  name: 'jobSearch',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => { state.searchTerm = action.payload; },
    setLocation: (state, action: PayloadAction<string>) => { state.location = action.payload; },
    setCountry: (state, action: PayloadAction<string>) => { state.country = action.payload; },
    setResultsWanted: (state, action: PayloadAction<string>) => { state.resultsWanted = action.payload; },
    setHoursOld: (state, action: PayloadAction<string>) => { state.hoursOld = action.payload; },
    resetSearch: (state) => {
        state.searchTerm = '';
        state.location = '';
        state.country = 'United States';
        state.resultsWanted = '50';
        state.hoursOld = '24';
    }
  }
});

export const { setSearchTerm, setLocation, setCountry, setResultsWanted, setHoursOld, resetSearch } = jobSearchSlice.actions;
export default jobSearchSlice.reducer;
