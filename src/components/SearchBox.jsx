import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function SearchBox() {
  const { searchValue, setSearchValue, openSearch, searchWindow } = useContext(SearchContext);

  const handleOpenSearch = () => {
    if (!searchWindow) openSearch();
  };

  return (
    <div
      className={`search-section flex items-center justify-between relative z-20 mr-[2%] border transition-all duration-300 ${
        searchWindow
          ? "bg-neutral-900/70 backdrop-blur-xl border-white/10 border-b-0 text-white rounded-3xl rounded-b-none"
          : "w-fit rounded-full text-[var(--dark-color)]"
      }`}
    >
      <input
        className="search-box"
        type="text"
        placeholder="Search a Movie..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={handleOpenSearch}
        onClick={handleOpenSearch}
      />
      <button className="search">
        <svg className="w-[30px]" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/></svg>
      </button>
    </div>
  );
}
