import { create } from "zustand";

interface value_type {
  value: string;
}

interface blog_type {
  component: value_type;
  set_component: (state: value_type) => void;

}

const useBlogStore = create<blog_type>((set) => ({
  component: {
    value: "nodata",
  },
  set_component: (state) => set({ component: state }),

  // images: [],
  // updateImages: (newImages) => set({ images: newImages }),
}));

export default useBlogStore;
