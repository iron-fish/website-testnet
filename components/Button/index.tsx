import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
}

function Button({ children, className = "" }: Props) { 
  return (
    <button className={`
        flex 
        justify-center
        items-center
        font-extended
        bg-black
        text-white
        rounded-full
        whitespace-nowrap
        p-4
        h-10
        transition
        hover:bg-transparent
        hover:text-black
        border-black
        border-2
        ${className}
    `}>
        {children}
    </button>
  );
}

export default Button;
