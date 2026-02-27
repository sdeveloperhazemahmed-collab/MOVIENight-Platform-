import { gsap } from "gsap";
import { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from "react-router-dom";

// import { ModeContext } from './contexts/ModeContext';
import { UsedBtnContext } from './contexts/UsedBtnContext';

import Logo from "./components/Logo";
import PSLightBg from "./data/PSLightBg";
import NavBar from "./components/NavBar";
import Buttons from "./components/Buttons";
import SearchBox from "./components/SearchBox";
import Favourites from "./components/Favourites";
import PixarMovies from "./components/PixarMovies";
import RandomMovie from "./components/RandomMovie";
import MarvelMovies from "./components/MarvelMovies";
import NatGeoMovies from "./components/NatGeoMovies";
import DisneyMovies from "./components/DisneyMovies";
import UpcomigMovies from './components/UpcomigMovies';
import StarWarsMovies from "./components/StarWarsMovies";

export default function App() {

  const PSLight = PSLightBg;
  const [bg] = useState(PSLight());

  // const { darkMode } = useContext(ModeContext);
  const { selectedBtn } = useContext(UsedBtnContext);
  
  const [favouritesWindow] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // const [id, setId] = useState(null);

  const loadingRef = useRef(null);
  const logoRef = useRef(null);
  const wordClipRef = useRef(null);
  const wordRef = useRef(null);
  const spinnerRef = useRef(null);
  const channelContentRef = useRef(null);
  const isFirstChannelPaint = useRef(true);

  useEffect(() => {
    if (!showLoading) return;

    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, { scale: 1.5, x: 0, transformOrigin: "center center" });
      gsap.set(wordClipRef.current, { width: 0 });
      gsap.set(wordRef.current, { x: -140, opacity: 0 });
      gsap.set(spinnerRef.current, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        onComplete: () => setShowLoading(false),
      });

      tl.to(logoRef.current, {
        scale: 1.5,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(logoRef.current, {
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(wordClipRef.current, {
          width: 935,
          duration: 0.85,
          ease: "power2.inOut",
        }, "-=0.15")
        .to(logoRef.current, {
          x: 0,
          duration: 0.85,
          ease: "power2.inOut",
        }, "<")
        .to(wordRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
        }, "<")
        .to(spinnerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power1.out",
        }, "-=0.15")
        .to(loadingRef.current, {
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.inOut",
        });
    });

    return () => ctx.revert();
  }, [showLoading]);


  useEffect(() => {
    document.body.style.backgroundImage = bg;
  }, [bg]);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  useEffect(() => {
    const channelBgMap = {
      disney: "var(--disney-bg)",
      pixar: "var(--pixar-bg)",
      marvel: "var(--marvel-bg)",
      natgeo: "var(--natgeo-bg)",
      starwars: "var(--starwars-bg)",
    };
    const nextBg = channelBgMap[selectedBtn] || "var(--disney-bg)";
    const content = channelContentRef.current;
    document.documentElement.style.setProperty("--active-channel-bg", nextBg);

    if (!content || isFirstChannelPaint.current) {
      isFirstChannelPaint.current = false;
      return;
    }

    gsap.killTweensOf(content);
    gsap.fromTo(
      content,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, [selectedBtn]);

  return (
    <>
      {showLoading && (
        <div ref={loadingRef} className="flex justify-center items-center bg-[var(--dark-color)] text-[var(--light-color)] fixed inset-0 z-[99999] opacity-100 w-full">
          <div className="flex flex-col justify-center items-center gap-40 w-full">
            <div className="flex justify-center items-start h-[300px] pt-10 w-full">
              <svg ref={logoRef} className="w-[240px] flex-shrink-0" fill="var(--light-color)" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 53.029 53.029" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse cx="19.256" cy="29.372" rx="7.11" ry="10.047"></ellipse> <polygon points="32.956,52.219 34.429,52.219 37.36,8.931 35.18,8.675 "></polygon> <polygon points="45.878,9.928 44.09,9.719 39.134,52.219 41.505,52.219 "></polygon> <polygon points="41.468,9.412 40.23,9.267 36.032,52.219 37.523,52.219 "></polygon> <path d="M42.871,5.65c-0.059,0-0.113,0.012-0.171,0.018c-0.286-0.217-0.642-0.352-1.028-0.352c-0.529,0-0.995,0.244-1.31,0.621 c-0.169-1.156-1.156-2.048-2.363-2.048c-0.679,0-1.289,0.284-1.724,0.738c-0.088-0.862-0.805-1.539-1.693-1.539 c-0.517,0-0.976,0.234-1.286,0.597c-0.379-0.381-0.904-0.62-1.484-0.62c-0.18,0-0.353,0.031-0.52,0.073 c0.02-0.099,0.031-0.197,0.031-0.301c0-0.944-0.767-1.709-1.71-1.709c-0.563,0-1.06,0.277-1.37,0.698 C27.833,0.759,26.811,0,25.601,0c-1.152,0-2.142,0.692-2.584,1.678c-0.038-0.002-0.073-0.01-0.11-0.01 c-0.717,0-1.343,0.369-1.709,0.923c-0.022,0-0.043-0.006-0.064-0.006c-0.973,0-1.772,0.71-1.927,1.638 c-0.35-0.753-1.109-1.279-1.996-1.279c-0.709,0-1.332,0.34-1.737,0.861c-0.236-0.124-0.5-0.201-0.788-0.201 c-0.759,0-1.396,0.499-1.619,1.184c-0.369-0.178-0.779-0.285-1.218-0.285c-1.565,0-2.835,1.27-2.835,2.835 c0,0.775,0.297,1.659,0.803,2.171l19.835-2.081l14.909,1.703V7.103h-0.017C44.422,6.282,43.725,5.65,42.871,5.65z"></path> <path d="M10.573,10.221l-3.421,0.354l4.051,42.455l2.972-0.137l-1.381-16.357c-1.184-1.955-1.896-4.447-1.896-7.163 c0-1.794,0.319-3.485,0.87-4.995L10.573,10.221z"></path> <path d="M26.932,52.306l1.932-0.087h1.974L32.46,8.357l-1.812-0.212l-2.942,0.303l-0.338,19.186 c0.065,0.567,0.108,1.146,0.108,1.737c0,0.8-0.063,1.581-0.181,2.336L26.932,52.306z"></path> <path d="M23.944,8.838l-3.381,0.349l0.236,9.042c1.203,0.303,2.316,0.952,3.281,1.87L23.944,8.838z"></path> <path d="M21.701,52.547l2.772-0.128l-0.17-13.998c-0.861,0.878-1.849,1.532-2.923,1.913L21.701,52.547z"></path> <path d="M17.497,9.504l-2.871,0.296l0.446,9.747c0.845-0.66,1.782-1.121,2.779-1.349L17.497,9.504z"></path> <path d="M16.591,52.78l2.667-0.122l-0.489-11.979c-0.977-0.074-1.911-0.364-2.77-0.852L16.591,52.78z"></path> </g> </g> </g></svg>
              <div ref={wordClipRef} className="overflow-hidden w-[300px] whitespace-nowrap">
                <h1 ref={wordRef} className="flex items-center justify-center text-[var(--color)] text-[200px] w-fit select-none" style={{ fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}><span>MOVIE</span>Night</h1>
              </div>
            </div>
            <div className="spinner"></div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/"
          element={
            <div className="flex flex-col gap-0 justify-start items-start pb-[150px]">
              <header className="flex justify-start items-center w-full h-[150px] mt-2">
                <Logo />
                <SearchBox />
              </header>

              <main className="flex flex-col justify-start items-center w-full h-[1100px]">
                <div className='gradiant flex items-center justify-start w-full h-full'>
                  <aside className="flex justify-start items-center w-[10%] h-full">
                    <NavBar />
                  </aside>

                  <section className='flex flex-col justify-center items-center w-[90%] h-full'>
                    <Buttons />
                    <div ref={channelContentRef} className='flex flex-col justify-center items-center w-full h-full'>
                      {selectedBtn === "disney" && <DisneyMovies />}
                      {selectedBtn === "pixar" && <PixarMovies />}
                      {selectedBtn === "marvel" && <MarvelMovies />}
                      {selectedBtn === "natgeo" && <NatGeoMovies />}
                      {selectedBtn === "starwars" && <StarWarsMovies />}
                    </div>
                  </section>
                </div>

                <section className='flex flex-col w-full mt-2'>
                  <h1 className='text-[var(--light-color)] text-[70px] ml-[2%]'>Upcomig Movies</h1>
                  <UpcomigMovies />
                </section>

                {favouritesWindow && (<Favourites />)}
              </main>

              {/* <footer className='flex justify-center items-center w-full h-[150px] text-[var(--light-color)] bg-[rgba(0,0,0,0.45)] backdrop-blur-[2px]'>
                Version I.II • MMXXVI
              </footer> */}
            </div >
          }
        />
        <Route path="/movie/:id" element={<RandomMovie />} />
      </Routes>
    </>
  );
}
