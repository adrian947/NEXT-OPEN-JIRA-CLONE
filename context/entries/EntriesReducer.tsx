import { EntriesState } from "./EntriesProvider";
import { Entry } from "../../interfaces/interfaces";

type EntriesActionType =
  | { type: "[Entry] - addEntry"; payload: Entry }
  | { type: "[Entry] - updateEntry"; payload: Entry }
  | { type: "[Entry] - getEntries"; payload: Entry[] }
  | { type: "[Entry] - deleteEntries"; payload: string };

export const EntriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] - addEntry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry] - updateEntry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "[Entry] - getEntries":
      return {
        ...state,
        entries: action.payload,
      };

    case "[Entry] - deleteEntries":
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };

    default:
      return state;
  }
};
