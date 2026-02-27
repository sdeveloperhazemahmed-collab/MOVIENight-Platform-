import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBtns from "./PageBtns";

export default function NatGeoMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_companies=7521&page=${page}`
    )
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [page]);


  return (
    <>
      <div className="flex gap-4 w-[100%] h-[451px] m-10">
        <div className="flex flex-col justify-start items-center w-[30%]">
          <img className="w-[250px]" src="nationalgeographic.png" />
          <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="text-[var(--light-color)] text-[40px] text-center">Watch the World Through Stories</h1>
            <button className="bg-white/10 hover:bg-white/20 text-[var(--light-color)] text-[20px] rounded-[4px] px-8 py-4 uppercase transition-all duration-300">Browse All</button>
          </div>
        </div>

        <div className="flex justify-start items-center gap-4 w-[70%] overflow-x-auto scroll-smooth scrollBar">
          {movies.map(movie => (
            <div
              className="m-[6px] w-[272px] h-[400px] bg-[var(--light-color)] rounded-lg flex-shrink-0 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </div>
          ))}
        </div>
      </div>
      
      <PageBtns page={page} setPage={setPage} />
    </>
  );
}
