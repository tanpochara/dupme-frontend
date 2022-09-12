import { Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Tone from "tone";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { SocketContext } from "../context/SocketContext";

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
  align-items: center;
`;

interface Props {
  note: string;
  color?: "black" | "white";
  piano: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;
  isPlaying: boolean;
}

export const PianoKey: React.FC<Props> = ({ note, piano, isPlaying }) => {
  const [isWhite, setIsWhite] = useState(true);
  const { socket } = useContext(SocketContext);

  const handlePlayKey = useCallback(() => {
    setIsWhite(false);
    const time = Tone.now();
    if (isPlaying) {
      socket.emit("keyPressed", note);
    }
    piano.triggerAttackRelease(note, "16n", time);
    setTimeout(() => {
      setIsWhite(true);
    }, 300);
  }, [isPlaying, note, piano, socket]);

  useEffect(() => {
    if (isPlaying) return;

    socket.on("opponentKeyPressed", (msg) => {
      if (msg == note) {
        setIsWhite(false);
        handlePlayKey();
      }
    });

    return () => {
      socket.off("opponentKeyPressed");
    };
  }, [handlePlayKey, isPlaying, note, socket]);

  return (
    <>
      <Key
        onClick={handlePlayKey}
        disabled={!isPlaying}
        style={{ backgroundColor: isWhite ? "white" : "red" }}
      >
        <Typography variant="h2"> {note}</Typography>
      </Key>
    </>
  );
};
