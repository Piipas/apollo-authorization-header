import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Request } from "./types";

type Store = {
  savedRequests: Array<Request>;
  saveRequest: (requests: Array<Request>) => void;
  addRequest: (request: Request) => void;
  removeRequest: (id: string) => void;
  updateRequest: (id: string, request: Request) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      savedRequests: [],
      saveRequest: (newRequests) => set({ savedRequests: newRequests }),
      addRequest: (request) =>
        set((state) => ({
          savedRequests: [...state.savedRequests, request],
        })),
      removeRequest: (id) =>
        set((state) => ({
          savedRequests: state.savedRequests.filter((req) => req.id !== id),
        })),
      updateRequest: (id, updatedRequest) =>
        set((state) => ({
          savedRequests: state.savedRequests.map((req) => (req.id === id ? updatedRequest : req)),
        })),
    }),
    {
      name: "requests",
    },
  ),
);
