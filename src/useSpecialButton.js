import { useRef } from "react";

export const useSpecialButton = (fc, time) => {
  const ref = useRef();
  const onMouseDown = () => {
    if (!ref.current) {
      ref.current = setInterval(fc, time);
    }
  };
  const onMouseUp = () => {
    if (ref.current >= 0) {
      clearInterval(ref.current);
      ref.current = null;
    }
  };
  const onTouchStart = () => {
    if (!ref.current) {
      ref.current = setInterval(fc, time);
    }
  };
  const onTouchEnd = () => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
  };
  const onTouchCancel = () => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
  };
  return {
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  };
};

