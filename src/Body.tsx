import { useBottomSheet, useBottomSheetHide } from "./BottomSheet/hooks";
import { Content } from "./Content";
import { Content2 } from "./Content2";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
const Box = styled.div`
  display: flex;
  width: 100%;
  height: 3000px;
  background: pink;
`;

export const Body = () => {
  const [type, setType] = useState(0);
  const { show: show1, hide: hide1 } = useBottomSheet<
    { id: string },
    { id: string }
  >(Content, {
    cover: false
  });
  const { show: show2, hide: hide2 } = useBottomSheet(Content2, {
    cover: false,
    transitionDelay: 1000
  });

  const { hideLatest } = useBottomSheetHide();

  useEffect(() => {
    if (type == 1) {
      hide2();
      show1({ setType });
    } else if (type == 2) {
      hide1();
      show2({ setType });
    }
  }, [type]);

  return (
    <div>
      안녕하세요
      <button onClick={() => hideLatest()}>LATEST</button>
      <button
        onClick={async () => {
          const id = await show1({ setType });
        }}
      >
        Toggle
      </button>
      <button
        onClick={async () => {
          const id = await show2();
        }}
      >
        Toggle2
      </button>
      <Box />
      안녕하세요<button onClick={() => show()}>Toggle</button>
    </div>
  );
};
