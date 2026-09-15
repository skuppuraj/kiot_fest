import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ALL_EVENTS } from '../../data/events';

/**
 * Async Thunk to fetch events from API or fallback data
 */
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({ department = 'ALL', category = 'ALL', search = '' } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (department && department !== 'ALL') queryParams.append('department', department);
      if (category && category !== 'ALL') queryParams.append('category', category);
      if (search) queryParams.append('search', search);

      const res = await fetch(`/api/events?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error('API response was not ok');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      // Graceful fallback to initial events if API is offline
      let filtered = ALL_EVENTS;
      if (department && department !== 'ALL') {
        filtered = filtered.filter(e => e.department === department);
      }
      if (search) {
        filtered = filtered.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
      }
      return filtered;
    }
  }
);

const initialState = {
  events: ALL_EVENTS,
  selectedDepartment: 'ALL',
  selectedCategory: 'ALL',
  searchQuery: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setInitialEvents: (state, action) => {
      state.events = action.payload;
      state.status = 'succeeded';
    },
    resetFilters: (state) => {
      state.selectedDepartment = 'ALL';
      state.selectedCategory = 'ALL';
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred';
      });
  }
});

export const {
  setDepartment,
  setCategory,
  setSearchQuery,
  setInitialEvents,
  resetFilters
} = eventSlice.actions;

// Selectors
export const selectAllEvents = (state) => state.events.events;
export const selectDepartmentFilter = (state) => state.events.selectedDepartment;
export const selectCategoryFilter = (state) => state.events.selectedCategory;
export const selectSearchQuery = (state) => state.events.searchQuery;
export const selectEventsStatus = (state) => state.events.status;
export const selectEventsError = (state) => state.events.error;

export default eventSlice.reducer;
