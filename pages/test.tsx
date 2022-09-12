import { Button } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../src/context/SocketContext";

const Test = () => {
  const { socket } = useContext(SocketContext);
  return (
    <>
      <Button
        onClick={() => {
          socket.emit("message");
        }}
      >
        {" "}
        test{" "}
      </Button>
    </>
  );
};

export default Test;
