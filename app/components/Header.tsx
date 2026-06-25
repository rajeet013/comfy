const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center bg-[url('/hero-bcg.jpeg')] bg-center bg-cover min-h-screen w-full">
      <div className="p-10 flex flex-col items-center justify-center bg-white/60 gap-10 max-w-185 w-full">
        <h1 className="text-[50px] uppercase font-bold text-center w-screen">
          Furniture Collection
        </h1>
        <button className="bg-[#f09d51] h-13 w-50 flex items-center justify-center hover:bg-transparent hover:text-orange-400 hover:cursor-pointer  hover:border-orange-400 hover:border">
          <p className="text-md uppercase">Shop Now</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
