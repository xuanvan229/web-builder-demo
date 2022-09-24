import create from "zustand";
import { Schema } from "../types/schema";

interface IStore {
  elements: Schema[];
  selectedElementId: null | string;
  onSelectedElementId: (elementId: string) => void;
  onUpdateElement: any;
  onAddElement: (element: Schema) => void;
  removeElement: (elementId: string) => void;
}

const useStore = create<IStore>((set) => ({
  elements: [],
  selectedElementId: null,
  onSelectedElementId: (elementId: string) =>
    set({ selectedElementId: elementId }),
  onUpdateElement: (value: any, name: any, id: any, suffix?: any) =>
    set((state) => {
      const newElements = state.elements.map((element: Schema) => {
        if (element.id === id) {
          return {
            ...element,
            props: {
              ...(element.props || {}),
              [name]: {
                ...element.props[name],
                value: suffix ? `${value}${suffix}` : value,
              },
            },
          };
        }
        return element;
      });
      return { elements: newElements };
    }),
  onAddElement: (element: Schema) =>
    set((state) => ({ elements: [...state.elements, element] })),
  removeElement: (id: string) =>
    set((state) => {
      const newElements = state.elements.filter((v: Schema) => v.id !== id);
      return { elements: newElements };
    }),
}));

export default useStore;
