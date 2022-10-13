import {
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { SocketContext } from "../src/context/SocketContext";

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const { socket } = useContext(SocketContext);

  const handleSetUsername = () => {
    socket.emit("registerName", username);
    setTimeout(() => {
      router.push("/rooms");
    }, 400);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <Box
        height={"100vh"}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: "background.default" }}
      >
        <TextField
          label="Username"
          placeholder="username"
          onChange={handleUsernameChange}
        />
        <Button
          style={{ marginLeft: "150px", marginTop: "5px" }}
          onClick={handleSetUsername}
        >
          {" "}
          submit{" "}
        </Button>
      </Box>
    </>
  );
};

export default Home;
