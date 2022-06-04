import { DragEvent, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Entry } from "../../interfaces/interfaces";
import { UIContext } from "./../../context/ui/UIContext";
import { useRouter } from "next/router";
import { getFormat } from "../../utils/dateFn";

interface Props {
  entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {
  const router = useRouter();

  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };
  const onDragEnd = (e: DragEvent) => {
    endDragging();
  };

  const handleClickCard = () => {
    router.push(`entries/${entry._id}`);
  };

  return (
    <Card
      onClick={handleClickCard}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Typography variant='body2'>{getFormat(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
