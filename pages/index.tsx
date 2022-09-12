import { Typography, Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Piano } from "../src/components/Piano";
import { PianoKey } from "../src/components/PianoKey";
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
          <Grid item xs={12} md={12}>
            <Piano />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
