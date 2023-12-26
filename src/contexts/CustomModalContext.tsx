import { useState, createContext } from "react";
export enum Action {
  UPDATE = "update",
  CREATE = "create",
}
type ModalDataProps = {
  open?: boolean;
  componenet?: any;
  headerTitle?: any;
  action?: Action;
  formData?: any;
};
type ModalContextProps = {
  modalData: ModalDataProps;
  closeModal: () => void;
  openModal: (modalPayload: ModalDataProps) => void;
};

export const CustomModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps
);
export const CustomModalProvider: any = ({ children }: any) => {
  const [modalData, setModalData] = useState<ModalDataProps>({
    open: false,
    componenet: null,
  });

  const openModal = (modalPayload: ModalDataProps) => {
    setModalData({ ...modalData, ...modalPayload });
  };
  const closeModal = () => {
    setModalData({
      ...modalData,
      open: false,
      componenet: null,
      headerTitle: "",
      action: undefined,
      formData: undefined,
    });
  };

  return (
    <CustomModalContext.Provider value={{ modalData, closeModal, openModal }}>
      {children}
    </CustomModalContext.Provider>
  );
};
