import { ChangeEvent, useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import { EntriesContext } from "./../../context/entries/EntriesContext";
import { UIContext } from "./../../context/ui/UIContext";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { addEntry } = useContext(EntriesContext);
  const { openTaskInput, closeTaskInput, inputTaskOpen } =
    useContext(UIContext);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (!inputValue) return;
    addEntry(inputValue);
    setInputValue("");
    setTouched(false);
  };

  return (
    <Box sx={{ padding: "10px" }}>
      {inputTaskOpen ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='New Entry'
            autoFocus
            multiline
            label='New Entry'
            value={inputValue}
            onChange={handleInputChange}
            error={!inputValue.length && touched}
            onBlur={() => setTouched(true)}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              sx={{ marginRight: "10px" }}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              variant='outlined'
              color='error'
              endIcon={<CancelOutlinedIcon />}
              onClick={() => {
                closeTaskInput(), setInputValue(""), setTouched(false);
              }}
            >
              cancel
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          variant='outlined'
          fullWidth
          sx={{ marginTop: "10px" }}
          onClick={() => openTaskInput()}
        >
          Add task
        </Button>
      )}
    </Box>
  );
};
