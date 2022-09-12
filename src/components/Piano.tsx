import { Box, Button, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { io } from "socket.io-client";
import * as Tone from "tone";
import { notes } from "../constant/notes";
import { PianoKey } from "./PianoKey";

export const Piano = () => {
  const [piano, setPiano] = useState<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      setIsPlaying(false);
    },
  });

  useEffect(() => {
    const temp = new Tone.Synth().toDestination();
    Tone.start();
    setPiano(temp);
  }, []);

  return (
    <>
      <Box padding="20px" textAlign="center">
        <Typography variant="h2" paddingBottom="20px">
          {" "}
          Player 1 : Points
        </Typography>
        <Box paddingLeft={"450px"} paddingBottom="20px">
          <Box>
            <span> {`${minutes} : ${seconds}`} </span>
          </Box>
        </Box>
        <PianoBox>
          {notes.map((note) => (
            <PianoKey
              key={note}
              piano={piano}
              note={note}
              isPlaying={isPlaying}
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
