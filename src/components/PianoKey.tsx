import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { NoteInterface } from "../@types/note";
import * as Tone from "tone";
import { Socket } from "socket.io-client";

// const Key = styled(Button)`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   width: 75;
//   height: 400px;
//   border: 1px solid black;
//   padding: 10px;
//   background: white;

//   :focus {
//     backgroud: red;
//   }

//   :active {
//     background: red;
//   }
// `;

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
  color?: "black" | "white";
  piano: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;
  socket: Socket;
}

export const PianoKey: React.FC<Props> = ({ note, color, piano, socket }) => {
  const [isWhite, setIsWhite] = useState(true);
  const handlePlayKey = () => {
    // setIsWhite(false);
    const time = Tone.now();
    piano.triggerAttackRelease(note, "16n", time);
    setTimeout(() => {
      setIsWhite(true);
    }, 500);
  };

  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    socket.on("opponentKeyPressed", (msg) => {
      if (msg == note) {
        console.log(note, msg);
        setIsWhite(false);
        elementRef.current?.click();
      }
    });

    return () => {
      socket.off("opponentKeyPressed");
    };
  }, [note, socket]);

  return (
    <>
      <WhiteKey
        onClick={handlePlayKey}
        disableRipple
        ref={elementRef}
        sx={{ backgroundColor: isWhite ? "white" : "red" }}
        // sx={{ backgroundColor: "red" }}
      >
        {" "}
        <Typography variant="h2"> {note}</Typography>
      </WhiteKey>
    </>
  );
};
