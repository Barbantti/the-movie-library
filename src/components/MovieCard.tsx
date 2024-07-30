import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

const MovieCard = ({
  movie,
  showLink = true,
}: {
  movie: Movie;
  showLink?: boolean;
}) => {
  return (
    <div className="movie-card">
      <img
        src={imageUrl + movie.poster_path}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Details</Link>}
    </div>
  );
};

export default MovieCard;
