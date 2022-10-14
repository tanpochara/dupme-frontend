import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { io } from "socket.io-client";
import * as Tone from "tone";
import { notes } from "../constant/notes";
import { SocketContext } from "../context/SocketContext";
import { PianoKey } from "./PianoKey";
import { GoUnmute, GoMute } from "react-icons/go";

interface Props {
  minutes: number;
  seconds: number;
  recordSequence: string[];
  isPlaying: boolean;
  setRecordSequence: any;
}

export const Piano: React.FC<Props> = ({
  minutes,
  seconds,
  recordSequence,
  setRecordSequence,
  isPlaying,
}) => {
  const [piano, setPiano] = useState<any>();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const temp = new Tone.Synth().toDestination();
    Tone.start();
    setPiano(temp);
  }, []);

  return (
    <>
      <Box>
        <IconButton onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <GoUnmute color="red" /> : <GoMute color="red" />}
        </IconButton>
        <PianoBox>
          {notes.map((note) => (
            <PianoKey
              isMuted={isMuted}
              key={note}
              piano={piano}
              note={note}
              isPlaying={isPlaying}
              setRecordSequence={setRecordSequence}
              recordSequence={recordSequence}
            />
          ))}
        </PianoBox>
      </Box>
    </>
  );
};

const PianoBox = styled(Box)`
  display: flex;
  justify-content: center;
`;
