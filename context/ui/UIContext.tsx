import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  inputTaskOpen: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  openTaskInput: () => void;
  closeTaskInput: () => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
