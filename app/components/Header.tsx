import Button from "./cards/button";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center bg-[url('/hero-bcg.jpeg')] bg-center bg-cover min-h-screen w-full">
      <div className="p-10 flex flex-col items-center justify-center bg-white/80 gap-10 max-w-185 w-full">
        <h1 className="text-[50px] uppercase font-bold text-center w-screen">
          Furniture Collection
        </h1>
        <Button title="Shop Now" />
      </div>
    </header>
  );
};

export default Header;
