import React, { useRef, useEffect } from "react";
import "./style.scss";

interface SpinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

export function SpinButton({ isLoading, ...props }: SpinButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current && isLoading) {
      buttonRef.current.textContent = "Please wait...";
      buttonRef.current.style.background = "rgba(46, 46, 255, .6)";
      buttonRef.current.style.fontSize = ".8em";
      buttonRef.current.classList.add("load");
    } else if (buttonRef.current && !isLoading) {
      buttonRef.current.textContent = "Connexion";
      buttonRef.current.style.background = "";
      buttonRef.current.style.fontSize = "";
      buttonRef.current.classList.remove("load");
    }
  }, [isLoading]);

  return (
    <button
      type="submit"
      className={`spin-button ${isLoading ? "load" : ""}`}
      {...props}
      ref={buttonRef}
    >
      {isLoading ? "Please wait..." : "Connexion"}
    </button>
  );
}