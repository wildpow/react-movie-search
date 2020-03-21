import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "http://www.omdbapi.com/?i=";
const INITAL_SEARCH = "tt3896198";
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(`${MOVIE_API_URL}${INITAL_SEARCH}${API_KEY}`)
      .then(res => res.json())
      .then(jsonRes => {
        setMovies(jsonRes.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`${MOVIE_API_URL}${searchValue}${API_KEY}`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.Response === "True") {
          setMovies(jsonRes.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonRes.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="React Movie Search" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}=${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
