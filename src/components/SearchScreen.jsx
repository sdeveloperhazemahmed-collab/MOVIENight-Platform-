import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SearchContext } from "../contexts/SearchContext";

export default function SearchScreen() {
  const { closeSearch, searchValue, setSearchValue, searchHistory, addToSearchHistory, clearSearchHistory } = useContext(SearchContext);
  const navigate = useNavigate();
  const screenRef = useRef(null);
  const query = searchValue.trim();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (query === "") {
      setFilteredMovies([]);
      return;
    }

    const controller = new AbortController();
    setIsSearching(true);
    const loadSearchResults = async () => {
      try {
        const movieSearchPromise = fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodeURIComponent(query)}&include_adult=false&page=1`,
          { signal: controller.signal }
        ).then((res) => res.json());

        const personSearchPromise = fetch(
          `https://api.themoviedb.org/3/search/person?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodeURIComponent(query)}&include_adult=false&page=1`,
          { signal: controller.signal }
        ).then((res) => res.json());

        const [movieSearchData, personSearchData] = await Promise.all([movieSearchPromise, personSearchPromise]);

        const merged = new Map();
        const persons = Array.isArray(personSearchData?.results) ? personSearchData.results : [];

        const queryLower = query.toLowerCase();
        const addCandidate = (movie, baseScore) => {
          if (!movie?.id) return;

          const title = (
            movie?.title ||
            movie?.name ||
            movie?.original_title ||
            movie?.original_name ||
            ""
          ).toLowerCase();

          const exact = title === queryLower ? 1 : 0;
          const starts = title.startsWith(queryLower) ? 1 : 0;
          const includes = title.includes(queryLower) ? 1 : 0;
          const popularity = Number(movie?.popularity) || 0;

          const relevanceScore =
            exact * 5000 +
            starts * 2500 +
            includes * 1200 +
            popularity * 0.2;

          const score = baseScore + relevanceScore;
          const existing = merged.get(movie.id);

          if (!existing || score > existing.score) {
            merged.set(movie.id, { movie, score });
          }
        };

        const rankPerson = (person) => {
          const name = (person?.name || "").toLowerCase();
          const isActing = person?.known_for_department === "Acting" ? 1 : 0;
          const exact = name === queryLower ? 1000 : 0;
          const starts = name.startsWith(queryLower) ? 200 : 0;
          const includes = name.includes(queryLower) ? 80 : 0;
          const popularity = Number(person?.popularity) || 0;
          return exact + starts + includes + isActing * 40 + popularity;
        };

        const primaryPerson = persons.length > 0 ? [...persons].sort((a, b) => rankPerson(b) - rankPerson(a))[0] : null;

        if (primaryPerson?.id) {
          const creditsRes = await fetch(
            `https://api.themoviedb.org/3/person/${primaryPerson.id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
            { signal: controller.signal }
          );
          const creditsData = await creditsRes.json();
          const castMovies = Array.isArray(creditsData?.cast) ? creditsData.cast : [];
          const crewMovies = Array.isArray(creditsData?.crew) ? creditsData.crew : [];

          [...castMovies, ...crewMovies]
            .filter((movie) => movie?.id)
            .sort((a, b) => {
              const dateA = a?.release_date || "";
              const dateB = b?.release_date || "";
              return dateB.localeCompare(dateA);
            })
            .forEach((movie, index) => addCandidate(movie, 1200 - index));
        }

        const movieResults = Array.isArray(movieSearchData?.results) ? movieSearchData.results : [];
        movieResults.forEach((movie, index) => addCandidate(movie, 3000 - index * 5));

        const sortedResults = Array.from(merged.values())
          .sort((a, b) => b.score - a.score)
          .map((entry) => entry.movie);

        setFilteredMovies(sortedResults);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setFilteredMovies([]);
        }
      } finally {
        setIsSearching(false);
      }
    };

    loadSearchResults();

    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    const baseMovieId = filteredMovies?.[0]?.id;
    if (!baseMovieId) {
      setSimilarMovies([]);
      return;
    }

    const controller = new AbortController();
    const loadSimilar = async () => {
      try {
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${baseMovieId}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
          { signal: controller.signal }
        );
        const details = await detailsRes.json();

        let collectionMovies = [];
        const collectionId = details?.belongs_to_collection?.id;

        if (collectionId) {
          const collectionRes = await fetch(
            `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
            { signal: controller.signal }
          );
          const collectionData = await collectionRes.json();
          const parts = Array.isArray(collectionData?.parts) ? collectionData.parts : [];

          collectionMovies = parts
            .filter((movie) => movie?.id && movie.id !== baseMovieId)
            .sort((a, b) => (a?.release_date || "").localeCompare(b?.release_date || ""));
        }

        const unique = new Map();
        collectionMovies.forEach((movie) => unique.set(movie.id, movie));

        if (unique.size < 5) {
          const similarRes = await fetch(
            `https://api.themoviedb.org/3/movie/${baseMovieId}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&page=1`,
            { signal: controller.signal }
          );
          const similarData = await similarRes.json();
          const similarResults = Array.isArray(similarData?.results) ? similarData.results : [];

          similarResults
            .filter((movie) => movie?.id && movie.id !== baseMovieId)
            .forEach((movie) => {
              if (!unique.has(movie.id) && unique.size < 5) {
                unique.set(movie.id, movie);
              }
            });
        }

        setSimilarMovies(Array.from(unique.values()).slice(0, 5));
      } catch (err) {
        if (err?.name !== "AbortError") {
          setSimilarMovies([]);
        }
      }
    };

    loadSimilar();

    return () => controller.abort();
  }, [filteredMovies]);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  useLayoutEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: "100%", opacity: 0, scale: 0.985 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: "power3.out",
      }
    );

    const handleClose = () => {
      const tl = gsap.timeline({ onComplete: closeSearch });
      tl.to(el, { y: -14, duration: 0.08, ease: "power1.out", overwrite: "auto" }).to(el, {
        y: 70,
        opacity: 0,
        scale: 0.985,
        duration: 0.12,
        ease: "power1.in",
        overwrite: "auto",
      });
    };

    document.addEventListener("close-search", handleClose);

    return () => {
      document.removeEventListener("close-search", handleClose);
      gsap.killTweensOf(el);
    };
  }, [closeSearch]);

  return (
    <div ref={screenRef} className="fixed top-0 w-[100vw] h-[100vh] z-10 flex items-center justify-center py-2 bg-black/60 backdrop-blur-md pt-4">
      <div className="absolute w-[96vw] h-[80vh] z-10 flex flex-col items-center justify-start gap-10 p-5 py-[60px] rounded-2xl bg-neutral-900/70 backdrop-blur-xl border border-white/10 rounded-tr-none shadow-[0_4px_30px_rgba(0,0,0,0.7)] overflow-y-auto overflow-x-auto scroll-smooth scrollBar">
        <button type="button" onClick={() => document.dispatchEvent(new Event("close-search"))} className="absolute top-4 right-4 bg-black/25 hover:bg-black/40 text-white px-3 py-1 rounded-md">
          Close
        </button>

        <div className="flex items-center justify-center w-full h-[35%]">
          <div className="flex flex-col w-[48%] h-full border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl text-white font-bold px-7 pb-6 h-fit">Search History</h1>
              <button className="text-[#999999] font-bold h-fit px-8" onClick={clearSearchHistory}>
                Clear History
              </button>
            </div>
            <div className="h-full text-white px-7 pb-10">
              {searchHistory.length > 0 && searchHistory.length <= 5 ? (
                searchHistory.map((movie, ndx) => (
                  <div className="flex items-center justify-between" key={ndx}>
                    <p key={ndx} className="text-2xl italic text-[#bbbbbb] font-thin">{movie}</p>
                    <button
                      className="text-sm text-white/50 hover:text-white"
                      onClick={() => {
                        setSearchValue(movie.title || movie.name);
                        addToSearchHistory(movie.title || movie.name);
                      }}
                    >
                      <svg className="w-7" fill="#bbbbbb" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="diagonal-arrow-left-up"> <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"></rect> <path d="M17.71 16.29L9.42 8H15a1 1 0 0 0 0-2H7.05a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1H7a1 1 0 0 0 1-1V9.45l8.26 8.26a1 1 0 0 0 1.42 0 1 1 0 0 0 .03-1.42z"></path> </g> </g> </g></svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-2xl italic text-[#bbbbbb] font-thin">No search history available.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col w-[48%] h-full border-b">
            <h1 className="text-5xl text-white font-bold px-7 pb-6 h-fit">Similar Search</h1>
            <div className="h-full text-white px-7 pb-10">
              {similarMovies.length > 0 && similarMovies.length <= 5 ? (
                similarMovies.map((movie, ndx) => (
                  <div className="flex items-center justify-between" key={ndx}>
                    <p key={movie.id} className="text-2xl italic text-[#bbbbbb] font-thin">{movie.title || movie.name}</p>
                    <button
                      className="text-sm text-white/50 hover:text-white"
                      onClick={() => {
                        setSearchValue(movie.title || movie.name);
                        addToSearchHistory(movie.title || movie.name);
                      }}
                    >
                      <svg className="w-7" fill="#bbbbbb" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="diagonal-arrow-left-up"> <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"></rect> <path d="M17.71 16.29L9.42 8H15a1 1 0 0 0 0-2H7.05a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1H7a1 1 0 0 0 1-1V9.45l8.26 8.26a1 1 0 0 0 1.42 0 1 1 0 0 0 .03-1.42z"></path> </g> </g> </g></svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-2xl italic text-[#bbbbbb] font-thin">No similar searches available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[96%] h-[65%]">
          <h1 className="text-5xl text-white font-bold px-5 mb-6">Search Results</h1>
          {query === "" && <p className="text-2xl italic text-[#bbbbbb] font-thin ml-6">Start typing to search for a movie.</p>}
          {isSearching && <p className="text-white px-5 mb-4">Searching...</p>}
          {query !== "" && !isSearching && filteredMovies.length === 0 && <p className="text-white px-5 mb-4">No movies found.</p>}

          <div className="flex flex-wrap justify-start items-start gap-[19px] gap-y-[29px]">
            {filteredMovies.map((movie) => (
              movie.poster_path && (
                <div className="w-[272px] h-[400px] bg-[var(--light-color)] rounded-lg flex-shrink-0 hover:scale-[1.05] transition-all duration-300 cursor-pointer" key={movie.id}
                  onClick={() => {
                    addToSearchHistory(movie.title || movie.name);
                    navigate(`/movie/${movie.id}`);
                  }}>
                  <img className="rounded-lg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                </div>
              )))}
          </div>
        </div>
      </div>
    </div>
  );
}
