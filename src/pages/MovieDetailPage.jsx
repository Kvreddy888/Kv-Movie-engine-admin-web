import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getMovieCredits,getMoviePlatform } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetailsPage.css";
import { useNavigate } from "react-router-dom";

function MovieDetailsPage() {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const navigate = useNavigate();


  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  

  useEffect(() => {
    async function loadMovieDetails() {
      const movieDetails = await getMovieDetails(id);
      setMovie(movieDetails);
    }

    loadMovieDetails();
  }, [id]);

  
  useEffect(() => {
    async function loadCredits() {
      const movieCredits = await getMovieCredits(id);
      setCredits(movieCredits);
    }

    loadCredits();
  }, [id]);

  if (!movie) return <p>Loading...</p>;


  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  const handleActorClick = (actorId) => {
  navigate(`/actor/${actorId}`);
};

  const scorePercent = Math.round(movie.vote_average * 10);

    let scoreClass = "score";

    if (scorePercent < 40) {
    scoreClass += " score-red";
    } else if (scorePercent < 70) {
    scoreClass += " score-yellow";
    } else {
    scoreClass += " score-green";
    }


  return (
    <div className="details-hero">

      <div 
        className="details-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      ></div>

      <div className="details-container">

        <div className="details-left">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="details-poster"
          />
        </div>

        {/* RIGHT */}
        <div className="details-right">

          <h1>
            {movie.title} <span>({movie.release_date.slice(0,4)})</span>
          </h1>

          {/* Meta */}
          <div className="details-meta-row">
            <span>{movie.release_date}</span>
            <span>{movie.runtime} min</span>
            <span>
              {movie.genres.map(g => g.name).join(", ")}
            </span>
          </div>

          <div className="details-actions">

            <div className={scoreClass}>
            {scorePercent}%
            </div>


            <span>Popularity: {Math.round(movie.popularity)}</span>
            <h3>available on</h3>
            

            <button 
              className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
              onClick={handleFavoriteClick}
            >
              ♥ </button>

          </div>

          {/* Tagline */}
          {movie.tagline && (
            <p className="tagline">{movie.tagline}</p>
          )}

          {/* Overview */}
          <h3>Overview</h3>
          <p>{movie.overview}</p>

          {/* Extra Info */}
          <div className="details-extra">
            <p><strong>Status:</strong> {movie.status}</p>
            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
            <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>

            <p>
              <strong>Production:</strong>{" "}
              {movie.production_companies.map(c => c.name).join(", ")}
            </p>
          </div>

          {/* Cast (first 10 only) */}
          {credits && (
  <>
    <h3>Top Billed Cast</h3>

    <div className="cast-container">
  {credits.cast.slice(0, 10).map((c) => (
    <div
      className="cast-card"
      key={c.id}
      onClick={() => handleActorClick(c.id)}
    >

      <img
        src={
          c.profile_path
            ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
            : "/no-avatar.png"
        }
        alt={c.name}
        className="cast-img"
      />

      <div className="cast-info">
        <h4>{c.name}</h4>
        <p>{c.character}</p>
      </div>

    </div>
  ))}
</div>

  </>
)}


        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
