import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  setModalOpen: React.Dispatch<React.SetStateAction<any>>;
}

export const Modal = ({ children, setModalOpen }: ModalProps) => {
  useEffect(() => {
    const root = document.body;
    root.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = root.style.top;
      root.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return createPortal(
    <BackgroundStyle onClick={handleModalClose}>
      <ModalContain onClick={e => e.stopPropagation()}>{children}</ModalContain>
    </BackgroundStyle>,
    document.getElementById("modal")!
  );
};
const BackgroundStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999;
`;

const ModalContain = styled.div`
  background-color: #fff;
  height: fit-content;
  padding: 3rem 2rem 2rem;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
