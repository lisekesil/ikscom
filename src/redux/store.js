import { configureStore } from '@reduxjs/toolkit';
import userPreferecesReducer from './slices/userPreferencesSlice';

export default configureStore({
   reducer: {
      userPreferences: userPreferecesReducer,
   },
});
