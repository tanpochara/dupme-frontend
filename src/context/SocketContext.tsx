import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:81";

const socket = io(host, {
  transports: ["websocket"],
});
export const SocketContext = createContext<{ socket: Socket }>({ socket });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    socket,
  };
  const router = useRouter();

  useEffect(() => {
    if (!socket.connected) {
      router.push("/");
    }
  }, [router]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
