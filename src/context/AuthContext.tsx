import { Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { Players } from "../../src/@types/room";
import { SocketContext } from "./SocketContext";

export const AuthContext = createContext(false);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { socket } = useContext(SocketContext);
  const [isAuthen, setIsAuthen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    socket.emit("getCurrentPlayer");

    if (socket.connected) {
      socket.on("currentPlayer", (msg: Players) => {
        console.log(JSON.stringify(msg));
        console.log("getPlayer");
        if (!msg[socket.id] || msg[socket.id].name == "") {
          setIsAuthen(false);
        } else {
          setIsAuthen(true);
        }
      });

      return () => {
        socket.off("currentPlayer");
      };
    }
  }, [socket]);

  return (
    <>
      <AuthContext.Provider value={false}>
        {isAuthen || router.pathname == "/" ? (
          children
        ) : (
          <>
            <Box
              height="100vh"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h1"> please register first </Typography>
              <Button onClick={() => router.push("/")}> register </Button>
            </Box>
          </>
        )}
      </AuthContext.Provider>
    </>
  );
};
