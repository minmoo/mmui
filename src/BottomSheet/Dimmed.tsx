import styled from "@emotion/styled";
import { useEffect } from "react";
import { lockScroll, unlockScroll } from "../lib/scrollLock";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #484848;
  z-index: 1;
  opacity: 0.3;
`;

interface DimmedProps {
  onClose: (value: unknown) => void;
}

export const Dimmed = ({ onClose }: DimmedProps) => {
  const handleClick = () => {
    onClose("dimmed");
  };

  useEffect(() => {
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, []);

  return <Container onClick={handleClick} />;
};
