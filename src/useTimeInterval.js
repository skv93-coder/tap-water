import { useEffect } from "react";

export const useTimeInertVal = (fc, time) => {
  useEffect(() => {
    const id = setInterval(fc, time);
    return () => {
      clearInterval(id);
    };
  }, [fc, time]);
};
