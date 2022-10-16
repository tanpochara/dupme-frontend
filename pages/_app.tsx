import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { SocketProvider } from "../src/context/SocketContext";
import { AuthContextProvider } from "../src/context/AuthContext";
import { ColorModeProvider } from "../src/context/ColorModeContext";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../src/components/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from "next/router";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Dupme",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ColorModeProvider>
          <SocketProvider>
            <AuthContextProvider>
              {router.pathname != "/" && <Navbar />}
              <Component {...pageProps} />
            </AuthContextProvider>
          </SocketProvider>
        </ColorModeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
