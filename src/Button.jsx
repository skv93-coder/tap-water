import React from "react";
import { useSpecialButton } from "./useSpecialButton";


export default function Button({
  className,
  label,
  handleClick,
  handleSpecialClick,
}) {
  const listeners = useSpecialButton(handleSpecialClick, 1000);
  return (
    <button className={className + " btn"} onClick={handleClick} {...listeners}>
      {label}
    </button>
  );
}
