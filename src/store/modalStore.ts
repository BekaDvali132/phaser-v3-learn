import { create } from "zustand";

interface ModalStore {
  autoBetModal: boolean;
  historyModal: boolean;
  toggleModal: (modalName: "autoBetModal" | "historyModal") => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  autoBetModal: false,
  historyModal: false,
  toggleModal: (modalName) =>
    set((state) => ({ ...state, [modalName]: !state[modalName] })),
}));
