import { Container, Box, Typography, Button, Grid, Modal } from "@mui/material";
import { time } from "console";
import { constants } from "fs/promises";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GameParams, Room, Rooms } from "../../src/@types/room";
import { Piano } from "../../src/components/Piano";
import { SocketContext } from "../../src/context/SocketContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 8,
  borderRadius: "15px",
};

const RoomGame = () => {
  const { socket } = useContext(SocketContext);
  const [roomData, setRoomData] = useState<Room>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameParams, setGameParams] = useState<GameParams>();
  const [start, setStart] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [found, setFound] = useState(true);
  const router = useRouter();
  const path = router.query;

  useEffect(() => {
    if (socket.connected) {
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
    }
  }, [path.id, socket]);

  const handleLeaveRoom = () => {
    socket.emit("playerLeaveRoom", roomData?.name);
    router.push("/rooms");
  };

  const handleReady = () => {
    socket.emit("playerReady", roomData?.name);
  };

  useEffect(() => {
    if (!roomData) return;

    if (socket.connected) {
      socket.on("gameStart", (params: GameParams) => {
        setGameParams(params);
        setIsPlaying(
          params.playerPlaying.id.toLowerCase() == socket.id.toLowerCase()
        );
        handleOpen();
        setStart(true);
      });

      socket.on("gameFinish", (msg) => {
        setFinish(true);
      });

      return () => {
        socket.off("gameStart");
      };
    }
  }, [roomData, socket, socket.id]);

  if (!found) return <h1> error path not found</h1>;

  if (finish) return <h1> finish leaw i sus </h1>;

  return (
    <Container style={{ height: "100vh" }}>
      {JSON.stringify(roomData)}
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
      <Box
        height={"100vh"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Piano
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              time={gameParams ? gameParams.time : 10}
              start={start}
              round={gameParams ? gameParams.round : 1}
              roomName={roomData ? roomData.name : ""}
            />
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3">
            Game is about to start
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: 2 }}
          >
            {isPlaying
              ? "you will be starting first"
              : "Your opponent will be starting first"}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default RoomGame;
