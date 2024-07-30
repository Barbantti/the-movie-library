import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url: RequestInfo | URL) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setMovies(data.results);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      const searchWithQueryURL = `${searchURL}?query=${query}&api_key=${apiKey}`;
      getSearchedMovies(searchWithQueryURL);
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Search results for: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error} try again.</p>}
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
      </div>
      <p className="by-me">
        By{" "}
        <a
          href="https://github.com/Barbantti"
          target="_blank"
          rel="noopener noreferrer"
        >
          Leonardo Barbanti
        </a>
      </p>
    </div>
  );
};

export default Search;
