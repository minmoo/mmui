import styled from "@emotion/styled";
import { useRef } from "react";
import { useDrag } from "../lib/useDrag";
import { useDrag2 } from "../lib/useDrag2";

const Wrapper = styled.div`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

export const BottomSheetHeader = ({ wrapperRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  useDrag2(wrapperRef);

  return (
    <Wrapper ref={ref}>
      <Handle />
    </Wrapper>
  );
};
