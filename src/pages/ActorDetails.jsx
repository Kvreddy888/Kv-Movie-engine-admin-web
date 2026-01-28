import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getActorDetails } from "../services/api";
import "../css/ActorDetails.css";
import { getActorMovies } from "../services/api";
import { useNavigate } from "react-router-dom";
function ActorDetails() {

    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  const { actorid } = useParams();
  const navigate = useNavigate();

  const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
   


 useEffect(() => {
    async function fetchData() {
      const actorData = await getActorDetails(actorid);
      const movieData = await getActorMovies(actorid);

      setActor(actorData);
      const sortedMovies = movieData.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10);

      setMovies(sortedMovies);
    }

    fetchData();
  }, [actorid]);

  if (!actor) return <p className="loading">Loading actor details...</p>;

  return (
    <div className="actor-hero">

      <div className="actor-container">

        <div className="actor-left">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "/no-avatar.png"
            }
            alt={actor.name}
            className="actor-photo"
          />
        </div>

        {/* RIGHT */}
        <div className="actor-right">

          <h1>{actor.name}</h1>

          {actor.known_for_department && (
            <p className="actor-role">
              {actor.known_for_department}
            </p>
          )}

          <div className="actor-meta">

            {actor.birthday && (
              <span>🎂 {actor.birthday}</span>
            )}

            {actor.place_of_birth && (
              <span>📍 {actor.place_of_birth}</span>
            )}

            {actor.popularity && (
              <span>🔥 Popularity: {Math.round(actor.popularity)}</span>
            )}

          </div>

          {actor.biography && (
            <>
              <h3>Biography</h3>
              <p className="actor-bio">
                {actor.biography || "No biography available."}
              </p>
              <h3>Known For Movies:</h3>
            </>
          )}
        </div>
      </div>
       
     <div className="known-for-list">
  {movies.map((movie) => (
    <div 
      key={movie.id} 
      className="known-for-card"
     onClick={() => navigate(`/movie/${movie.id}`)}
      style={{ cursor: "pointer" }} 
    >
      <img
        src={movie.poster_path 
          ? IMAGE_BASE + movie.poster_path 
          : "/no-image.png"}
        alt={movie.title}
      />
      <p>{movie.title}</p>
    </div>
  ))}
</div>

</div>
  );
}

export default ActorDetails;
