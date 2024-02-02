import React from "react";

export default function Bucket({ val, buffer }) {
  return (
    <>
      <div title={buffer.toFixed(2)}>{val.toFixed(2)}</div>
      <div className="bucket">
        <div
          style={{ height: `${val / 10}%`, width: "100%" }}
          className="bucket_animation"
        ></div>
      </div>
    </>
  );
}
