import styled from "@emotion/styled";
import { useBottomSheetHide } from "./BottomSheet/hooks";

const Box = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  background: black;
`;
export const Content2 = () => {
  const { hideAll } = useBottomSheetHide();
  return (
    <div>
      Content 2<button onClick={() => hideAll()}>toggle</button>
      <Box />
    </div>
  );
};
