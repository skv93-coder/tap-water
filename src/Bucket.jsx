import React from "react";

export default function Bucket({ val, buffer }) {
  return (
    <>
      <div title={buffer.toFixed(2)}>{val.toFixed(2)}</div>
      <div className="bucket">
        <div
          style={{
            height: `${val / 10}%`,
            width: "100%",
            backgroundColor: "green",
          }}
          className={val.toFixed(2) === "0.00" ? "" : "bucket_animation"}
        ></div>
      </div>
    </>
  );
}
