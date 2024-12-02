import {create} from "zustand/react";

export interface Room {
  id: number;
  title: string;
}

interface RoomStore {
  roomList: Room[] | null;
  setRoomList: (room: Room[]) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  roomList: null,
  setRoomList: (room: Room[]) => set({roomList: room}),
}));

export default useRoomStore;
