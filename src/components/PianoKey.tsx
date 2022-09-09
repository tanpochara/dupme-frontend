import { Button } from "@mui/material";
import { styled } from "@mui/system";
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
    background: #333;
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
    background: #eee;
  }
`;
interface Props {
  note: string;
  color: string;
}

export const PianoKey: React.FC<Props> = ({ note, color }) => {
  const isWhite = color == "white";
  return <>{isWhite ? <WhiteKey /> : <BlackKey />}</>;
};
