import { Box, Button, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import * as Tone from "tone";
import { notes } from "../constant/notes";
import { PianoKey } from "./PianoKey";

const socket = io("http://localhost:81", {
  transports: ["websocket"],
});

export const Piano = () => {
  const [piano, setPiano] = useState<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const temp = new Tone.Synth().toDestination();
    Tone.start();
    setPiano(temp);
  }, []);
  return (
    // <PianoBox>
    //   <PianoKey piano={piano} note="C4" socket={socket} />
    //   <PianoKey piano={piano} note="D4" socket={socket} />
    //   <PianoKey piano={piano} note="E4" socket={socket} />
    //   <PianoKey piano={piano} note="F4" socket={socket} />
    //   <PianoKey piano={piano} note="G4" socket={socket} />
    //   <PianoKey piano={piano} note="A4" socket={socket} />
    //   <PianoKey piano={piano} note="B4" socket={socket} />
    // </PianoBox>
    <>
      <PianoBox>
        {notes.map((note) => (
          <PianoKey
            key={note}
            piano={piano}
            note={note}
            socket={socket}
            isPlaying={isPlaying}
          />
        ))}
      </PianoBox>
      <Button onClick={() => setIsPlaying(!isPlaying)}> toggle </Button>
    </>
  );
};

const PianoBox = styled(Box)`
  display: flex;
  justify-content: center;
`;
