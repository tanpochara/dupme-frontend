import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { border, borderBottom, Stack } from "@mui/system";
import Link from "next/link";
import React, { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navbox = {
  position: "static",
  width: "100%",
  padding: "10px",
  paddingLeft: "100px",
  paddingRight: "5vw",
  display: "flex",
  flexDirction: "row",
  bgcolor: "background.paper",
  alignItems: "center",
  justifyContent: "space-between",
};
const link = {
  flexGrow: "1",
  cursor: "pointer",
  color: "text.primary",
  "&:hover": {
    color: "red",
    borderBottom: "1px solid red",
  },
};

function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <Box sx={navbox}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h2" color="text.primary" className="hello">
          {" "}
          Dupme palungbai{" "}
        </Typography>
        <Stack direction="row" spacing={2} marginLeft="20px" mt="3px">
          <Link href="/rooms">
            <Typography variant="h5" sx={link}>
              rooms
            </Typography>
          </Link>
          <Link href="/leader-board">
            <Typography variant="h5" sx={link}>
              leaderboard
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <Stack alignItems="center" direction="row" spacing={5}>
        <IconButton
          disableRipple
          sx={{ ml: 1, mr: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <MdDarkMode />
          ) : (
            <MdOutlineLightMode />
          )}
        </IconButton>
        <ConnectButton />
        <audio
          controls
          loop
          className="custom-audio"
          style={{ width: "100px" }}
        >
          <source src="/sound/river_flows_in_you.mp3" type="audio/mpeg" />
        </audio>
      </Stack>
    </Box>
  );
}
export default Navbar;
