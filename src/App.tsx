import styled from "@emotion/styled";
import "./styles.css";

import { Body } from "./Body";

const Box = styled.div`
  display: flex;
  width: 500px;
  height: 1000px;
  background: black;
`;

export default function App() {
  return (
    <div className="App">
      <Body />
    </div>
  );
}
