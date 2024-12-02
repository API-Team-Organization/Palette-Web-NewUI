import {create} from "zustand";

interface Birth {
  year: number;
  month: number;
  day: number;
}

interface RegisterStore {
  email: string;
  password: string;
  username: string;
  birth: Birth;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
}

const useRegisterStore = create<RegisterStore>((set) => ({
  email: '',
  password: '',
  username: '',
  birth: { year: 0, month: 0, day: 0 },
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setUsername: (username: string) => set({ username }),
  setYear: (year: number) => set((state) => ({ birth: { ...state.birth, year } })),
  setMonth: (month: number) => set((state) => ({ birth: { ...state.birth, month } })),
  setDay: (day: number) => set((state) => ({ birth: { ...state.birth, day } })),
}));

export default useRegisterStore;
