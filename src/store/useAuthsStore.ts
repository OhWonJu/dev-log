import { create } from "zustand";

interface UseAuthStoreProps {
  auth: boolean;
  setAuth: (isAdmin: boolean) => void;
}

const useAuthStore = create<UseAuthStoreProps>((set) => ({
  auth: false,

  setAuth: (isAdmin: boolean) => {
    set(() => ({
      auth: isAdmin,
    }));
  },
}));

export default useAuthStore;
