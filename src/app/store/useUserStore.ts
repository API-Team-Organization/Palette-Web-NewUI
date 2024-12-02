import {create} from "zustand/react";

interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({user}),
}))

export default useUserStore;
