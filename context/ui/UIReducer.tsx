import { UIState } from "./UIProvider";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Open Input Task" }
  | { type: "UI - Close Input Task" }
  | { type: "UI - Start Dragging" }
  | { type: "UI - End Dragging" }

export const uIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };
    case "UI - Close Sidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };
    case "UI - Open Input Task":
      return {
        ...state,
        inputTaskOpen: true,
      };
    case "UI - Close Input Task":
      return {
        ...state,
        inputTaskOpen: false,
      };
    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
