"use client";
import { MouseEventHandler } from "react";

interface ButtonProp {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color: string;
}

const Button = ({ title, onClick, color }: ButtonProp) => {
  const isTransparent = color === "transparent";

  return (
    <div>
      <button
        onClick={onClick}
        style={{
          backgroundColor: color,
          borderColor: isTransparent ? "#222222" : color,
          color: isTransparent ? "#222222" : "black",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isTransparent
            ? "#222222"
            : "transparent";
          e.currentTarget.style.color = isTransparent ? "white" : color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = color;
          e.currentTarget.style.color = isTransparent ? "#222222" : "black";
        }}
        className="w-full h-13 border uppercase tracking-widest text-sm font-semibold transition-all duration-300 hover:cursor-pointer"
      >
        <p className="text-md uppercase">{title}</p>
      </button>
    </div>
  );
};

export default Button;
