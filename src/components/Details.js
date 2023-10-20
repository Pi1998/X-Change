import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateCurrentPage, setCharacterName } from '../Redux/Character/charactersSlice';
import '../Styles/Details.css';

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const characters = useSelector((state) => state.characters.characters);
  const character = characters.find((char) => char.id === parseInt(id, 10));

  useEffect(() => {
    dispatch(updateCurrentPage('Details'));
    if (character) {
      dispatch(setCharacterName(character.name));
    }
    // eslint-disable-next-line
  }, [dispatch, id]);

  return (
    <div className="detailsContainer">
      {character && (
        <div
          className="banner"
          style={{
            background: `url(${character.thumbnail.path}.${character.thumbnail.extension})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <div className="searchBar">
        <p className="info">
          Available Comics:
          <span style={{ color: 'red' }}>{character.comics.available}</span>
        </p>
        <p className="info">Data provided by Marvel. © 2014 Marvel</p>
      </div>
      <div className="charactersContainer">
        {character && (
          <div className="characters" key={character.id}>
            {character.comics.items.map((comic, index) => (
              <div
                key={comic.resourceURI}
                className={index % 2 === 0 ? 'even' : 'odd'}
              >
                {comic.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
