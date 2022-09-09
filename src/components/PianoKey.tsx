import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NoteInterface } from "../@types/note";

const BlackKey = styled(Button)`
  width: 40px;
  height: 130px;
  background: black;
  border: solid black 1px;
  position: absolute;
  margin: 1px;
  margin-left: -20px;
  :active {
    background: red;
  }

  :focus {
    background: red;
  }

  :hover {
    background: black;
  }
`;

const WhiteKey = styled(Button)`
  width: 60px;
  height: 200px;
  background: white;
  border: solid black 1px;
  margin: 1px;
  margin-left: "-20px";
  box-sizing: border-box;
  :active {
    background: red;
  }

  :focus {
    background: red;
  }

  :hover {
    background: white;
  }
`;
interface Props {
  note: string;
  color: string;
}

export const PianoKey: React.FC<Props> = ({ note, color }) => {
  const isWhite = color == "white";
  // const audio = new Audio(`/sounds/piano_${note}.mp3`);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio(`/sounds/piano_${note}.mp3`));
  }, [note]);

  const handleClickKey = () => {
    audio?.play();
  };
  return (
    <>
      {isWhite ? (
        <WhiteKey onClick={handleClickKey} disableRipple />
      ) : (
        <BlackKey onClick={handleClickKey} disableRipple />
      )}
    </>
  );
};
