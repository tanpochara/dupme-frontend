import { Typography, Box, Container, Grid, TextField } from "@mui/material";
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
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="input your name"
        />
      </Box>
    </>
  );
};

export default Home;
