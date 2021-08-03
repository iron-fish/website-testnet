import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  colorClassName?: string;
}

function Button({ children, className = "", colorClassName = "bg-black text-white hover:bg-transparent hover:text-black" }: Props) {
  return (
    <button className={`
        flex 
        justify-center
        items-center
        font-extended
        rounded-full
        whitespace-nowrap
        p-4
        h-10
        transition
        border-black
        border-2
        ${colorClassName}
        ${className}
    `}>
        {children}
    </button>
  );
}

export default Button;
