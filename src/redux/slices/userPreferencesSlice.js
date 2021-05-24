import { createSlice } from '@reduxjs/toolkit';

export const userPreferencesSlice = createSlice({
   name: 'userPrefereces',
   initialState: {
      numOfSeats: 0,
      areClose: false,
   },
   reducers: {
      setPreferences: (state, action) => {
         state.numOfSeats = action.payload.numOfSeats;
         state.areClose = action.payload.areClose;
      },
   },
});

export const { setPreferences } = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
