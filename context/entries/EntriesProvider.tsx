import { FC, ReactChild, useEffect, useReducer } from "react";
import { EntriesContext, EntriesReducer } from "./";
import { Entry } from "../../interfaces/interfaces";
import entriesApi from "../../service/entriesApi";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: ReactChild;
}

const Entries_inicitialState: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useReducer(EntriesReducer, Entries_inicitialState);

  useEffect(() => {
    const getEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>("/entries");

      dispatch({
        type: "[Entry] - getEntries",
        payload: data,
      });
    };

    getEntries();
  }, []);

  const addEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });

      dispatch({
        type: "[Entry] - addEntry",
        payload: data,
      });
    } catch (error) {}
  };

  const updateEntry = async (entry: Entry) => {
    const { _id, description, status } = entry;
    try {
      const { data } = await entriesApi.put(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({
        type: "[Entry] - updateEntry",
        payload: data,
      });

      enqueueSnackbar("Entry updated", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };


  const deleteEntry = async(id: string)=>{
    try {
     await entriesApi.delete(`/entries/${id}`);


      
      dispatch({
        type: "[Entry] - deleteEntries",
        payload: id,
      });

      enqueueSnackbar("Entry deleted", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log("error", error);
    }



  }




  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
