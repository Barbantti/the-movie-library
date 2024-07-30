import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsCalendar,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";

import "./Movie.css";

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  tagline: string;
  budget: number;
  revenue: number;
  overview: string;
  runtime: number;
  release_date: string;
}

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();

  const getMovie = async (url: RequestInfo | URL) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();

    setMovie(data);
  };

  useEffect(() => {
    if (id) {
      const movieUrl = `${movieURL}${id}?${apiKey}`;
      getMovie(movieUrl).catch((err) => console.error(err.message));
    }
  }, [id]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard
            movie={movie}
            showLink={false}
          />
          <p className="tagline">{movie.tagline}'</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Budget:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Revenue
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Run Time
            </h3>
            <p>{movie.runtime} min.</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Overview
            </h3>
            <p>{movie.overview}</p>
          </div>
          <div className="info date">
            <h3>
              <BsCalendar /> Release Date
            </h3>
            <p>{new Date(movie.release_date).toLocaleDateString()}</p>
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
        </>
      )}
    </div>
  );
};

export default Movie;
