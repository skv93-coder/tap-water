import React from "react";

export default function Button({ className, label, handleClick }) {
  return (
    <button className={className + " btn"} onClick={handleClick}>
      {label}
    </button>
  );
}
