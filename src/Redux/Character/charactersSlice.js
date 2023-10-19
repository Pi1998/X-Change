import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import md5 from 'md5';

const publicKey = '8d8b758839fc1789f13d52ae6a71b1e6';
const privateKey = '57798680b7f101a6b04009d15f5266c93f4fab67';

const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + privateKey + publicKey); 

export const getData = createAsyncThunk('characters/getMarvelCharacters', async () => {
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data && response.data.data && response.data.data.results) {
      return response.data.data.results;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    throw error;
  }
});

const initialState = {
  characters: [],
  loading: false,
  searchValue: '',
  currentPage: 'Home',
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    updateCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.characters = payload;
      })
      .addCase(getData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearchValue, updateCurrentPage } = characterSlice.actions;
export default characterSlice.reducer;
