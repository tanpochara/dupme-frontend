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
const navbox = {
  position: "static",
  width: "100%",
  padding: "10px",
  paddingLeft: "100px",
  paddingRight: "200px",
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
// const link = {
//   textDecoration: "none",
//   color: "red",
//   fontSize: "20px",
//   marginLeft: "100px",
//   "&:hover": {
//     color: "yellow",
//     borderBottom: "1px solid white",
//   },
// };

function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <Box sx={navbox}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h2" color="text.primary">
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
      <IconButton
        disableRipple
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <MdDarkMode />
        ) : (
          <MdOutlineLightMode />
        )}
      </IconButton>
    </Box>
  );
}
export default Navbar;
