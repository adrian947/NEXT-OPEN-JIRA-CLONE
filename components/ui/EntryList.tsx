import React, { DragEvent, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "../../interfaces/interfaces";
import { EntriesContext } from "./../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";
import style from "./entryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  const allowDrop = (e: DragEvent) => {
    e.preventDefault();
  };
  
  const onDropEntry = (e: DragEvent) => {
    const id = e.dataTransfer.getData("text");
    
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
        
    updateEntry(entry);
    endDragging()
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}>
      <Paper
        sx={{
          padding: "10px",
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        className={isDragging ? style.dragging : ""}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
