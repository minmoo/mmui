import { ReactNode, useEffect, useState } from "react";

import { Body } from "./Body";
import { Options } from "./config";
import { Dimmed } from "./Dimmed";

interface LayoutProps {
  children: ReactNode;
  open: boolean;
  onClose: (value: unknown) => void;
  options: Options;
}

export const Layout = ({ children, open, onClose, options }: LayoutProps) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (open) {
      setMount(true);
    }
  }, [open]);

  if (!mount) {
    return null;
  }

  return (
    <>
      {options.cover && <Dimmed onClose={onClose} />}
      <Body open={open} setMount={setMount} delay={options.transitionDelay}>
        {children}
      </Body>
    </>
  );
};
