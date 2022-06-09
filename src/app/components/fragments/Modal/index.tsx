import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { createContext, ReactNode, useState } from "react"

type ModalContextType = {
  isOpen: boolean;
  content: {
    header: ReactNode;
    body: ReactNode;
    footer: ReactNode;
  };
  open: (content: ModalContextType['content']) => void;
  close: () => void;
};

const defaultState = {
  isOpen: false,
  content: {
    header: undefined,
    body: undefined,
    footer: undefined,
  },
  open: () => undefined,
  close: () => undefined,
};

const ModalContext = createContext<ModalContextType>(defaultState);

interface IProps { children: ReactNode };

export default function ModalProvider({ children }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<ModalContextType['content']>(defaultState.content);

  const open = (content: ModalContextType['content']) => {
    onOpen();
    setContent(content);
  };

  const close = () => {
    onClose();
    setContent(defaultState.content);
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        content,
        open,
        close,
      }}>
      {children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{content.header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content.body}</ModalBody>
          <ModalFooter>{content.footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
