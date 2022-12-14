import styled from "styled-components";
import {
  Grid,
  Modal,
  Typography,
  Button,
  Input,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../src/context/SocketContext";
import { useRouter } from "next/router";
import { Rooms } from "../../src/@types/room";
import { useStaker } from "../../src/hooks/useStaker";
import { join } from "path";
import { useAccount } from "wagmi";

const RoomBox = styled.div`
  border-radius: 20px;
  background-color: #ecf1f4;
  padding: 15px;
  height: 200px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :hover {
    box-shadow: 0px 0px 8px rgba(255, 138, 0, 0.4);
    border: 1px solid #ff5a00;
  }
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

const RoomsPage: NextPage = () => {
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const [rooms, setRooms] = useState<Rooms>();
  const [open, setOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [inputRoomName, setInputRoomName] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [selectedMode, setSelectedMode] = useState<"normal" | "hard">("normal");
  const { address } = useAccount();
  const { createRoom, joinRoom } = useStaker();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!address) return;

    socket.emit("connectWallet", address);
  }, [address, socket]);

  useEffect(() => {
    socket.emit("getRoom");

    socket.on("currentRoom", (msg) => {
      setRooms(msg);
    });

    return () => {
      socket.off("currentRoom");
    };
  }, [socket]);

  const handleJoinRoom = (name: string) => {
    if (!rooms) return;
    const amount = Number(rooms[name].bet);
    joinRoom(amount, name).then((data) => {
      socket.emit("joinRoom", name);
      router.push(`/rooms/${name}`);
      handleClose();
    });
  };

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRoomName(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(Number(e.target.value));
  };

  const handleGameModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(e.target.value == "hard" ? "hard" : "normal");
  };

  const handleCreateNewRoom = () => {
    const object = {
      name: inputRoomName,
      amount: `${inputAmount}`,
      mode: selectedMode,
    };
    createRoom(inputAmount, inputRoomName).then((data) => {
      socket.emit("createRoom", JSON.stringify(object));
      router.push(`/rooms/${inputRoomName}`);
      setIsCreating(false);
      alert("finish");
    });
  };

  return (
    <Container>
      <Typography variant="h1" color="text.secondary">
        {" "}
        Current Rooms{" "}
      </Typography>
      <Grid container spacing={2}>
        {rooms &&
          Object.keys(rooms).map((key, index) => {
            let room = rooms[key];
            return (
              <Grid item xs={4} key={index}>
                <RoomBox
                  onClick={() => {
                    setSelectedRoom(room);
                    handleOpen();
                  }}
                >
                  <Typography color="text.secondary"> {room.name} </Typography>
                  <Typography color="text.secondary"> {room.bet} </Typography>
                  <Typography color="text.secondary"> {room.mode} </Typography>
                  <Typography color="text.secondary">
                    {" "}
                    {`people: ${room.players.length}`}{" "}
                  </Typography>
                </RoomBox>
              </Grid>
            );
          })}
        <Grid item xs={3} color="text.secondary">
          {" "}
          <RoomBox onClick={() => setIsCreating(true)}>
            {" "}
            + create new room
          </RoomBox>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign="left">
          <Typography id="modal-modal-title" variant="h4">
            Join room {selectedRoom?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure to join this room with staking of {selectedRoom?.bet}
          </Typography>
          <Box textAlign={"right"}>
            <Button
              disabled={selectedRoom?.isFull}
              onClick={() => {
                handleJoinRoom(selectedRoom?.name);
              }}
            >
              yes
            </Button>
            <Button onClick={() => setOpen(false)}>No</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isCreating}
        onClose={() => {
          setIsCreating(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4"> Creating new rooms </Typography>
          <Typography variant="body1" pt={2}>
            {" "}
            Room name
          </Typography>
          <Input placeholder="room name" onChange={handleRoomNameChange} />
          <Typography variant="body1" pt={2}>
            {" "}
            Betting amount{" "}
          </Typography>
          <Input
            placeholder="betting amount"
            type="number"
            onChange={handleAmountChange}
          />
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedMode}
            onChange={handleGameModeChange}
            style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
          >
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel value="hard" control={<Radio />} label="Hard" />
          </RadioGroup>
          <Box textAlign={"right"} pt={2}>
            <Button onClick={handleCreateNewRoom}>create</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default RoomsPage;
