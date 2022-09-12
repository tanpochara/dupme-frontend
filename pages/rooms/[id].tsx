import { Container, Box, Typography, Button } from "@mui/material";
import { constants } from "fs/promises";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Room, Rooms } from "../../src/@types/room";
import { SocketContext } from "../../src/context/SocketContext";

const RoomGame = () => {
  const { socket } = useContext(SocketContext);
  const [roomData, setRoomData] = useState<Room>();
  const [found, setFound] = useState(true);
  const router = useRouter();
  const path = router.query;

  useEffect(() => {
    socket.emit("getRoom");

    socket.on("currentRoom", (msg: Rooms) => {
      if (msg[path.id as string]) {
        setRoomData(msg[path.id as string]);
      } else {
        setFound(false);
      }
    });

    return () => {
      socket.off("currentRoom");
    };
  });

  const handleLeaveRoom = () => {
    socket.emit("playerLeaveRoom", roomData?.name);
    router.push("/rooms");
  };

  const handleReady = () => {
    socket.emit("playerReady", roomData?.name);
  };

  if (!found) return <h1> error path not found</h1>;

  return (
    <Container>
      <Box textAlign={"right"}>
        <Button onClick={handleLeaveRoom}> leave</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {roomData?.players.map((player) => {
          return (
            <>
              <Box
                sx={{
                  backgroundColor: "#ECF1F4",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <Typography> {player.id}</Typography>
                <Typography>
                  {" "}
                  {`status : ${player.isReady ? "ready" : "not ready"}`}
                </Typography>
                {socket.id == player.id && (
                  <Box textAlign="right" paddingTop={"10px"}>
                    <Button onClick={handleReady}>ready</Button>
                  </Box>
                )}
              </Box>
            </>
          );
        })}
      </Box>
    </Container>
  );
};

export default RoomGame;
