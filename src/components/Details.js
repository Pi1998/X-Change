import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateCurrentPage } from '../Redux/Character/charactersSlice';
import '../Styles/Details.css';

const Details = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(updateCurrentPage('Details'));
    }, [dispatch]);

  const { id } = useParams();
  const characters = useSelector((state) => state.characters.characters);
  const character = characters.find((char) => char.id === parseInt(id, 10));

  return (
    <div className= "detailsContainer">
      <div className= "banner" />
      <div className= "searchBar">
        <p className="info">Character Details</p>
      </div>
      <div className= "charactersContainer">
        {character && (
          <div className="characters" key={character.id}>
            <img className= "img" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p className= "name">{character.name}</p>
            <p className= "title">Comics available: {character.comics.available}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
