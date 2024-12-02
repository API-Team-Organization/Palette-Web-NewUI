import {create} from "zustand/react";
import {RatioType} from "@/app/components/Ratio";

interface RatioDirectionStore {
  ratio: RatioType;
  direction: 'Horizontal' | 'Vertical';
  setRatio: (ratio: RatioType) => void;
  setDirection: (direction: 'Horizontal' | 'Vertical') => void;
}

const useRatioDirectionStore = create<RatioDirectionStore>((set) => ({
  ratio: RatioType.DISPLAY,
  direction: 'Horizontal',
  setRatio: (ratio) => set({ ratio }),
  setDirection: (direction) => set({ direction }),
}));

export default useRatioDirectionStore;
