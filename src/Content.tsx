import styled from "@emotion/styled";
import { useBottomSheet } from "./BottomSheet/hooks";
import { Content2 } from "./Content2";
const Box = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  background: black;
`;
export const Content = ({ props }) => {
  const { setType } = props;
  const { show, hide, hideAll } = useBottomSheet(Content2);

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      Content 1<button onClick={() => setType(2)}>toggle</button>
      <button onClick={() => hideAll()}>close</button>
      <Box />
      <button onClick={() => show()}>toggle</button>
    </div>
  );
};
