import { configureStore } from '@reduxjs/toolkit';
import characterReducers from './Character/charactersSlice';

const store = configureStore({
  reducer: {
    characters: characterReducers,
  },
});

export default store;
