import { Box, Button, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { io } from "socket.io-client";
import * as Tone from "tone";
import { notes } from "../constant/notes";
import { PianoKey } from "./PianoKey";

interface Props {
  isPlaying: boolean;
  start: boolean;
  setIsPlaying: (status: boolean) => void;
  time: number;
  round: number;
}

export const Piano: React.FC<Props> = ({
  isPlaying,
  start: isStart,
  setIsPlaying,
  time: timer,
  round,
}) => {
  const [piano, setPiano] = useState<any>();
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer);
  const [recordSequence, setRecordSequence] = useState<string[]>([]);
  const { seconds, minutes, start, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      console.log(recordSequence);
      setIsPlaying(false);
    },
    autoStart: false,
  });

  useEffect(() => {
    pause();

    if (isStart) {
      start();
    }
  }, [isStart, pause, start]);

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
