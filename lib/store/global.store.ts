import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStoreState = {
  isDark: boolean;
};

type ThemeStoreActions = {
  updateDarkMode: (state: boolean) => void;
};

type ThemeStore = ThemeStoreState & ThemeStoreActions;

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: true,
      updateDarkMode: (newState) => set((state) => ({ ...state, isDark: newState })),
    }),
    { name: "theme" }
  )
);
