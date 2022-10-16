import { Box, Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Room } from "../@types/room";
import { SocketContext } from "../context/SocketContext";

interface Props {
  roomData: Room | undefined;
}

const style = {
  border: "1px solid black",
  bgColor: "red",
  borderRadius: "20px",
};
export const WinnerView: React.FC<Props> = ({ roomData }) => {
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const [winner, setWinner] = useState<string>("");
  const [counter, setCounter] = useState<boolean>(false);

  useEffect(() => {
    if (!roomData || counter) return;

    const winner =
      roomData.players[0].points > roomData.players[1].points
        ? roomData.players[0].name
        : roomData.players[1].name;
    setWinner(winner);
    setCounter(true);
  }, [counter, roomData]);

  const handleLeaveRoom = () => {
    socket.emit("playerLeaveRoom", roomData?.name);
    router.push("/rooms");
  };

  return (
    <Container>
      <Box
        textAlign="right"
        onClick={handleLeaveRoom}
        style={{ cursor: "pointer" }}
      >
        {" "}
        leave{" "}
      </Box>
      <Typography textAlign="center" variant="h1">
        {" "}
        the winner is : {winner}
      </Typography>
      <Stack
        height="100vh"
        justifyContent="space-evenly"
        direction="row"
        alignItems="center"
        width="100%"
      >
        {roomData?.players.map((player, i) => {
          return (
            <Box
              width="full"
              padding="60px"
              key={player.name}
              sx={style}
              bgcolor={winner == player.id ? "cyan" : "white"}
            >
              <Typography variant="h2"> {player.name}</Typography>
              <Typography variant="h3"> {player.points} </Typography>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
};
