import React, { ChangeEvent, useState, useMemo, FC, useContext } from "react";
import { Layout } from "../../components/layout/Layout";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Entry, EntryStatus } from "../../interfaces/interfaces";
import { GetServerSideProps } from "next";
import { entryById } from "../../database/entryById";
import { EntriesContext } from "../../context/entries";
import { useRouter } from "next/router";
import { getFormat } from "./../../utils/dateFn";

const validStatus: EntryStatus[] = ["pending", "inProgress", "complete"];

interface propsServer {
  entry: Entry;
}
const EntryPage: FC<propsServer> = ({ entry }) => {
  const router = useRouter();

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const onStatusChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    updateEntry({
      _id: entry._id,
      description: inputValue,
      createdAt: entry.createdAt,
      status,
    });
    router.push("/");
  };


  const handleDelete = () => {
    deleteEntry(entry._id);

    router.push("/");
    
  };

  return (
    <Layout title='Update Entry'>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${inputValue}`}
              subheader={`Created ago: ${getFormat(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New entry'
                autoFocus
                multiline
                label='Update Entry'
                onChange={onInputChange}
                value={inputValue}
                helperText={isNotValid && "Field is not empty"}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>State: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
              <Button
                startIcon={<DeleteOutlineOutlinedIcon />}
                variant='contained'
                color='error'
                fullWidth
                onClick={handleDelete}
              >
                delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await entryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
