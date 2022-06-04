import { FC, ReactChild, useReducer } from "react";
import { UIContext, uIReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  inputTaskOpen: boolean;
  isDragging: boolean;
}

interface Props {
  children: ReactChild;
}

const UI_inicitialState: UIState = {
  sideMenuOpen: false,
  inputTaskOpen: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uIReducer, UI_inicitialState);

  const openSideMenu = () => {
    dispatch({
      type: "UI - Open Sidebar",
    });
  };
  const closeSideMenu = () => {
    dispatch({
      type: "UI - Close Sidebar",
    });
  };
  const openTaskInput = () => {
    dispatch({
      type: "UI - Open Input Task",
    });
  };
  const closeTaskInput = () => {
    dispatch({
      type: "UI - Close Input Task",
    });
  };

  const startDragging = ()=>{
    dispatch({
      type: "UI - Start Dragging",
    });
  }
  const endDragging = ()=>{
    dispatch({
      type: "UI - End Dragging",
    });
  }


  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        openTaskInput,
        closeTaskInput,
        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
