export default function Favourites() {
  return (
    <div className="flex justify-center items-center w-full h-full p-10 absolute">

      <div className="relative w-[65%] h-[420px] glass-shape rounded-[60px] overflow-hidden">

        {/* content */}
        <div className="absolute top-8 left-10 text-white">
          <h1 className="text-4xl font-bold">
            Glass <span className="text-lime-400">Morphisim</span>
          </h1>
        </div>

        <p className="absolute bottom-8 left-10 text-white/80">
          Insert Your Background
        </p>

      </div>

    </div>
  );
}
