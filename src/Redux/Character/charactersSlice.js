import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import md5 from 'md5';

const publicKey = '8d8b758839fc1789f13d52ae6a71b1e6';
const privateKey = '57798680b7f101a6b04009d15f5266c93f4fab67';

const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + privateKey + publicKey);

export const getData = createAsyncThunk('characters/getMarvelCharacters', async () => {
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data && data.data && data.data.results) {
      const filteredData = data.data.results.map((character) => ({
        id: character.id,
        name: character.name,
        comics: {
          available: character.comics.available,
          items: character.comics.items.map((comic) => ({
            name: comic.name,
          })),
        },
        thumbnail: {
          path: character.thumbnail.path,
          extension: character.thumbnail.extension,
        },
      }));

      return filteredData;
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
    setCharacterName: (state, { payload }) => {
      state.characterName = payload;
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

export const { setSearchValue, updateCurrentPage, setCharacterName } = characterSlice.actions;
export default characterSlice.reducer;
