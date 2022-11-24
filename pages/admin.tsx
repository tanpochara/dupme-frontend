import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Players } from "../src/@types/room";
import { SocketContext } from "../src/context/SocketContext";

const Admin: NextPage = () => {
  const { socket } = useContext(SocketContext);
  const [players, setPlayers] = useState<Players>({});
  const [keys, setKeys] = useState<string[]>([]);

  const handleResetServer = () => {
    socket.emit("reset");
  };

  useEffect(() => {
    socket.emit("getCurrentPlayer");

    if (socket.connected) {
      socket.on("currentPlayer", (msg: Players) => {
        setPlayers(msg);
        setKeys(Object.keys(msg));
      });

      return () => {
        socket.off("currentPlayer");
      };
    }
  }, [socket]);

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        {keys.map((key) => {
          if (players[key].name.length == 0) {
            return <></>;
          }
          return (
            <Box
              border="1px solid black"
              borderRadius="16px"
              padding="60px"
              margin="30px"
              textAlign="left"
              key={key}
            >
              <Stack
                direction={"row"}
                alignItems="center"
                spacing={3}
                justifyContent="center"
              >
                <Avatar
                  src={`https://avatars.dicebear.com/api/bottts/${players[key].name}.svg`}
                  sx={{ width: 56, height: 56 }}
                  alt={players[key].name}
                />
                <Box>
                  <Typography variant="h2"> {players[key].name}</Typography>
                  <Typography variant="h3">
                    {" "}
                    {players[key].currentRoom
                      ? players[key].currentRoom
                      : "not in any room"}{" "}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          );
        })}
        <Button onClick={handleResetServer}> reset server</Button>
      </Container>
    </>
  );
};

export default Admin;
