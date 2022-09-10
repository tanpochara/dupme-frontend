import { Typography, Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Piano } from "../src/components/Piano";
import { PianoKey } from "../src/components/PianoKey";
import { Timer } from "../src/components/Timer";
import { notes } from "../src/constant/notes";
import styles from "../src/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Box
        height={"100vh"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box padding="20px" textAlign="center">
              <Typography variant="h2" paddingBottom="20px">
                {" "}
                Player 1 : Points
              </Typography>
              <Box paddingLeft={"430px"} paddingBottom="20px">
                <Timer />
              </Box>
              <Piano />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="20px" textAlign="center">
              <Typography variant="h2" paddingBottom="20px">
                {" "}
                Player 2 : Points
              </Typography>
              <Box paddingLeft={"430px"} paddingBottom="20px">
                <Timer />
              </Box>
              {/* <Piano /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
