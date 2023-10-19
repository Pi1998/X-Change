import { Link } from 'react-router-dom';
import { FaSearch, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../Styles/Home.css';
import { getData } from '../Redux/Character/charactersSlice';
import Footer from './Footer';

const Home = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const loading = useSelector((state) => state.characters.loading);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="homeContainer">
      <div className= "banner" />
      <div className= "searchBar">
        <FaSearch color="#fff" />
        <input
          type="text"
          placeholder="Search Marvel characters"
          className= "searchInput"
          disabled
        />
      </div>
      <div className= "cardsContainer">
        {loading ? (
          <p>Loading Marvel characters...</p>
        ) : (
          characters.map((character) => (
            <div key={character.id} className= "card">
              <Link className= "goArrow" to={`/details/${character.id}`}>
                <FaRegArrowAltCircleRight fontSize="1.5rem" color="#fff" />
              </Link>
              <p className= "text">
                {character.name}
                <br />
                <span className= "span">
                  {character.comics.available}
                  {' '}
                  comics available
                </span>
              </p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
