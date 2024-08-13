import { create } from "zustand";

type useBlogTab = {
  selected: number;
  prevSelected: number;
  setSelected: (index: number) => void;
};

export const useBlogTab = create<useBlogTab>((set, get) => ({
  selected: 0,
  prevSelected: 0,
  setSelected: (index) =>
    set((state) => ({ prevSelected: state.selected, selected: index })),
}));
