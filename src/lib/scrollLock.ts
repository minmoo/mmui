const body = document.getElementsByTagName("body")[0];

let bodyScrollTop = null;
let locked = false;
let prevStyle = {
  position: body.style.position || "static",
  top: body.style.top || "auto",
  left: body.style.left || "auto",
  right: body.style.right || "auto",
  overflow: body.style.overflow
};

export const lockScroll = () => {
  if (!locked) {
    bodyScrollTop =
      typeof window.pageYOffset !== "undefined"
        ? window.pageYOffset
        : (document.documentElement || document.body).scrollTop;

    prevStyle = {
      position: body.style.position || "static",
      top: body.style.top || "auto",
      left: body.style.left || "auto",
      right: body.style.right || "auto",
      overflow: body.style.overflow
    };

    body.style.position = "fixed";
    body.style.top = `-${bodyScrollTop}px`;
    body.style.left = "0px";
    body.style.right = "0px";
    //desktop에서 scroll이 사라지면 width가 변하는 것을 막기위해
    body.style.overflow = "scroll";

    locked = true;
  }
};

export const unlockScroll = () => {
  if (locked) {
    body.style.position = prevStyle.position;
    body.style.top = prevStyle.top;
    body.style.left = prevStyle.left;
    body.style.right = prevStyle.right;
    body.style.overflow = prevStyle.overflow;

    window.scrollTo(0, bodyScrollTop);

    locked = false;
  }
};
