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

  //!
  useEffect(() => {
    if (!id) return;

    const apiKey = import.meta.env.VITE_TMDB_KEY;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits,images,similar,recommendations,release_dates`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentMovie(data || null);

        const results = data?.videos?.results || [];
        const trailer =
          results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          ) || results.find((video) => video.site === "YouTube");
        setTrailerKey(trailer?.key || "");

        setMovies(data?.similar?.results || []);
      })
      .catch((err) => console.error(err));
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

  const getAgeRate = (movie, country = "US") => {
    const countryData = movie?.release_dates?.results?.find(
      (r) => r.iso_3166_1 === country
    );
    return (
      countryData?.release_dates?.find((r) => r.certification)?.certification ||
      "N/A"
    );
  };

  const trailerSrc = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?start=10&autoplay=1&rel=0&modestbranding=1`
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
            <div className="w-full min-w-screen min-h-screen rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
              No movie image available
            </div>
          )}

          <div className="absolute bottom-0 left-0 [background-image:var(--d-fade)]  w-full h-full"></div>
          <div className="absolute bottom-0 z-10 flex justify-between items-center pl-[10%] w-full h-[400px] self-end [background-image:var(--v-fade)]">
            <div className="absolute bottom-20 text-[var(--light-color)] flex flex-col gap-4 w-[50%]">
              <h1 className="text-[100px] font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">{currentMovie?.title || "Movie Details"}</h1>
              {currentMovie?.release_date?.slice(0, 4) === "2026" ? <p className="text-blue-500 uppercase text-[20px]">New Release</p> : <p className="text-blue-500 uppercase text-[20px] my-[15px]"></p>}
              <p className="text-[18px]">⭐ {currentMovie?.vote_average != null ? currentMovie.vote_average.toFixed(1) : "N/A"} | {currentMovie?.vote_count != null ? currentMovie.vote_count : "N/A"} vote</p>
              <p className="text-[18px]">
                {currentMovie?.release_date ? currentMovie.release_date.slice(0, 4) : "N/A"} •{" "}
                {currentMovie?.runtime ? `${currentMovie.runtime} min` : "N/A"} •{" "}
                {getAgeRate(currentMovie, "US")} •{" "}
                {currentMovie?.original_language ? currentMovie.original_language.toUpperCase() : "N/A"}
              </p>
              <p className="text-[20px] text-zinc-300">{currentMovie?.overview || "No overview available"}</p>
              <p className="text-[20px]">{currentMovie?.genres ? currentMovie.genres.map(g => g.name).join(" • ") : "No genres available"}</p>
            </div>

            <div className="absolute bottom-5 left-[45%] flex justify-between items-center w-[220px] px-2 py-2 bg-white/10 text-[22px] rounded-full text-[var(--light-color)]">
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
              <p className="absolute right-20 bottom-4 text-zinc-300">Trailer not available</p>
            )}
          </div>
        </div>

        {/* <div className="flex flex-col justify-start items-start gap-4 w-full overflow-x-auto scroll-smooth scrollBar"> */}
        {/* <h1 className='text-[var(--light-color)] text-[70px] ml-[2%]'>Recommended Movies</h1> */}
        <section className='flex flex-col w-full bg-black pt-[2px]'>
          <h1 className='text-[var(--light-color)] text-[70px] ml-[2%]'>Recommended Movies</h1>
          <div className="flex justify-start flex-wrap gap-[26px] w-[96%] h-[1790px] ml-[2%] mb-[150px] overflow-x-auto scroll-smooth scrollBar">
            {movies.map(movie => (
              movie.poster_path && (
                <div className="mx-[6px] my-[10px] w-[272px] h-[405px] bg-[var(--light-color)] rounded-lg flex-shrink-0 hover:scale-[1.05] transition-all duration-300 cursor-pointer" key={movie.id} onClick={() => {setViewMode("image"); setTrailerKey(""); navigate(`/movie/${movie.id}`);}}>
                  <img className="rounded-lg text-[30px]" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} - this movie is currently unavailable`}/>
                </div>
              )))}
          </div>
        </section>
      </div>
    </div>
  );
}
