import { Box, Button, styled, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { io } from "socket.io-client";
import * as Tone from "tone";
import { notes } from "../constant/notes";
import { SocketContext } from "../context/SocketContext";
import { PianoKey } from "./PianoKey";

interface Props {
  isPlaying: boolean;
  start: boolean;
  setIsPlaying: (status: boolean) => void;
  time: number;
  round: number;
  roomName: string;
}

export const Piano: React.FC<Props> = ({
  isPlaying,
  start: isStart,
  setIsPlaying,
  time: timer,
  round,
  roomName,
}) => {
  console.log(round);
  const [piano, setPiano] = useState<any>();
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer);
  const [recordSequence, setRecordSequence] = useState<string[]>([]);
  const { socket } = useContext(SocketContext);

  const handleRoundFinish = useCallback(() => {
    if (socket.connected) {
      const params = {
        round,
        roomName,
        sequence: recordSequence,
      };
      socket.emit("roundFinish", JSON.stringify(params));
    }
  }, [socket, round, roomName, recordSequence]);

  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      if (isPlaying) {
        handleRoundFinish();
      }
      setRecordSequence([]);
      setTimeout(() => {
        const newTime = new Date();
        newTime.setSeconds(newTime.getSeconds() + timer);
        console.log("new time", newTime.getSeconds(), "new timer", timer);
        restart(newTime, true);
        start();
      }, 1000);
    },
    autoStart: false,
  });

  // const handleNewTimer = useCallback(() => {
  //   const newTime = new Date();
  //   newTime.setSeconds(newTime.getSeconds() + timer);
  //   console.log("new time", newTime.getSeconds(), "new timer", timer);
  //   restart(newTime, true);
  //   start();
  // }, [restart, start, timer]);

  useEffect(() => {
    pause();

    if (isStart) {
      start();
    }
  }, [isStart]);

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
