import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";

export default function RandomMovie() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [viewMode, setViewMode] = useState("image");
  const navigate = useNavigate();
  const { id } = useParams();
  const pageContentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setViewMode("image");
    setTrailerKey("");
    setCurrentMovie(null);
  }, [id]);

  useEffect(() => {
    if (!pageContentRef.current) return;
    gsap.killTweensOf(pageContentRef.current);
    gsap.fromTo(
      pageContentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const apiKey = import.meta.env.VITE_TMDB_KEY;

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setCurrentMovie(data || null));

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const results = data?.results || [];
        const trailer =
          results.find(
            video => video.site === "YouTube" && video.type === "Trailer"
          ) || results.find(video => video.site === "YouTube");
        setTrailerKey(trailer?.key || "");
      });

    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setMovies(data.results || []));
  }, [id]);

  const trailerSrc = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?start=5&autoplay=1&rel=0&modestbranding=1`
    : "";


  return (
    <div className='relative flex flex-col items-start justify-start w-full h-full'>
      <aside className="absolute z-50 top-0 left-0 flex flex-col justify-start items-center [background-image:var(--h-fade)] w-[10%] py-[157px] h-[1100px]">
        <NavBar />
      </aside>
      <div ref={pageContentRef} className="flex flex-col gap-4 w-full min-h-screen">
        <div className="relative flex flex-col justify-start items-center w-[95%] ml-[5%] mb-[-16px] overflow-hidden">
          {viewMode === "video" && trailerKey ? (
            <iframe
              className="w-full min-w-screen h-screen rounded-lg scale-[1.4]"
              src={trailerSrc}
              title="Movie trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : currentMovie?.backdrop_path ? (
            <img
              className="w-full min-w-screen h-screen rounded-lg object-cover [image-rendering:pixelated]"
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              alt={currentMovie?.title || "Movie image"}
            />
          ) : (
            <div className="w-full min-w-screen h-[250px] rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
              No movie image available
            </div>
          )}

          <div className="absolute bottom-12 left-0 [background-image:var(--d-fade)]  w-full h-full"></div>
          <div className="absolute bottom-0 z-10 flex justify-between items-center pl-[10%] w-full h-[400px] self-end [background-image:var(--v-fade)]">
            <div className="text-[var(--light-color)] ">
              <h1 className="text-[100px]">
                {currentMovie?.title || "Movie Details"}
              </h1>
              <h3></h3>
              <p>⭐ {(currentMovie.vote_average).toFixed(1)}</p>
            </div>

            <div className="absolute bottom-14 left-[45%] flex justify-between items-center w-[220px] px-2 py-2 bg-white/10 text-[22px] rounded-full text-[var(--light-color)]">
              <button
                className="flex justify-center items-center w-8 h-8 border border-[var(--light-color)] rounded-full hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setViewMode("image")}
                disabled={viewMode === "image"}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L9 12L10.5 10.25M15 5L13 7.33333" stroke="var(--light-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
              <p className="text-base">{viewMode === "video" ? "Trailer" : "Image"}</p>
              <button
                className="flex justify-center items-center w-8 h-8 border border-[var(--light-color)] rounded-full hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setViewMode("video")}
                disabled={viewMode === "video" || !trailerKey}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L11 7.33333M9 19L15 12L13.5 10.25" stroke="var(--light-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
            </div>

            {!trailerKey && (
              <p className="text-zinc-300">Trailer not available</p>
            )}
          </div>
        </div>

        {/* <div className="flex flex-col justify-start items-start gap-4 w-full overflow-x-auto scroll-smooth scrollBar"> */}
        {/* <h1 className='text-[var(--light-color)] text-[70px] ml-[2%]'>Recommended Movies</h1> */}
        <section className='flex flex-col w-full bg-black pt-[2px]'>
          <h1 className='text-[var(--light-color)] text-[70px] ml-[2%]'>Recommended Movies</h1>
          <div className="flex justify-start flex-wrap gap-[26px] w-[96%] h-[1790px] ml-[2%] mb-[150px] overflow-x-auto scroll-smooth scrollBar">
            {movies.map(movie => (
              <div
                className="mx-[6px] my-[10px] w-[272px] h-[405px] bg-[var(--light-color)] rounded-lg flex-shrink-0 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
                key={movie.id}
                onClick={() => {
                  setViewMode("image");
                  setTrailerKey("");
                  setCurrentMovie(movie);
                  navigate(`/movie/${movie.id}`);
                }}
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
        </section>
      </div>
    </div>
  );
}
