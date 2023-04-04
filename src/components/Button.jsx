import React from "react";

const Button = ({ children }) => {
  return (
    <button className="min-w-fit w-32 h-32 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-all ease-in-out uppercase px-5 py-2">
      {children}
    </button>
  );
};

export default Button;
