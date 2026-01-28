const API_KEY ="8260013511f2c2f82fed9ab1c421698a"
const BASE_URL="https://api.themoviedb.org/3"


export const getPopularMovies = async ()=>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}` );
    const data = await response.json()
    return data.results
}

export const searchMovies = async (query) => {
    if (!query) return [];
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
};

export const getMovieDetails =async (movieId)=>{
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    const data = await response.json();
    return data;
}

export const getMovieCredits = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  return res.json();
};

export const getActorDetails = async (actorId) => {
  const res = await fetch(
    `${BASE_URL}/person/${actorId}?api_key=${API_KEY}`
  );
  return res.json();
};


export const getActorMovies = async (actorId) => {
  const res = await fetch(
    `${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}`
  );
  return res.json();
};

export const getMoviePlatform = async(id)=>{
  const res = await fetch(
     `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
  );
  return res.json();
}



