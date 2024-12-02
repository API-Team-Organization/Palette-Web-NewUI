import {create} from "zustand/react";

interface StepStore {
  step: number;
  setStep: (step: number) => void;
}

const useStepStore  = create<StepStore>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step }),
}));

export default useStepStore;
