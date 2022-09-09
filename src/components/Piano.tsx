import { Box } from "@mui/material";
import { notes } from "../constant/notes";
import { PianoKey } from "./PianoKey";

export const Piano = () => {
  return (
    <Box>
      {notes.map((note) => {
        return (
          <>
            <PianoKey note={note.note} color={note.color} />
          </>
        );
      })}
    </Box>
  );
};
