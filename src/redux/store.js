import { configureStore } from '@reduxjs/toolkit';
import userPreferecesReducer from './slices/userPreferencesSlice';
import seatsReducer from './slices/seatsSlice';

export default configureStore({
   reducer: {
      seats: seatsReducer,
      userPreferences: userPreferecesReducer,
   },
});
