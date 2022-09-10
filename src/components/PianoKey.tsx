import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Socket } from "socket.io-client";
import styled from "styled-components";

const Key = styled.button`
  display: flex;
  flex-direction: column;
  width: 75px;
  height: 400px;
  border: 1px solid black;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  color: black;
  justify-content: flex-end;
`;

interface Props {
  note: string;
  color?: "black" | "white";
  piano: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;
  socket: Socket;
}

export const PianoKey: React.FC<Props> = ({ note, piano, socket }) => {
  const [isWhite, setIsWhite] = useState(true);
  const handlePlayKey = () => {
    setIsWhite(false);
    const time = Tone.now();
    piano.triggerAttackRelease(note, "16n", time);
    setTimeout(() => {
      setIsWhite(true);
    }, 300);
  };

  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    socket.on("opponentKeyPressed", (msg) => {
      if (msg == note) {
        setIsWhite(false);
        if (elementRef.current) {
          elementRef.current.click();
        }
      }
    });

    return () => {
      socket.off("opponentKeyPressed");
    };
  }, [note, socket]);

  return (
    <>
      <Key
        onClick={handlePlayKey}
        ref={elementRef}
        style={{ backgroundColor: isWhite ? "white" : "red" }}
      >
        <Typography variant="h2"> {note}</Typography>
      </Key>
    </>
  );
};
