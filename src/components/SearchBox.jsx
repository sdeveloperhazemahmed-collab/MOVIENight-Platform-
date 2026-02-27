export default function SearchBox() {
  return (
    <div className="search-section mr-[2%]">
      <input className="search-box" type="text" placeholder="Search a Movie..." />
      <button className="search">
        <svg className="w-[30px]" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/></svg>
      </button>
    </div>
  );
}