import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "../src/theme/theme";
import { SocketProvider } from "../src/context/SocketContext";
import { AuthContextProvider } from "../src/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;
