import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { SocketProvider } from "../src/context/SocketContext";
import { AuthContextProvider } from "../src/context/AuthContext";
import { ColorModeProvider } from "../src/context/ColorModeContext";
import Navbar from "../src/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <SocketProvider>
        <AuthContextProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthContextProvider>
      </SocketProvider>
    </ColorModeProvider>
  );
}

export default MyApp;
