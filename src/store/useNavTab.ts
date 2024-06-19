import { create } from "zustand";

type NavTabStore = {
  selected: number;
  setSelected: (index: number) => void;
};

export const useNavTab = create<NavTabStore>((set, get) => ({
  selected: 0,
  setSelected: (index) => set(() => ({ selected: index })),
}));
