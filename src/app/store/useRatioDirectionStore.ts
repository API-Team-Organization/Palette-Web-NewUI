import {create} from "zustand/react";
import {RatioType} from "@/app/components/Ratio";

interface RatioDirectionStore {
  ratio: RatioType;
  direction: 'Horizontal' | 'Vertical' | null;
  setRatio: (ratio: RatioType) => void;
  setDirection: (direction: 'Horizontal' | 'Vertical') => void;
}

const useRatioDirectionStore = create<RatioDirectionStore>((set) => ({
  ratio: RatioType.DISPLAY,
  direction: null,
  setRatio: (ratio) => set({ ratio }),
  setDirection: (direction) => set({ direction }),
}));

export default useRatioDirectionStore;
