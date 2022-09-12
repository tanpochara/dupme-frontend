import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:81", {
  transports: ["websocket"],
});
export const SocketContext = createContext<{ socket: Socket }>({ socket });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
