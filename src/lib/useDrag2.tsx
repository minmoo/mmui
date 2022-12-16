import { RefObject, useEffect, useRef } from "react";

const getClientY = (e) => {
  return e.touches ? e.touches[0].clientY : e.clientY;
};

const MIN_Y = 300;
const MAX_Y = window.innerHeight - 80;

interface UseDragParams {
  targetRef: RefObject<HTMLElement>;
}

export const useDrag2 = (targetRef: RefObject<HTMLElement>) => {
  const isDown = useRef(false);
  const startY = useRef(0);
  const startSheetY = useRef(0);
  const direction = useRef(null);
  const prevY = useRef(null);

  const getTranslateY = () => {
    return parseInt(
      getComputedStyle(targetRef.current).transform.split(/[^\-0-9]+/g)[4],
      10
    );
  };

  const setTranslateY = (y) => {
    targetRef.current.style.transform = `translateY(${y}px)`;
  };

  const onDragStart = (e) => {
    isDown.current = true;
    startY.current = getClientY(e);
    startSheetY.current = targetRef.current.getBoundingClientRect().y;
  };

  const onDragMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const y = getClientY(e);
    const translateY = getTranslateY();

    //초기화
    if (prevY.current === null) {
      prevY.current = startSheetY.current;
    }

    const currentY = getClientY(e);

    //방향설정
    if (prevY.current < currentY) {
      direction.current = "down";
    }

    if (prevY.current > currentY) {
      direction.current = "up";
    }
    prevY.current = currentY;

    const offset = currentY - startY.current;
    let nextSheetY = startSheetY.current + offset;

    if (nextSheetY <= MIN_Y) {
      nextSheetY = MIN_Y;
    }
    if (nextSheetY >= MAX_Y) {
      nextSheetY = MAX_Y;
    }

    setTranslateY(-nextSheetY);
  };

  const onDragEnd = (e) => {
    const currentSheetY = targetRef.current.getBoundingClientRect().y;

    if (currentSheetY !== MAX_Y) {
      if (direction.current === "down") {
        setTranslateY(-MIN_Y);
      }

      if (direction.current === "up") {
        setTranslateY(-MAX_Y);
      }
    }

    isDown.current = false;
  };

  const init = () => {
    if (targetRef.current) {
      const target = targetRef.current;
      //DESKTOP
      target.addEventListener("mousedown", onDragStart);
      target.addEventListener("mousemove", onDragMove);
      target.addEventListener("mouseup", onDragEnd);
      target.addEventListener("mouseleave", onDragEnd);
    }
  };

  useEffect(() => {
    init();
  }, []);
};
