import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBtns from "./PageBtns";

export default function UpcomigMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&page=${page}`
    )
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [page]);

  return (
    <>
      <div className="flex justify-start flex-wrap gap-[26px] w-[96%] h-[1790px] ml-[2%] overflow-x-auto scroll-smooth scrollBar">
        {movies.map(movie => (
          <div
            className="mx-[6px] my-[10px] w-[272px] h-[405px] bg-[var(--light-color)] rounded-lg flex-shrink-0 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              className="rounded-lg text-[30px]"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} - this movie is currently unavailable`}
            />

            {/* <h3>{movie.title}</h3> */}
            {/* <p>⭐ {(movie.vote_average).toFixed(1)}</p> */}
          </div>
        ))}
      </div>
      <PageBtns page={page} setPage={setPage} />
    </>
  );
}
