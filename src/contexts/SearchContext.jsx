import { createContext, useCallback, useEffect, useState } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchWindow, setSearchWindow] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const stored = localStorage.getItem("search_history");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const openSearch = useCallback(() => {
    setSearchWindow(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchWindow(false);
    setSearchValue("");
  }, []);

  const addToSearchHistory = useCallback((movieName) => {
    const name = (movieName || "").trim();
    if (!name) return;

    setSearchHistory((prev) => {
      const withoutCurrent = prev.filter((item) => item !== name);
      return [name, ...withoutCurrent].slice(0, 5);
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem("search_history");
  }, []);

  useEffect(() => {
    localStorage.setItem("search_history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchWindow,
        openSearch,
        closeSearch,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
