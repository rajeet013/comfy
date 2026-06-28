import { MouseEventHandler } from "react";

interface buttonProp {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, onClick }: buttonProp) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="h-13 w-50 border border-[#F09D51] bg-[#F09D51] text-black hover:border-[#F09D51] hover:text-[#F09D51] focus:outline-none focus:ring-2 focus:ring-[#F09D51] focus:ring-opacity-50 transition-all duration-300 hover:bg-transparent hover:cursor-pointer"
      >
        <p className="text-md uppercase">{title}</p>
      </button>
    </div>
  );
};

export default Button;
