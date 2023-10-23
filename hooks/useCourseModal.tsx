import { create } from "zustand";

interface CourseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCourseModal = create<CourseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCourseModal;
