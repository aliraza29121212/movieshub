import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

// const movie1 = {
//   Title: "Avatar",
//   Year: "2009",
//   imdbID: "tt0499549",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setmovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setmovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Avatar");
  }, []);

  return (
    <>
      <div className="app">
        <h1>MoviesHub</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
        {movies.length > 0 ? (
          <div className="container">
            {movies.map((movie, id) => (
              <MovieCard movie={movie} key={id} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movie found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
