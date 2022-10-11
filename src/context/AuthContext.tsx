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

  useEffect(() => {
    if (!isAuthen) {
      router.push("/");
    }
  }, [isAuthen, router]);

  return (
    <>
      <AuthContext.Provider value={false}>{children}</AuthContext.Provider>
    </>
  );
};
