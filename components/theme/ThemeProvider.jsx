'use client';

import { selectDarkMode } from "@/redux/features/darkModeSlice";
import { useSelector } from "react-redux";

export function ThemeProvider({ children }) {
  const modeSelector = useSelector(selectDarkMode);

  return (
    <div className={`${modeSelector}`}>
      {children}
    </div>
  );
}

export default ThemeProvider;