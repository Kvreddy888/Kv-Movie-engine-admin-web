import { useMovieContext } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import '../css/MovieCard.css';

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const navigate = useNavigate();
  const handleMovieClick=()=>{
    navigate(`/movie/${movie.id}`)
  }
  const handleFavoriteClick = (e) => {
     e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <button
          className={`favorite-btn ${isFavorite(movie.id) ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          ♥
        </button>
        <div className="movie-overlay">
          {/* overlay content */}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date.split('-')[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;