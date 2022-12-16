import { useEffect, useRef } from "react";

interface DragInfo {
  isDown: boolean;
  prevY: number;
}

export const useDrag = (ref, targetRef) => {
  const dragInfo = useRef<DragInfo>({ isDown: false, prevY: 0 });

  const handleTouchStart = (e: TouchEvent) => {
    dragInfo.current = {
      isDown: true,
      prevY: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    const { isDown, prevY } = dragInfo.current;
    if (!isDown) return;
    e.preventDefault();

    const heightOffset = prevY - e.touches[0].clientY;

    targetRef.current.style.height = `
      ${
        parseInt(window.getComputedStyle(targetRef.current).height, 10) +
        heightOffset
      }px`;

    dragInfo.current.prevY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    dragInfo.current = {
      isDown: false,
      prevY: 0
    };
  };

  useEffect(() => {
    ref.current.addEventListener("touchstart", handleTouchStart);
    ref.current.addEventListener("touchend", handleTouchEnd);
    ref.current.addEventListener("touchmove", handleTouchMove);
  }, []);
};
