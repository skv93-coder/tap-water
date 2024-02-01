import React from "react";

export default function Bucket({ val }) {
  return (
    <>
    <div >{val.toFixed(2)}</div>
    <div className="bucket">
      <div
        style={{ height: `${val / 10}%`, width: "100%" }}
        className="bucket_animation"
      >
      
      </div>
      
    </div>
    </>
  );
}
