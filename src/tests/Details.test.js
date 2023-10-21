import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

describe('render', () => {
  it('should store the correct state in the store', () => {
    const mockStore = configureStore();
    const initialState = {
      characters: {
        characters: [
          {
            id: 1,
            name: 'Character 1',
            image: 'character1.jpg',
          },
          {
            id: 2,
            name: 'Character 2',
            image: 'character2.jpg',
          },
          {
            id: 3,
            name: 'Character 3',
            image: 'character3.jpg',
          },
        ],
      },
    };
    const fakeStore = mockStore(initialState);
    fakeStore.dispatch({ type: 'Get/characters', payload: { characters: initialState } });

    expect(fakeStore.getState()).toEqual(initialState);
  });
});
