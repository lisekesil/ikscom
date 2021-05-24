import { createSlice } from '@reduxjs/toolkit';

export const seatsSlice = createSlice({
   name: 'seats',
   initialState: {
      loading: false,
      hasErrors: false,
      seats: [],
   },
   reducers: {
      getSeats: (state) => {
         state.loading = true;
      },
      getSeatsFailure: (state) => {
         state.loading = false;
         state.hasErrors = true;
      },
      getSeatsSuccess: (state, action) => {
         state.seats = action.payload;
         state.loading = false;
         state.hasErrors = false;
      },
   },
});

export const { getSeats, getSeatsFailure, getSeatsSuccess } = seatsSlice.actions;

export const seatsSelector = (state) => state.seats;

export default seatsSlice.reducer;

export function fetchSeats() {
   return async (dispatch) => {
      dispatch(getSeats());
      try {
         const res = await fetch(`http://localhost:3000/seats`);
         const data = await res.json();
         dispatch(getSeatsSuccess(data));
      } catch (error) {
         dispatch(getSeatsFailure());
      }
   };
}
