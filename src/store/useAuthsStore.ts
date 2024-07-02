import { create } from "zustand";

interface UseAuthStoreProps {
  auth: boolean | undefined;
  setAuth: (isAdmin: boolean) => void;
}

const useAuthStore = create<UseAuthStoreProps>((set) => ({
  auth: undefined,

  setAuth: (isAdmin: boolean) => {
    set(() => ({
      auth: isAdmin,
    }));
  },
}));

export default useAuthStore;
