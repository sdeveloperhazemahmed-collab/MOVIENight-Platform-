export default function PageBtns({ page, setPage }) {
  return (
    <div className="flex justify-between items-center w-[200px] px-2 py-2 mb-10 self-center bg-white/10 text-[22px] rounded-full text-[var(--light-color)]">
      <button className="flex justify-center items-center w-8 h-8 border border-[var(--light-color)] rounded-full hover:bg-white/10 transition-all duration-300" onClick={() => { page > 1 && setPage(page - 1); }}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 19L9 12L10.5 10.25M15 5L13 7.33333" stroke="var(--light-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </button>
      <p>Page {page}</p>
      <button className="flex justify-center items-center w-8 h-8 border border-[var(--light-color)] rounded-full hover:bg-white/10 transition-all duration-300" onClick={() => { setPage(page + 1) }}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 5L11 7.33333M9 19L15 12L13.5 10.25" stroke="var(--light-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </button>
    </div>
  );
}
