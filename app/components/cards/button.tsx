"use client";
import { MouseEventHandler } from "react";

interface ButtonProp {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color: string;
}

const Button = ({ title, onClick, color }: ButtonProp) => {
  return (
    <div>
      <button
        onClick={onClick}
        style={{ backgroundColor: color, borderColor: color }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = color;
          e.currentTarget.style.color = "black";
        }}
        className="h-13 w-50 border text-black focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 hover:bg-transparent hover:cursor-pointer"
      >
        <p className="text-md uppercase">{title}</p>
      </button>
    </div>
  );
};

export default Button;
