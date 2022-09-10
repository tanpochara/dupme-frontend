import { Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import * as Tone from "tone";
import { PianoKey } from "./PianoKey";

const socket = io("http://localhost:81", {
  transports: ["websocket"],
});

export const Piano = () => {
  const [piano, setPiano] = useState<any>();
  const [refs, setRefs] = useState<any>();
  const tones = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

  useEffect(() => {
    const temp = new Tone.Synth().toDestination();
    Tone.start();
    setPiano(temp);
  }, []);
  return (
    <PianoBox>
      <PianoKey piano={piano} note="C4" socket={socket} />
      <PianoKey piano={piano} note="D4" socket={socket} />
      <PianoKey piano={piano} note="E4" socket={socket} />
      <PianoKey piano={piano} note="F4" socket={socket} />
      <PianoKey piano={piano} note="G4" socket={socket} />
      <PianoKey piano={piano} note="A4" socket={socket} />
      <PianoKey piano={piano} note="B4" socket={socket} />
    </PianoBox>
  );
};

const PianoBox = styled(Box)`
  display: flex;
  justify-content: center;
`;
